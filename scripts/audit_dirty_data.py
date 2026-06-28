#!/usr/bin/env python3
import json
import re

def audit_services():
    with open('src/data/services/services.json', 'r') as f:
        services = json.load(f)

    issues = {
        'leading_number_or_letter': [],
        'all_caps': [],
        'redundant_prefix': [],
        'too_long': [],
        'weird_characters': [],
        'extra_whitespace': [],
    }

    for s in services:
        name = s.get('service', '')
        
        # 1. Leading number or letter (e.g. "A. ", "1. ", "I. ")
        if re.match(r'^([A-Z]\.|[0-9]+[\.\)]|[IVXLCDM]+\.)\s', name):
            issues['leading_number_or_letter'].append(name)
            
        # 2. All caps (allowing for small words or acronyms, but checking if most letters are uppercase)
        letters = [c for c in name if c.isalpha()]
        if letters and all(c.isupper() for c in letters):
            issues['all_caps'].append(name)
            
        # 3. Redundant prefixes
        lower_name = name.lower()
        if lower_name.startswith(('issuance of', 'request for', 'application for', 'securing', 'payment for', 'processing of')):
            issues['redundant_prefix'].append(name)
            
        # 4. Too long
        if len(name) > 80:
            issues['too_long'].append(name)
            
        # 5. Weird characters (newlines, tabs, weird punctuation)
        if re.search(r'[\n\t_]', name) or '  ' in name:
            issues['weird_characters'].append(name)
            
        # 6. Extra whitespace at start/end
        if name != name.strip():
            issues['extra_whitespace'].append(name)

    print("=== DIRTY DATA AUDIT REPORT ===")
    for category, items in issues.items():
        print(f"\n--- {category.upper()} ({len(items)} items) ---")
        for item in items[:10]: # Print up to 10 for brevity in terminal, though we can print all
            print(f" - {item}")
        if len(items) > 10:
            print(f"   ... and {len(items) - 10} more.")

if __name__ == '__main__':
    audit_services()
