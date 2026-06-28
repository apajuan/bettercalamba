#!/usr/bin/env python3
import json
import re
from collections import defaultdict

def deep_audit():
    with open('src/data/services/services.json', 'r') as f:
        services = json.load(f)

    issues = defaultdict(list)

    for s in services:
        name = s.get('service', 'UNKNOWN_SERVICE')
        
        # Check requirements
        reqs = s.get('detailedRequirements', [])
        if not reqs:
            issues['missing_requirements'].append(name)
        else:
            for req in reqs:
                rt = req.get('requirement', '')
                ws = req.get('where_to_secure', '')
                if len(rt) < 3:
                    issues['req_too_short'].append(f"[{name}] Req: {rt}")
                if len(rt) > 200:
                    issues['req_too_long'].append(f"[{name}] Req: {rt[:50]}...")
                if not ws or ws.strip() == '':
                    issues['req_missing_where'].append(f"[{name}] Req: {rt[:30]}")
                elif len(ws) > 100:
                    issues['where_too_long'].append(f"[{name}] Where: {ws[:30]}...")

        # Check steps
        steps = s.get('clientSteps', [])
        if not steps:
            issues['missing_steps'].append(name)
        else:
            for i, step in enumerate(steps):
                action = step.get('action', '')
                agency = step.get('agencyAction', '')
                fee = step.get('fee', '')
                time = step.get('processing_time', '')
                
                if len(action) < 3 and action.lower() not in ('n/a', 'none'):
                    issues['action_too_short'].append(f"[{name}] Step {step.get('step')}: {action}")
                    
                if fee and len(fee) > 50:
                    # Fee should be short (e.g. "Php 50.00", "None")
                    issues['fee_too_long'].append(f"[{name}] Fee: {fee[:50]}...")
                    
                if time and len(time) > 50:
                    # Time should be short (e.g. "5 minutes", "1 day")
                    issues['time_too_long'].append(f"[{name}] Time: {time[:50]}...")
                    
                if not agency and not action:
                    issues['empty_step'].append(f"[{name}] Step {step.get('step')}")

        # Check classification and types
        if not s.get('classification'):
            issues['missing_classification'].append(name)
        if not s.get('typeOfTransaction'):
            issues['missing_transaction_type'].append(name)

    print("=== DEEP DIRTY DATA AUDIT REPORT ===")
    for category, items in issues.items():
        print(f"\n--- {category.upper()} ({len(items)} items) ---")
        for item in items:
            print(f" - {item}")

    # Print summary to console
    print("=== DEEP DIRTY DATA AUDIT SUMMARY ===")
    for category, items in issues.items():
        print(f"{category.upper()}: {len(items)} issues")
        for item in items[:3]:
            print(f"   - {item}")
        if len(items) > 3:
            print(f"   ... and {len(items)-3} more")

if __name__ == '__main__':
    deep_audit()
