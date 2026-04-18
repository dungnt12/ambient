# Mobile — Pipeline & Workflow

## Validation pipeline

Single command gates every change:

```bash
npm run check
```

Runs sequentially, fails fast:

1. `npm run typecheck` — `tsc --noEmit`
2. `npm run lint` — `eslint .` (expo flat config + prettier + local design-system rules)
3. `npm run format:check` — `prettier --check "**/*.{ts,tsx,js,json,md}"`

Auto-fix helpers:

- `npm run lint:fix` — eslint --fix
- `npm run format` — prettier --write

## Standard workflow (every prompt)

1. Edit / add files.
2. Run `npm run check` **before replying** as done. If it fails, fix and rerun until green.
3. A `Stop` hook in `.claude/settings.local.json` re-runs `npm run check` automatically at end of each turn — safety net, not a substitute for step 2.
4. For UI changes Claude cannot self-verify: say so explicitly and ask the user to run `npm start` and confirm on device.

## Config files

- `eslint.config.js` — flat config: `eslint-config-expo` + `eslint-config-prettier`.
- `.prettierrc.json` — 2-space, single quotes, trailing commas, 100 width.
- `.prettierignore` — excludes `node_modules`, `.expo`, `.claude`, `dist`, native folders, lockfile.
- `.claude/settings.local.json` — Stop hook runs `npm run check`.

## Ground rules

- Never bypass the pipeline (no `--no-verify`, no disabling rules inline unless justified in a comment).
- Never add `any` to satisfy typecheck — fix the type.
- **Xóa là xóa sạch (i18n cleanup)**: Mỗi lần xóa/refactor component, UI element, screen, hoặc feature — **bắt buộc** mở `src/i18n/locales/en.json` và `src/i18n/locales/vi.json`, gỡ bỏ tất cả key i18n không còn được tham chiếu. Quy trình: sau khi xóa code, grep cả `src/` cho từng key t(…) / `<Trans>` đã xóa; nếu không còn hit, xóa key ở **cả en.json và vi.json** (phải đồng bộ 2 file). Không để orphan keys tồn đọng.
- If a rule is wrong for this codebase, adjust `eslint.config.js` instead of disabling per-file.
- Keep `npm run check` green at all times; a red `main` blocks every downstream prompt.

## Design system location

`src/design-system/` — tokens, theme, components, fonts. See `@../CLAUDE.md` and `@../design.md` for design intent.

## Design system & i18n guard (MANDATORY)

Every component under `src/` **must** use the design system and i18n. No exceptions:

- **Colors / typography / spacing / radius / shadow** — read from `useTheme()` or design-system tokens. Never inline hex literals (`#...`), never import `Text` / `SafeAreaView` from `react-native` (use the DS re-exports).
- **All user-facing strings** — go through `useTranslation()` / `t('key')` or `<Trans>`. Add the key to both `src/i18n/locales/en.json` and `src/i18n/locales/vi.json`. No raw literals inside `<Text>…</Text>`.
- **Icons** — Lucide via `lucide-react-native`, colored with DS tokens.

Enforced by local ESLint plugin `eslint/` (AST-based, runs inside `npm run lint`):

| Rule                            | What it catches                                                                                                                                                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ds/no-hardcoded-design-values` | Numeric/string literal on spacing / layout / visual / typography keys in inline `style={{…}}`, `StyleSheet.create`, or array style props. Allowed: `0`, `'auto'`, `'100%'`, flex flags, `aspectRatio:1`, values from `t.*` / `theme.*` / `tokens.*`. |
| `ds/no-raw-color-literal`       | `#hex`, `rgb()`, `rgba()`, `hsl()` outside `src/design-system/`, including SVG `fill` / `stroke` / `color` JSX attrs.                                                                                                                                |
| `ds/no-raw-jsx-text`            | String children inside `<Text>` / `<Heading>` / `<Label>`. Must go through `t('…')` or `<Trans>`. Pure punctuation / numbers allowed.                                                                                                                |

