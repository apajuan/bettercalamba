#!/usr/bin/env python3
import json
import re

PREFIXES = [
    r'issuance of\s*',
    r'application for\s*',
    r'request for\s*',
    r'securing\s*',
    r'payment for\s*',
    r'processing of\s*',
    r'pagkuha ng\s*',
    r'paghingi ng\s*'
]

def is_english(text):
    text_lower = text.lower()
    en_keywords = ['application', 'request', 'issuance', 'certificate', 'permit', 'clearance', 'registration', 'payment', 'leave', 'counseling', 'advice', 'orientation', 'seminar', 'scheduling']
    fil_keywords = ['aplikasyon', 'pagkuha', 'paghingi', 'pagpaparehistro', 'pagbabayad', 'pagliban', 'tulong', 'serbisyo', 'opinyong', 'pambayad', 'gamot', 'ng', 'mga', 'sa']
    
    en_score = sum(1 for w in en_keywords if w in text_lower)
    fil_score = sum(1 for w in fil_keywords if w in text_lower)
    
    if en_score > fil_score: return True
    if fil_score > en_score: return False
    return True

def clean_title(title):
    filipino_translation = None
    
    title = re.sub(r'^([A-Z]\.|[0-9]+[\.\)]|[IVXLCDM]+\.)\s+', '', title).strip()
    split_match = re.split(r'\s+o\s+|\s+/\s+', title)
    
    if len(split_match) == 2 and len(split_match[0]) > 5 and len(split_match[1]) > 5:
        part1, part2 = split_match[0].strip(), split_match[1].strip()
        p1_en = is_english(part1)
        p2_en = is_english(part2)
        
        if p1_en and not p2_en:
            title = part1
            filipino_translation = part2
        elif p2_en and not p1_en:
            title = part2
            filipino_translation = part1
        elif "aplikasyon" in part1.lower() or "pagkuha" in part1.lower():
            title = part2
            filipino_translation = part1

    elif len(split_match) > 2:
        fil_parts = [p for p in split_match if not is_english(p)]
        en_parts = [p for p in split_match if is_english(p)]
        if en_parts and fil_parts:
            title = " / ".join(en_parts)
            filipino_translation = " / ".join(fil_parts)

    for prefix in PREFIXES:
        if re.match(prefix, title, re.IGNORECASE):
            title = re.sub('^' + prefix, '', title, flags=re.IGNORECASE).strip()
            if title: title = title[0].upper() + title[1:]
            break

    if filipino_translation:
        for prefix in PREFIXES:
            if re.match(prefix, filipino_translation, re.IGNORECASE):
                filipino_translation = re.sub('^' + prefix, '', filipino_translation, flags=re.IGNORECASE).strip()
                if filipino_translation: filipino_translation = filipino_translation[0].upper() + filipino_translation[1:]
                break

    title = re.sub(r'[.,;:\s]+$', '', title)
    if filipino_translation:
        filipino_translation = re.sub(r'[.,;:\s]+$', '', filipino_translation)
        
    return title, filipino_translation

def clean_text(val):
    if not isinstance(val, str): return val
    # Strip HTML <br> tags
    val = re.sub(r'<br\s*/?>', ', ', val, flags=re.IGNORECASE)
    # Strip bullet points
    val = re.sub(r'^[\-•✓*]\s+', '', val)
    # Normalize whitespace
    val = re.sub(r'\s+', ' ', val).strip()
    # Clean up multiple commas created by <br> replacement
    val = re.sub(r'(\s*,\s*)+', ', ', val).strip(', ')
    # Strip trailing punctuation for fields that shouldn't have them
    val = re.sub(r'[.,;:\s]+$', '', val)
    return val

def main():
    with open('src/data/services/services.json', 'r') as f:
        services = json.load(f)

    flagged_issues = []

    for s in services:
        original = s.get('service', '')
        new_title, filipino = clean_title(original)
        
        if new_title != original:
            s['service'] = new_title
        if filipino:
            s['serviceFilipino'] = filipino

        # Deep clean detailedRequirements
        if 'detailedRequirements' in s and s['detailedRequirements']:
            cleaned_reqs = []
            seen_reqs = set()
            
            for req in s['detailedRequirements']:
                rt = clean_text(req.get('requirement', ''))
                ws = clean_text(req.get('where_to_secure', ''))
                
                # Skip perfectly empty requirements
                if not rt and not ws:
                    continue
                
                # Check for duplicates (case-insensitive deduplication)
                req_key = f"{rt.lower()}|{ws.lower()}"
                if req_key in seen_reqs:
                    print(f"DUPLICATE FOUND in [{new_title}]: {rt}")
                    # We DO NOT drop it anymore, per user request. We keep it.
                seen_reqs.add(req_key)
                
                req['requirement'] = rt
                req['where_to_secure'] = ws
                cleaned_reqs.append(req)
                
                # Flag long fields
                if len(rt) > 200:
                    flagged_issues.append({'type': 'LONG_REQUIREMENT', 'service': new_title, 'text': rt})
                if len(ws) > 100:
                    flagged_issues.append({'type': 'LONG_LOCATION', 'service': new_title, 'text': ws})
            
            s['detailedRequirements'] = cleaned_reqs

        # Deep clean clientSteps
        if 'clientSteps' in s and s['clientSteps']:
            for step in s['clientSteps']:
                if 'action' in step:
                    step['action'] = clean_text(step['action'])
                if 'agencyAction' in step:
                    step['agencyAction'] = clean_text(step['agencyAction'])
                if 'fee' in step:
                    step['fee'] = clean_text(step['fee'])
                    if len(step['fee']) > 50:
                        flagged_issues.append({'type': 'LONG_FEE', 'service': new_title, 'text': step['fee']})
                if 'processing_time' in step:
                    step['processing_time'] = clean_text(step['processing_time'])
                    if len(step['processing_time']) > 50:
                        flagged_issues.append({'type': 'LONG_TIME', 'service': new_title, 'text': step['processing_time']})

    with open('src/data/services/services.json', 'w') as f:
        json.dump(services, f, indent=2, ensure_ascii=False)
        
    print("Cleaned services.json successfully.")

    # Write FLAGGED_DATA_ISSUES.md
    with open('FLAGGED_DATA_ISSUES.md', 'w') as f:
        f.write("# Flagged Data Issues\n\n")
        f.write("This document contains a list of exceptionally long or complex fields identified during the automated deep-cleaning of `services.json`. These may require manual review to ensure they are user-friendly.\n\n")
        
        types = {
            'LONG_REQUIREMENT': 'Requirements (> 200 characters)', 
            'LONG_LOCATION': 'Where to Secure Locations (> 100 characters)', 
            'LONG_FEE': 'Fees (> 50 characters)', 
            'LONG_TIME': 'Processing Times (> 50 characters)'
        }
        for t_key, t_title in types.items():
            items = [x for x in flagged_issues if x['type'] == t_key]
            if items:
                f.write(f"## {t_title}\n\n")
                for i in items:
                    f.write(f"- **Service**: {i['service']}\n")
                    f.write(f"  - **Text**: `{i['text']}`\n\n")

if __name__ == '__main__':
    main()
