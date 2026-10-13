# Gokul A — Developer Portfolio

A personal portfolio website built with **Java 21 + Spring Boot 4** on the backend and **React 19 + Vite** on the frontend, shipped as a **single deployable app** (one Docker image, one URL).

> **Live site:** _coming soon (deploying on Render)_
> **LinkedIn:** [linkedin.com/in/gkl-dev](https://linkedin.com/in/gkl-dev/) · **Email:** gokul240102@gmail.com

---

## Features

- **Animated hero**: typing effect cycling through roles, plus a rotating "tech orbit" of the stack.
- **Data-driven content**: every section (about, services, experience, skills, certifications, education) is rendered from one JSON file served by a Spring Boot REST API.
- **Resume viewer**: view the PDF in an in-page modal, open it in a new tab, or download it.
- **Contact form → email**: messages are validated on the client *and* server, then emailed to me with *Reply-To* set to the sender.
  - Name, email and phone validation (Indian 10-digit mobile or international `+<code>` numbers)
  - Honeypot spam trap and per-IP rate limiting (3 messages / 10 min)
  - Two delivery options: **Resend** (HTTPS API) or **Gmail SMTP** (App Password)
- **Polished UI**: scroll-reveal animations, active-section highlighting in the navbar, scroll progress bar, back-to-top button, tech-logo marquee.
- **Responsive and accessible**: mobile menu, keyboard focus styles, ARIA labels, `prefers-reduced-motion` support.

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite 8, JavaScript (ES6+), CSS3 (custom, no UI framework), react-icons |
| Backend | Java 21, Spring Boot 4.1, Spring Web MVC, Bean Validation, Spring Mail, RestClient |
| Email | Resend API or Gmail SMTP |
| Build & deploy | Maven (wrapper included), multi-stage Dockerfile, Render (Blueprint in `render.yaml`) |

## How it works

```
                    ┌─────────────────────────── one Spring Boot app ───────────────────────────┐
 Browser  ───────►  │  /                → React build (static files bundled into the jar)        │
                    │  /resume/*.pdf    → resume PDF                                             │
                    │  GET  /api/profile → profile.json (all page content)                       │
                    │  POST /api/contact → validate → rate-limit → send email (Resend or SMTP)   │
                    └────────────────────────────────────────────────────────────────────────────┘
```

In development, Vite runs the frontend on `:5173` and proxies `/api` to Spring Boot on `:8080`.
In production, the Docker build compiles the React app and copies it into Spring Boot's `static/` folder, so a single jar serves both the site and the API.

## Project structure

```
.
├── backend/                         Spring Boot API
│   ├── src/main/java/dev/gokul/portfolio/
│   │   ├── profile/                 GET /api/profile (record model + JSON loader)
│   │   ├── contact/                 POST /api/contact (validation, rate limiter, email delivery)
│   │   └── common/                  Global API exception handler
│   ├── src/main/resources/
│   │   ├── data/profile.json        ← all portfolio content lives here
│   │   └── application.properties
│   └── secrets.properties.example   Template for local mail credentials
├── frontend/                        React + Vite app
│   ├── public/resume/               Resume PDF
│   └── src/
│       ├── components/              One component per section (Hero, Experience, Contact, …)
│       ├── hooks/                   useProfile, useTypewriter
│       └── lib/techIcons.js         Skill name → brand icon/colour map
├── Dockerfile                       Multi-stage build: React → Spring Boot jar → slim JRE image
└── render.yaml                      Render Blueprint (free web service)
```

## Running locally

**Prerequisites:** Java 21+ and Node.js 20.19+ (or 22.12+). Maven isn't needed because the project includes the Maven wrapper.

**1. Backend** (terminal 1):

```bash
cd backend
./mvnw spring-boot:run          # Windows PowerShell: .\mvnw spring-boot:run
```

The API runs on http://localhost:8080. Check it with http://localhost:8080/api/profile.

**2. Frontend** (terminal 2):

```bash
cd frontend
npm install                      # first time only
npm run dev
```

Open http://localhost:5173.

> **Windows tip:** if PowerShell says *"running scripts is disabled on this system"*, run this once:
> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`, or use `npm.cmd run dev`.

### Enabling the contact form locally (Gmail)

1. Turn on [2-Step Verification](https://myaccount.google.com/security) for your Google account.
2. Create an [App Password](https://myaccount.google.com/apppasswords).
3. Copy `backend/secrets.properties.example` to `backend/secrets.properties` and paste the password in.
   This file is git-ignored, so it never gets committed.
4. Restart the backend.

Without credentials, the form still works end to end but replies with *"temporarily unavailable, please email me directly"*.

## Configuration

Every setting can come from an environment variable, which is how production is configured:

| Variable | Purpose | Default |
|---|---|---|
| `PORT` | HTTP port (set automatically by Render) | `8080` |
| `RESEND_API_KEY` | Enables delivery via the Resend API (takes priority over SMTP) | _(empty)_ |
| `RESEND_FROM` | Sender shown on Resend emails | `Portfolio Contact <onboarding@resend.dev>` |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | Gmail address + App Password for SMTP delivery | _(empty)_ |
| `CONTACT_RECIPIENT` | Inbox that receives contact-form messages | `gokul240102@gmail.com` |

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profile` | All portfolio content (from `profile.json`) |
| `POST` | `/api/contact` | Send a message. Body: `name`, `email`, `phone`, `company` (optional), `subject`, `message` |

`POST /api/contact` responses: `200` sent · `400` validation errors (`{ message, errors: { field: msg } }`) · `429` rate-limited · `502` email provider error · `503` email not configured.

## Updating content

- **Text, experience, skills, education:** edit [`backend/src/main/resources/data/profile.json`](backend/src/main/resources/data/profile.json).
- **Resume:** replace the PDF in [`frontend/public/resume/`](frontend/public/resume/). If the filename changes, update `resume.url` and `resume.fileName` in `profile.json`.
- **Colours and fonts:** CSS variables at the top of [`frontend/src/index.css`](frontend/src/index.css).

Push to `main` and Render redeploys automatically.

## Deployment (Render, free plan)

The repo includes a [Render Blueprint](render.yaml), so deployment is mostly clicks:

1. Sign in at [render.com](https://render.com) with GitHub.
2. **New → Blueprint**, then pick this repository. Render reads `render.yaml` and creates the `gokul-portfolio` web service.
3. When prompted for `RESEND_API_KEY`, paste your Resend key (see below). You can also add it later under **Environment**.
4. Click **Apply**. The first Docker build takes a few minutes. The site then runs at `https://gokul-portfolio.onrender.com` (or similar).

**Contact form on Render:** Render's free plan blocks outbound SMTP ports, so Gmail SMTP won't work there. Use Resend instead:

1. Sign up at [resend.com](https://resend.com) **with the same email that should receive messages** (gokul240102@gmail.com).
2. **API Keys → Create API key** (sending access is enough), then set it as `RESEND_API_KEY` on Render.

Without a verified domain, Resend only delivers to your own signup address, which is exactly what a contact form needs.

**Free-plan note:** the service sleeps after about 15 minutes of inactivity, so the first visit after that takes about 30–60 seconds to wake it up. A free monitor such as [UptimeRobot](https://uptimerobot.com) pinging `/api/profile` every 10 minutes keeps it awake.

### Building the Docker image yourself

```bash
docker build -t portfolio .
docker run -p 8080:8080 -e RESEND_API_KEY=re_xxx portfolio
```
