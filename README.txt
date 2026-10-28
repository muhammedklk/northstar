NORTHSTAR LOGISTICS — WEBSITE CONCEPT
====================================

Pages included
- index.html: Home / landing page
- services.html: Air freight, ocean freight, road & rail, warehousing
- about.html: Brand story and values
- tracking.html: Interactive tracking UI demo
- insights.html: Insights cards and newsletter UI
- contact.html: Contact enquiry form

How to run
1. Extract the ZIP file.
2. Open index.html in a browser, or open the folder in VS Code and use Live Server.
3. All navigation pages and SVG image assets are local. Google Fonts requires an internet connection; the site falls back to system fonts if unavailable.

Images
- assets/ contains custom-created local SVG illustrations and icons. The hero freight illustration is original vector artwork, not a hotlinked image.
- No images are loaded from Google, Pinterest, or Unsplash at runtime.
- You asked for original JPG/PNG/SVG assets rather than external image links. Since external download access was unavailable in the build environment, this version uses locally bundled original SVG artwork instead of third-party photos. You can replace the SVG hero with licensed freight photography you download and have permission to use, without changing the layout.

Animation and interactions
- Scroll reveal animations, animated metrics, floating cards, hover transitions, animated route lines, responsive mobile navigation.
- Tracking form displays a simulated status based on the entered reference; it is NOT connected to a carrier API.
- Contact form opens a prefilled email draft; it does not send data to a backend.
- Newsletter form is a UI demo and does not collect subscriptions.

Production notes
- Northstar is a demo brand. Replace sample metrics, company information, email and legal text before publishing.
- To make tracking and enquiries genuinely real-time, connect a backend, a database/CRM and carrier tracking APIs.
