# Markopolo Frontend Engineer Job Assessment: Automation Rules Task Builder

## Overview

This project implements the "Task portion of the Automation Rules" as specified in the assessment. It enables users to create automation rules for advertisements with multiple conditions using AND/OR logic, including support for nested conditions. The UI allows adding tasks (e.g., pause, resume, adjust bids/budgets), building complex rule structures, and provides real-time previews and visual feedback (e.g., condition evaluation badges).

The implementation adheres to the requirements:
- Built with **React** and **Vite** for fast development and bundling.
- **TypeScript** for type safety across components, Redux actions, and data models.
- **Redux** (with RTK) for effective state management of tasks and rules.
- **SCSS** for modular styling, integrated with **Mantine** as the preferred CSS framework.
- Responsive design adapting to different screen sizes.
- Modular, readable, reusable, and maintainable code following best practices (e.g., separation of concerns, error handling for edge cases like empty groups).
- Integration of structured data from the Notion schema (types defined in `src/types/index.ts`).
- Visual feedback (e.g., green/red badges for mock rule evaluation) and immediate UI updates on user actions.

The UI faithfully recreates the provided Figma designs, including task cards, condition/group builders, AND/OR badges, preview sections, and modal-based additions.

## Tech Stack

- **Frontend Framework**: React 18+ with Vite
- **Language**: TypeScript 5+
- **State Management**: Redux Toolkit
- **Styling**: SCSS + Mantine (v7+)
- **UI Components**: Mantine Core, Hooks, Notifications, Modals
- **Icons**: @tabler/icons-react
- **Utils**: Custom helpers for rule preview and evaluation (mocked for demo)

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+) or yarn/pnpm

## Installation

1. Clone the repository:
git clone https://github.com/PeaceOloruntoba/glowing-umbrella
cd glowing-umbrella

2. Install dependencies:
npm install


## Running the Application

1. Start the development server:
npm run dev

2. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

The app will hot-reload on code changes. To build for production:
npm run build

Serve the build with:
npm run preview


## Features

- **Task Management**: Add, edit, and remove tasks via modals. Each task selects an action (e.g., Pause, Increase Bid) and object type (Campaign, Adset, Ad).
- **Rule Building**: Recursive component for creating nested conditions and groups:
  - **Conditions**: Value-based or metric-based with metric/range/operator/value selectors.
  - **Groups**: AND/OR logic with nested children; supports arbitrary depth.
  - **Add/Remove**: + Condition / + Group buttons; trash icons for removal.
- **Visual Feedback**: 
  - Badges show AND (blue) / OR (orange).
  - Green/red badges for condition results (mock evaluation; updates on change).
  - Color changes on condition buttons/groups per Figma.
- **Preview**: Real-time textual preview of rule logic (e.g., "(Today Spend > 100 AND Yesterday Purchases < 50) OR ...").
- **Responsiveness**: Adapts to mobile/desktop; selects stack vertically on small screens.
- **Error Handling & Edge Cases**:
  - Prevents invalid inputs (e.g., negative values via NumberInput).
  - Handles empty tasks/groups with alerts.
  - Graceful deep nesting (fading opacity via CSS).
  - Immediate UI sync via Redux dispatches.

## Project Structure
├── public/                 # Static assets
├── src/
│   ├── components/         # Main UI (AutomationRules.tsx)
│   ├── redux/              # Store, slices (taskSlice.ts)
│   ├── types/              # TS interfaces (index.ts)
│   ├── utils/              # Helpers (ruleUtils.ts)
│   ├── styles/             # Global SCSS (index.scss, variables.scss)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md


## Notes:
Please check the main branch for the fully working tailwindcss implementation with proper styling.

Tested on Chrome/Firefox; mock evaluation simulates real metrics.

## License

For assessment purposes only. © Peace Oloruntoba 2025.

---

*Built with ❤️ for Markopolo. Good luck!*
