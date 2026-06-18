<!-- Copilot / AI agent instructions for this repo -->
# Repo overview

- **Type:** Static multi-page frontend (HTML/CSS/vanilla JS) organized under `01/`.
- **Structure:** each domain has a paired folder under `01/html/<entity>/` (UI files) and `01/js/<entity>/` (scripts). Examples: `produtos`, `fornecedores`, `contasreceber`, `FormasPagamento`.
- **Key files:** `01/js/config.js` (API base URL and auth headers), `01/css/global.css` (global styles), `01/html/.../form.html` / `index.html` (UI entry points).

# Big picture & data flow

- The front-end is a thin client that calls a backend REST API using `fetch`. API base and headers live in `01/js/config.js`:
  - `API_BASE_URL` — update this to point to the backend.
  - `getHeaders()` — injects `Authorization: Bearer <token>` if `localStorage.getItem('token')` exists.
- Typical flow: `index.html` loads a `list.js` that calls `GET ${API_BASE_URL}/<Resource>` to populate a table. `form.html` uses `form.js` to `POST`/`PUT` JSON bodies. `detalhes.html` and `excluir.html` use `detalhes.js` / `excluir.js`.

# Project-specific conventions (important for code generation)

- File pairing: for any entity X, expect these files in the pattern:
  - `01/html/X/index.html` -> `01/js/X/list.js`
  - `01/html/X/form.html` -> `01/js/X/form.js`
  - `01/html/X/detalhes.html` -> `01/js/X/detalhes.js`
  - `01/html/X/excluir.html` -> `01/js/X/excluir.js`
- Naming gotchas: folder names are not strictly consistent (e.g., `01/js/FormaPagamento` vs `01/html/FormasPagamento`, capitalization/pluralization varies). On Windows this is tolerated, but generated code must match exact folder names (case-sensitive) when deployed to Linux servers.
- Paths in HTML are relative (e.g., `../../js/config.js`); preserve relative linking when adding pages or moving files.
- UI tables populate `<tbody id="tabela-...">` elements — use that pattern when adding new lists.

# Dev & debugging workflow

- Serve the `01` directory locally and open the pages in a browser. Examples (PowerShell):
  ```powershell
  cd "c:\Users\...\TDS02-UC9-main (3)\TDS02-UC9-main\01"
  python -m http.server 8000
  # or
  npx http-server . -p 8000
  ```
- Open browser DevTools to inspect `fetch` requests and CORS errors. Check `localStorage` for the `token` key when debugging auth issues.
- When changing `API_BASE_URL`, test list/form flows (e.g., `produtos/list.js`) and verify returned JSON shape matches code expectations (`produto.id`, `produto.nome`, `produto.preco`).

# Examples & patterns (copyable)

- Listing pattern (see `01/js/produtos/list.js`): fetch, loop, create `<tr>` innerHTML, append to `tbody` with id `tabela-...`.
- Config pattern (see `01/js/config.js`): centralized `API_BASE_URL` and `getHeaders()` used across modules.

# Integration points

- Backend: all requests go to endpoints under `API_BASE_URL` (e.g., `/Produtos`). Update `config.js` when backend location changes.
- Auth: frontend expects a JWT in `localStorage['token']`; server must accept `Authorization: Bearer <token>`.

# When editing or adding code

- Follow the existing file pairing and naming patterns described above.
- Prefer updating `01/js/config.js` instead of hardcoding base URLs across files.
- Keep HTML script tags `defer` where already used to preserve load order.

# If a `.github/copilot-instructions.md` already exists

- Merge new guidance conservatively: preserve any project-specific instructions already present and append the sections above under a clear header indicating they were auto-extracted.

# Questions for maintainers

- Confirm the canonical folder names for payment-related files: `FormasPagamento` vs `FormaPagamento` and preferred capitalization for future work.

-- End of Copilot instructions (please review and request edits)
