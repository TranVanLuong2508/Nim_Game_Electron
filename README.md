# ⚛️ React + TypeScript + Vite

This template provides a minimal setup to get **React** working in **Vite** with **Hot Module Replacement (HMR)** and some recommended **ESLint** rules.

## 🔌 Available Plugins

Two official plugins are available for React Fast Refresh:

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react): Uses **Babel**
- [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc): Uses **SWC**

---

## 🧹 Expanding the ESLint Configuration

If you're building a **production-level** application, it’s recommended to enable **type-aware lint rules** for better code quality.

### ✅ Recommended ESLint Setup

```ts
// eslint.config.js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Use type-checked configs instead of `tseslint.configs.recommended`
      ...tseslint.configs.recommendedTypeChecked,

      // For stricter rules:
      // ...tseslint.configs.strictTypeChecked,

      // For stylistic rules (optional):
      // ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
