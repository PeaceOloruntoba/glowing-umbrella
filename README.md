# Rule Builder UI

A React-based UI for creating and managing marketing automation rules with a hierarchical condition system.

## Features

- Create rules with nested conditions using AND/OR logic
- Support for multiple metrics, operators, and time ranges
- Intuitive drag-and-drop interface (planned)
- Real-time rule validation
- Persistence using Redux and localStorage

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Project Structure

- `src/`
  - `components/` - Reusable UI components
    - `RuleGroup.tsx` - Recursive rule group component
    - `TaskCard.tsx` - Task management component
    - `ui/` - Base UI components
  - `mappers/` - Data transformation logic
  - `store/` - Redux store configuration
  - `types/` - TypeScript type definitions
  - `App.tsx` - Main application component

## Development

- Build for production:
  ```bash
  npm run build
  ```
- Run tests:
  ```bash
  npm test
  ```
- Lint code:
  ```bash
  npm run lint
  ```
