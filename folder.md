.
├── public/                 # Static assets (e.g., favicon)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── TaskBuilder/    # Main feature folder
│   │   │   ├── TaskBuilder.tsx
│   │   │   ├── TaskBuilder.scss
│   │   │   ├── components/ # Sub-components
│   │   │   │   ├── Condition/
│   │   │   │   │   ├── Condition.tsx
│   │   │   │   │   └── Condition.scss
│   │   │   │   ├── Group/
│   │   │   │   │   ├── Group.tsx
│   │   │   │   │   └── Group.scss
│   │   │   │   ├── Preview/
│   │   │   │   │   ├── Preview.tsx
│   │   │   │   │   └── Preview.scss
│   │   │   │   └── ActionSelector/
│   │   │   │       ├── ActionSelector.tsx
│   │   │   │       └── ActionSelector.scss
│   │   └── ui/             # Shared UI (e.g., MetricSelect,OperatorSelect)
│   │       ├── MetricSelect.tsx
│   │       ├── RangeSelect.tsx
│   │       ├── OperatorSelect.tsx
│   │       └── ValueInput.tsx
│   ├── redux/              # Redux setup
│   │   ├── slices/
│   │   │   └── taskSlice.ts  # Reducer for tasks
│   │   ├── store.ts
│   │   └── types.ts         # Redux-specific types if needed
│   ├── types/               # Global TS types (from Notion)
│   │   └── index.ts         # Export all types here
│   ├── utils/               # Helpers
│   │   ├── ruleUtils.ts     # e.g., validateRule, buildPreviewText
│   │   └── dateUtils.ts     # For range calculations
│   ├── styles/              # Global SCSS
│   │   ├── index.scss
│   │   └── variables.scss
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md                # Instructions for running


