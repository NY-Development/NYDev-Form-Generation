my project in short is this : "Form builder platform with an org admin dashboard, template library, integrations, and a public registration flow."
You'll find the backend in the backend/ folder and the frontend() in the frontend/ folder and the UI/ folder is the design of each pages to be built with code.html and image.png for each page so that you can look at the .html of each page and implement it in react-typescript version of each accordingly.

I will initialize the frontend folder with shadcn/vite okay but I will give you the detailed purpose of the project and you'll start to implement the backend fully start to finish in the backend/ folder and then we will go to the frontend using the provided structure in the frontend folder okay.

Purpose of the project in detail : "🎯 Project Purpose — NYDev Form Generator
1️⃣ Core Purpose
The purpose of the NYDev Form Generator is to build a scalable, multi-tenant SaaS platform that enables organizations to:

Create, manage, and distribute intelligent registration forms with built-in verification systems such as QR codes and unique identifiers.

Unlike traditional form tools, this platform is designed not just to collect data, but to manage real-world participation workflows, including identity verification, attendance validation, and administrative control.

2️⃣ Problem Statement
Many organizations today (churches, schools, event organizers, NGOs):

Use basic tools (Google Forms, paper forms)

Lack verification mechanisms (no QR, no ID system)

Cannot track real attendance or authenticity

Have no centralized admin dashboard

Cannot customize branding or workflows easily

This leads to:

Poor data organization

Fraud or duplication

Inefficient manual verification

Lack of scalability

3️⃣ Solution Overview
The NYDev Form Generator solves this by providing:

🧩 A Dynamic Form Creation Engine
Users can generate custom forms based on their needs

Supports multiple use cases (church, events, training, etc.)

🔗 Shareable Public Form Links
Each form gets a unique URL (like Google Forms)

No login required for registrants

🆔 Identity System
Each submission generates:

Unique Registration ID

QR Code for verification

Enables real-world validation (entry, attendance, approval)

📊 Admin Control Layer
Each form has its own admin dashboard

Admins can:

View submissions

Verify users via QR/ID

Approve or reject entries

🏢 Multi-Tenant Architecture
Each organization operates independently

Their data, forms, and admins are isolated

4️⃣ Strategic Purpose (NYDev Vision)
Beyond solving a single use-case (like Real Worship Ministry), this project aims to:

Create a reusable platform that can serve any organization needing structured registration and verification workflows.

This transforms NYDev from:

❌ A service provider building one-off solutions
➡️ Into

✅ A product-based company offering a scalable SaaS solution

5️⃣ Business Purpose (Monetization)
The platform is designed with a tiered subscription model:

🟡 Free Plan
Basic form creation

Limited features

NYDev branding (watermark)

🟢 Pro Plan
Advanced customization

Multiple admins

Branding control

Analytics and exports

🔵 Future Enterprise
Custom domains

API access

Automation integrations

This enables:

Recurring revenue

Product scalability

Market expansion

6️⃣ Functional Purpose
At a system level, the platform is built to:

Automate data collection workflows

Provide real-time validation (QR-based)

Ensure data integrity and uniqueness

Enable admin-level decision-making

Support high-volume registration scenarios

7️⃣ User-Centric Purpose
For Organizations (Customers)
Easily create and manage forms

Track participants

Verify authenticity

For Admins
Control and validate entries

Monitor activity

Reduce manual workload

For Registrants
Simple registration experience

Instant confirmation

Secure identification via QR

8️⃣ Technological Purpose
The platform is designed to demonstrate:

Modern SaaS architecture

Multi-tenant system design

Full-stack integration (React + Node + MongoDB)

Real-time QR verification systems

Scalable API-driven backend

9️⃣ Long-Term Purpose
The long-term goal is to evolve NYDev Form Generator into:

A universal form + verification platform used across multiple industries, including:

Religious organizations

Education institutions

Conferences & events

NGOs and community programs

🔟 Summary
In essence, the purpose of the project is:

To build a scalable, intelligent, and monetizable form generation platform that goes beyond simple data collection by integrating verification, identity, and administrative control, enabling organizations to manage real-world participation efficiently and securely."

packages/modules/libraries for both front and backend are : "backend [ "dependencies": {
    "bcryptjs": "^2.4.3",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^7.3.0",
    "express-validator": "^7.0.1",
    "helmet": "^7.0.0",
    "hpp": "^0.2.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "qrcode": "^1.5.4",
    "slugify": "^1.6.6",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }]
frontend [ "dependencies": {
    "axios": "^1.7.2",
    "clsx": "^2.1.1",
    "framer-motion": "^11.3.0",
    "qrcode.react": "^3.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.52.1",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.26.0",
    "recharts": "^2.12.7",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.4"
  }]
"
