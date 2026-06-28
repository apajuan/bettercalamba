#!/usr/bin/env python3
import json
import glob
import sys
import re

def normalize_text(text):
    if text is None:
        return ""
    text = str(text)
    # Remove numbering like "1.", "2.3", etc at the start
    text = re.sub(r'^[\d\.]+\s+', '', text)
    # Remove punctuation, newlines, and extra spaces
    text = re.sub(r'[^\w\s]', '', text)
    return ' '.join(text.lower().split())

def main():
    with open('src/data/services/services.json', 'r') as f:
        services = json.load(f)

    # Load all MD files into memory
    md_files = glob.glob('raw_data/citizencharters/*.md')
    md_contents = {}
    for mf in md_files:
        with open(mf, 'r') as f:
            md_contents[mf] = f.read()

    errors = 0
    checked = 0

    for s in services:
        if s.get('source') != 'citizens-charter':
            continue

        checked += 1
        svc_name = s['service']
        
        # Find which md file it came from by searching for the service name
        norm_name = normalize_text(svc_name)
        found_md = None
        for mf, content in md_contents.items():
            if norm_name in normalize_text(content):
                found_md = content
                break
        
        if not found_md:
            print(f"[ERROR] Service '{svc_name}' not found in any MD file.")
            errors += 1
            continue
            
        norm_content = normalize_text(found_md)

        # Check requirements
        for req in s.get('detailedRequirements', []):
            norm_req = normalize_text(req.get('requirement'))
            if norm_req and norm_req not in norm_content:
                print(f"[ERROR] Requirement '{req.get('requirement')}' for service '{svc_name}' missing in MD.")
                errors += 1
            norm_where = normalize_text(req.get('where_to_secure'))
            if norm_where and norm_where not in norm_content:
                print(f"[ERROR] Where_to_secure '{req.get('where_to_secure')}' for service '{svc_name}' missing in MD.")
                errors += 1

        # Check steps
        for step in s.get('clientSteps', []):
            action = normalize_text(step.get('action'))
            if action and action not in norm_content:
                print(f"[ERROR] Action '{step.get('action')}' for service '{svc_name}' missing in MD.")
                errors += 1
            agency = normalize_text(step.get('agencyAction'))
            if agency and agency not in norm_content:
                print(f"[ERROR] Agency action '{step.get('agencyAction')}' for service '{svc_name}' missing in MD.")
                errors += 1
            fee = normalize_text(step.get('fee'))
            if fee and fee not in norm_content:
                print(f"[ERROR] Fee '{step.get('fee')}' for service '{svc_name}' missing in MD.")
                errors += 1
            time = normalize_text(step.get('processing_time'))
            if time and time not in norm_content:
                print(f"[ERROR] Processing time '{step.get('processing_time')}' for service '{svc_name}' missing in MD.")
                errors += 1

    print(f"Verified {checked} services.")
    if errors == 0:
        print("SUCCESS: All data accurately matches the original markdown files.")
    else:
        print(f"FAILED: Found {errors} discrepancies.")
        sys.exit(1)

if __name__ == '__main__':
    main()
