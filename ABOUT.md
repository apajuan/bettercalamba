## Inspiration
The inspiration for BetterCalamba came from recognizing that the City of Calamba — the largest city in Laguna and the birthplace of José Rizal — deserved a modern, accessible portal that residents could actually rely on. Official government websites are often difficult to navigate on mobile, slow to update, and lack accessibility features. We wanted to build something community-driven and open-source: a portal that puts Calambeños first.

## What it does
BetterCalamba serves as a community-built portal for the City of Calamba, offering:
- A modern, user-friendly interface for accessing city government services
- A public services directory built from the city's Citizens Charter, with requirements, fees, step-by-step processes, and ARTA processing-time classifications
- Legislative portal with ordinances, resolutions, and executive orders from the Sangguniang Panlungsod
- Transparency dashboard covering financial data, procurement bids, and infrastructure projects
- Government directory with contact information for all city departments and officials
- Tourism section highlighting Rizal Shrine, the Pansol hot spring belt, Mt. Makiling, and other city landmarks
- Multilingual support (English and Filipino)
- Mobile-responsive design for access on any device

## How we built it
The platform is built using modern web technologies:
- React 19 for the frontend framework
- TypeScript (strict mode) for type safety and better development experience
- Tailwind CSS v4 with the Kapwa semantic design system for consistent, maintainable styling
- Radix UI for accessible component primitives
- Lucide React for consistent iconography
- React Router for client-side routing
- Vite for fast development and optimized builds
- Cloudflare Pages and D1 for deployment and legislative data storage
- Meilisearch with Fuse.js for fast, fuzzy search
- Python pipelines for processing Citizens Charter and legislative PDFs

## Challenges we ran into
- Parsing the Citizens Charter PDFs into structured data — inline sub-steps, missing client actions, and truncated ARTA classifications all needed dedicated parser fixes
- Organizing 276 city services across 10 categories into a navigable directory
- Mapping charter office divisions and sections onto the city's department structure
- Implementing a responsive design that works across all device sizes
- Ensuring accessibility for residents with different abilities
- Managing multilingual support while maintaining content consistency
- Keeping data accurate and up-to-date through community contribution workflows

## Accomplishments that we're proud of
- Built a fully open-source, community-audited portal at zero cost to Calamba residents
- Published the full Citizens Charter as searchable, filterable, structured data with ARTA time guarantees surfaced per service
- Implemented a powerful fuzzy search and filtering system for services and legislation
- Developed a responsive design that works seamlessly on all devices
- Adapted a forkable LGU portal architecture to a new city, proving the template works
- Achieved excellent performance metrics through Cloudflare's edge network
- Created a structured data pipeline for processing and publishing government documents

## What we learned
- Best practices for organizing city government service directories
- Techniques for extracting and structuring data from government PDFs at scale
- Strategies for managing multilingual content effectively
- Approaches to building accessible local government portals
- How to design community contribution workflows that non-developers can participate in
- The importance of open data and transparency in local governance

## What's next for BetterCalamba
- Expanding coverage of barangay-level services and officials across all 54 barangays
- Adding more real-time transparency data (budget execution, project tracking)
- Publishing a city-vetted Pansol resort directory so residents and tourists can avoid scam listings
- Growing the volunteer community of data auditors and translators
- Contributing improvements back upstream so other LGUs can adopt them