Scope: `src/**/*.{ts,tsx}`. Exemptions: `src/design-system/**` (tokens live here), plus `src/showcase/**` for `no-raw-jsx-text` only. Implementation: `eslint/rules/*.js` + `eslint/index.js` (plugin `ds`), wired in `eslint.config.js`.

## React component discipline (MANDATORY)

AI-generated React code tends to bloat: too many `useState`, `useEffect` to sync state, copy-paste JSX instead of composition. These rules are hard limits:

- **Derived state over useState.** Nếu một giá trị tính được từ props / state khác, **tính trực tiếp trong render** (hoặc `useMemo` nếu thực sự đắt). KHÔNG tạo `useState` + `useEffect` để sync. `useEffect` chỉ để setState là anti-pattern (React docs: "You Might Not Need an Effect").
- **Max 4 `useState` per component.** Quá 4 → gom vào `useReducer`, hoặc tách logic ra custom hook (`useXxx` trong `src/hooks/`). Custom hooks không bị giới hạn (đó là lý do hooks tồn tại).
- **Max 200 dòng per component function.** Quá ngưỡng → tách: (a) sub-components, (b) custom hook cho stateful logic, (c) constants / helpers ra file riêng cùng thư mục.
- **`useEffect` chỉ cho side effects thật sự** — subscriptions, DOM/native APIs, timers, logging. KHÔNG dùng để: derive state, transform data, chạy logic theo props. Mỗi `useEffect` phải có lý do tồn tại trên một dòng comment ngay phía trên nếu không hiển nhiên.
- **`useCallback` / `useMemo` chỉ khi có lý do đo được.** React 19 + React Compiler đã auto-memoize hầu hết trường hợp. Không sprinkle `useCallback` vào mọi handler "cho chắc" — đó là noise. Chỉ dùng khi: (a) deps array của effect/memo khác yêu cầu reference-stable, (b) đã profile và thấy re-render cost thật.
- **Event handlers > 3 dòng → extract** thành named function ngoài JSX. JSX giữ khai báo, không nhồi logic.
- **Props drilling > 2 cấp → Context** (nếu ít consumer), hoặc tái cấu trúc component tree. Không prop-drill xuyên 4–5 cấp.
- **Icons: chỉ dùng `lucide-react-native`** (theo lucide.dev icon design guide). Không import `@expo/vector-icons`, `react-native-vector-icons`, `react-icons`, phosphor, feather, hero-icons. Nếu Lucide thiếu icon cần thiết → tạo SVG primitive trong `src/design-system/icons/` bằng `react-native-svg`, khớp stroke-width / proportions của Lucide (2px stroke, 24×24 viewBox, rounded caps).

Enforced by local ESLint plugin `eslint/` (`ds/*`):

| Rule                      | What it catches                                                                                                                                    | Level |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `ds/max-use-state`        | `>4` `useState` calls trong một function có tên bắt đầu bằng chữ hoa (component). Custom hooks `useXxx` được exempt.                               | error |
| `ds/max-component-lines`  | Component function body `>200` dòng. Gợi ý tách sub-component / custom hook / constants.                                                           | error |
| `ds/no-sync-state-effect` | `useEffect(cb, deps)` mà body chỉ chứa `setXxx(...)` calls — dấu hiệu derived-state anti-pattern. Warning (có false positive, disable với lý do).  | warn  |
| `ds/icons-lucide-only`    | Import từ các icon library bị cấm (`@expo/vector-icons`, `react-native-vector-icons*`, `@heroicons/*`, `react-icons`, `phosphor-react-native`, …). | error |

Nếu một rule báo sai cho một case hợp lý, **không** disable inline một cách im lặng. Phải: (1) viết comment giải thích `// eslint-disable-next-line ds/<rule> — <reason>`, hoặc (2) refactor cho hết warning, hoặc (3) điều chỉnh rule trong `eslint/rules/` nếu sai có hệ thống.
