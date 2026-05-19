# Client Intake Dashboard

A lead intake and qualification dashboard built for internal ops teams managing inbound service requests. Capture structured client details across a guided multi-step form, automatically score each lead on budget and urgency fit, and track pipeline status from first contact through qualification — all in one lightweight, self-hosted tool.

Built using an iterative, AI-assisted workflow — scoped by phase, reviewed incrementally, and shipped in focused layers: intake form, scoring logic, dashboard, and analytics. This is the same methodology I apply with clients who need production-ready internal tooling without the overhead of a full product team.

### Home
![Homepage workflow entry](public/screenshots/Home.png)

### Intake
![Multi-step intake form](public/screenshots/Intake.png)

### Dashboard
![Lead dashboard](public/screenshots/Dashboard.png)

---

## Live demo

**[View live demo →](https://client-intake-dashboard-ten.vercel.app/)**

Opens with 12 pre-loaded demo leads — no setup required.

---

## Features

- Multi-step intake form with client-side validation
- Filterable lead table with KPI summary cards
- Score leads from budget, urgency, and timeline
- Pipeline charts for submissions, status, and scores
- Lead detail page with notes and activity history

---

## Tech stack

Next.js · TypeScript · Tailwind CSS · shadcn/ui · Zod · React Hook Form · Recharts

---

## Running locally

Install dependencies:

```bash
pnpm install
```
Run the development server:

```bash
pnpm dev
```
Then open:
[http://localhost:3000](http://localhost:3000)

---

## Author

Fabio Coelho

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
