# Contributing to GateFlow

**English** · [Português](CONTRIBUTING.pt.md)

Thank you for your interest in the project. This document describes the contribution workflow, the adopted code standards and what is verified before a Pull Request is accepted.

Before you start, read the [README.md](README.md) to understand the scope: it is a front-end demonstration application, with no real backend, and data persisted in the browser's LocalStorage.

## Contribution workflow

The `main` branch is protected: **direct pushes are rejected**. Every change goes through a Pull Request.

1. **Fork** the repository by clicking *Fork* on GitHub.
2. Clone your fork:

   ```bash
   git clone https://github.com/<your-user>/gateflow.git
   cd gateflow
   npm install
   ```

3. Create a branch from `main`:

   ```bash
   git switch -c feat/short-change-name
   ```

4. Implement the change following the standards below.
5. Validate locally (see the verification section).
6. Push the branch to your fork and open a Pull Request against `main`.

   ```bash
   git push -u origin feat/short-change-name
   ```

## Branch names

Use a prefix that indicates the nature of the change:

| Prefix | Use |
| --- | --- |
| `feat/` | new feature |
| `fix/` | bug fix |
| `refactor/` | reorganization without behavior change |
| `docs/` | documentation |
| `chore/` | configuration, dependencies, build |

## Commits

Messages follow the `type: short description` pattern, in Portuguese, in the imperative mood and without a trailing period.

```text
feat: adiciona filtro por bloco na listagem de prestadores
fix: corrige overflow horizontal dos cards no mobile
docs: documenta o fluxo de deploy no README
```

Avoid generic commits such as `ajustes` or `wip`. If the change is large, prefer several small, coherent commits.

## Code standards

### 150-line limit per file

**No file may exceed 150 lines.** It is the core rule of the project and a Pull Request that violates it is rejected. When a file grows, extract a component, a hook or a utility.

To check the largest file in the project:

```powershell
Get-ChildItem -Recurse -File "src" -Include *.ts,*.tsx |
  ForEach-Object { [pscustomobject]@{ Lines = (Get-Content -LiteralPath $_.FullName | Measure-Object -Line).Lines; Path = $_.Name } } |
  Sort-Object Lines -Descending |
  Select-Object -First 5
```

### Mandatory modularization

The project follows layers with unidirectional dependency:

```text
types → constants/utils → data → services → hooks → components → pages → routes
```

Practical rules:

- **Pages never access the mock directly.** They consume a service in `src/services/api`.
- **Table columns, modals and form models** live in `src/components/<domain>/`, next to the domain.
- **Reusable logic** becomes a hook in `src/hooks` or a utility in `src/utils`.
- **Forms** use `Modal` + `useForm`; **tables** use `ResourceTable` + a column factory.
- Generic UI components live in `src/components/ui` and know nothing about business rules.

### Style

- TypeScript in strict mode. Avoid `any`; prefer types in `src/types`.
- The entire interface, comments and error messages are in **Brazilian Portuguese**.
- Tailwind CSS v4 with the project design tokens; avoid arbitrary colors and spacings.
- Presentational components do not `fetch` or touch LocalStorage.
- Accessibility: every icon button needs an `aria-label`, and forms need an associated `label`.

## Verification before opening the Pull Request

Run the three commands and confirm that all of them pass:

```bash
npm run typecheck   # TypeScript with no errors
npm run build       # production build
npm run dev         # manual test of the changed screen
```

Run the build even if the change seems small: it runs the typecheck and the Pages fallback copy. Pull Requests that break the build will not be merged.

## What to avoid

- Broad reformatting of files that are not part of your change.
- Dependency changes without justification in the Pull Request.
- Commits that include `node_modules`, `dist` or local editor configuration files.
- Translating the interface to another language.
- Adding a charting or state library without discussing it first in an issue.

## Questions

Open an [issue](https://github.com/kaique-albuquerque/gateflow/issues) describing your question or proposal before implementing something structurally new.
