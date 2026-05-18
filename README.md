# Client Intake Dashboard

A lead intake and qualification dashboard for internal ops teams. Collect inbound requests, score fit, and review pipeline status in one place.

## Live demo

**[View live demo →](https://client-intake-dashboard.vercel.app)**

Opens with 12 pre-loaded demo leads — no setup required.

![App walkthrough](public/demo.gif)

## Screenshots

### Homepage
![Homepage workflow entry](public/screenshots/Home.png)

### Intake
![Multi-step intake form](public/screenshots/Intake.png)

### Dashboard
![Lead dashboard](public/screenshots/Dashboard.png)

## Features

- Multi-step intake form with client-side validation
- Filterable lead table with KPI summary cards
- Score leads from budget, urgency, and timeline
- Pipeline charts for submissions, status, and scores
- Lead detail page with notes and activity history

## Development approach

This project was built using an iterative AI-assisted workflow — scoped prompts, phased implementation, and incremental architecture review — as a deliberate methodology for rapid internal tooling. Each phase targeted one layer of the product: intake flow, dashboard, scoring, and analytics. The result is a maintainable codebase delivered quickly, without sacrificing structure for speed. This is the same approach I use with clients who need production-ready tools on tight timelines.

## Tech stack

Next.js · TypeScript · Tailwind CSS · shadcn/ui · Zod · React Hook Form · Recharts

## Running locally

Requires [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Author

Fabio Coelho

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
