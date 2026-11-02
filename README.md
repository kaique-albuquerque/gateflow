# GateFlow · Smart Front Desk

**English** · [Português](README.pt.md)

Web application for managing condominium front desk operations: visitors, residents, units, deliveries, access records, vendors, incidents and devices in a single dashboard. Interface in Brazilian Portuguese, responsive desktop-first layout and 100% local operation, with no external backend.

**Live demo:** https://kaique-albuquerque.github.io/gateflow/

## 1. The problem

Traditional front desks rely on notebooks, spreadsheets and fragmented communication. This leads to weak visitor identification, incomplete movement history, untraceable deliveries, incidents without an owner and a lack of indicators for management.

## 2. Solution goal

Centralize the recording and tracking of front desk operations in a single platform, with consistent data, clear feedback for every action and real-time management insight (computed from operational data, never from hard-coded numbers).

## 3. Features

- **Dashboard** — resident, waiting/present visitor, daily entries, parcels awaiting pickup and open incident indicators, a 7-day movement chart and recent activity lists.
- **Visitors** — registration, editing, entry authorization and denial, exit recording and filters by status and block.
- **Residents** — full CRUD, contact, unit, status and linked history.
- **Units** — card view with responsible residents and occupancy status.
- **Deliveries** — receipt, resident notification, pickup with identification of who collected it and deletion.
- **Access** — entry and exit history, filters by status and type, exit recording and removal.
- **Vendors** — services, company, stay window and entry/exit buttons.
- **Incidents** — category, owner and status transitions (open → in progress → resolved).
- **Devices** — front desk inventory with simulated connection and disconnection.
- **Settings** — demo profile, system information, data storage and restore.

## 4. Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4 (custom design tokens), React Router, Lucide React for icons and LocalStorage for persistence. The dashboard chart is implemented in pure CSS, with no additional library.

## 5. Architecture

Layers with unidirectional dependencies: `types` → `constants`/`utils` → `data` (seed data) → `services` (mock + storage) → `hooks` → `components` → `pages` → `routes`. No page knows about the mock: it consumes a service with a `Repository<T>` contract, so replacing LocalStorage with a REST API only requires implementing that interface.

Maintenance rule applied to the entire project: **no file exceeds 150 lines**. Tables use `ResourceTable` + column factories, forms use `Modal` + `useForm`, and each domain has its own hook.

## 6. Directory structure

```text
src/
├── components/
│   ├── layout/      sidebar, topbar, footer, shell
│   ├── ui/          Button, Modal, DataTable, ResourceTable, Badge...
│   ├── dashboard/   dashboard indicators, chart and lists
│   └── <domain>/    table columns, modals and form models
├── pages/           one page per route
├── hooks/           useAsyncData, useListQuery, useServiceAction, useForm...
├── services/
│   ├── api/         one service per domain
│   ├── mock/        generic repository and simulated latency
│   └── storage/     LocalStorage access
├── interfaces/      contracts (Repository)
├── types/           types and form models
├── data/            initial demo data
├── constants/       routes, status, navigation, options
├── utils/           formatting, dates, search, validators
├── contexts/        toast provider
└── routes/          route map
```

## 7. Running locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Auxiliary scripts: `npm run typecheck` (TypeScript), `npm run build` (typecheck + production build) and `npm run preview`.

### GitHub Pages deploy

Deployment is automatic: every push to the `main` branch triggers the [.github/workflows/deploy.yml](.github/workflows/deploy.yml) workflow, which installs dependencies, produces the build and publishes the contents of `dist` to GitHub Pages.

The project is served from a subdirectory (`/gateflow/`), so two settings are mandatory and already applied:

- `base: '/gateflow/'` in [vite.config.ts](vite.config.ts), enabled only when `GITHUB_ACTIONS` is defined.
- `basename` on the `BrowserRouter` in [src/App.tsx](src/App.tsx), derived from `import.meta.env.BASE_URL`, so routes work under the subdirectory.

Since GitHub Pages does not rewrite SPA routes, the [scripts/copy-fallback.mjs](scripts/copy-fallback.mjs) script copies `dist/index.html` to `dist/404.html` at the end of the build, allowing deep links to be opened directly.

## 8. How the simulated backend works

Each domain exposes a service (`services/api/*.service.ts`) that delegates to a generic repository. The repository simulates discrete latency with Promises, persists to LocalStorage and recreates the seed data when the key does not exist. The interface always receives asynchronous data, exactly as it would from a real API.

## 9. How data is stored

One key per collection, in the `gateflow:v1:<collection>` format, containing JSON. Writes happen after every create, update or delete operation, ensuring that reloading the page preserves the state.

## 10. How to restore the demo data

Go to **Settings → Demo data → Restore data**. The action asks for confirmation, removes the persisted keys and reloads the application with the seed data. You can also clear the site's LocalStorage through the browser tools.

## 11. Limitations of the demo version

There is no real authentication, multi-user support, permission control or cross-device synchronization. Data lives only in the current browser. There is no communication with physical equipment: the device buttons only simulate a status change.

## 12. What production would require

- **REST API** with versioned contracts and server-side input validation.
- **Relational database** (PostgreSQL) with migrations, indexes and referential integrity.
- **Authentication** with session/JWT, profiles (administration, front desk, resident) and per-resource authorization.
- **Logs and auditing** for every movement, with author, timestamp and origin.
- **Secure communication** between devices and server (TLS, mTLS for hardware, queues for offline events).
- **Infrastructure** with containers, CI/CD, separate environments and observability.
- **Backup** automated with restore testing.
- **LGPD** (Brazilian data protection law): legal basis, minimization, defined retention, encryption of personal data and consent trail.
- **Monitoring** of availability, errors and operational metrics.

## 13. Integration with real hardware

Integration depends on an SDK, API or protocol provided by the manufacturer — the equipment model alone is not enough. Access controllers and QR Code readers (Intelbras and similar), electronic locks, IP cameras (RTSP/ONVIF) and intercom systems (SIP) can be evaluated. A real deployment requires compatibility validation, security testing and an adequate network. **No real integration is implemented in this project.**

## 14. Improvement roadmap

- Authentication and access profiles.
- Resident approval of visitors (web/app).
- Delivery notifications via e-mail or WhatsApp.
- Exportable reports and filters by period.
- Visitor photo upload and pre-authorization with QR Code.
- Automated component and service tests.
- Dark theme and internationalization.

## 15. Contributing

The `main` branch is protected: every change goes through a Pull Request, including those coming from forks. The complete step-by-step guide, the mandatory code standards (150-line limit per file and layered modularization) and the verification checklist are in [CONTRIBUTING.md](CONTRIBUTING.md).

## 16. Final notes

All dashboard content is derived from the demo data in [src/data](src/data). Operation is entirely local: the project runs without a server, database or external service.
