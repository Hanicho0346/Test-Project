React + TypeScript + Vite
This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react — Uses Babel for Fast Refresh.
@vitejs/plugin-react-swc — Uses SWC for Fast Refresh.
Expanding the ESLint Configuration
For production applications, it is recommended to update the ESLint configuration to enable type-aware lint rules.

1. Configure the top-level parserOptions property
export default tseslint.config({
  languageOptions: {
    // Other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
2. Update ESLint Configuration for Type-Checked Rules
Replace tseslint.configs.recommended with tseslint.configs.recommendedTypeChecked or tseslint.configs.strictTypeChecked. Optionally, you can add ...tseslint.configs.stylisticTypeChecked to improve stylistic rules.

// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the React version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the React plugin
    react,
  },
  rules: {
    // Other rules...
    // Enable recommended rules for React
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
3. Install ESLint Plugin for React
To ensure ESLint correctly understands React's JSX, install eslint-plugin-react:

npm install eslint-plugin-react --save-dev