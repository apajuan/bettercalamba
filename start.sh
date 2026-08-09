#!/bin/bash
cd "$(dirname "$0")"
exec npx vite --port 5173 --host 0.0.0.0
