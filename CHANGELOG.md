# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-05-18

### Added

- Pipeline analytics panel with weekly submissions, status distribution, and average score by service type charts
- Pre-seeded demo data with 12 analytics-focused leads on first dashboard visit
- Recharts integration for dashboard-level pipeline visualization

### Changed

- Expanded the dashboard layout to surface analytics above the leads table
- Updated seed logic to populate localStorage only when no existing leads were stored

## [0.3.0] - 2026-05-11

### Added

- Lead scoring system that calculated a 0–100 qualification score from intake signals
- Score badges and colour-coded tiers in the dashboard table
- Score breakdown driven by budget, urgency, and timeline inputs

### Changed

- Extended lead records to persist computed scores alongside intake data
- Refined dashboard table columns to highlight qualification status at a glance

## [0.2.0] - 2026-05-04

### Added

- Lead dashboard with sortable overview table and pipeline status management
- Filters for status, service type, and search across lead fields
- KPI summary cards for total leads, new submissions, and qualified count

### Changed

- Connected intake submissions to the operational dashboard view
- Introduced lead status workflow across New, Contacted, Qualified, and Lost

## [0.1.0] - 2026-04-27

### Added

- Multi-step client intake form with React Hook Form and Zod validation
- localStorage persistence for submitted leads in the browser
- Next.js App Router foundation with Tailwind CSS, shadcn/ui, and shared app shell

### Changed

- Established the initial project structure for phased internal-tool development

[0.4.0]: https://github.com/fbclh/client-intake-dashboard/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/fbclh/client-intake-dashboard/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/fbclh/client-intake-dashboard/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/fbclh/client-intake-dashboard/releases/tag/v0.1.0
