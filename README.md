# Bhowmick Enterprise — Dashboard

![Next.js 15](https://img.shields.io/badge/Next.js%2015-Black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-000000?style=flat&logo=shadcnui&logoColor=white)

An enterprise-grade Dashboard layout and architecture for the **Bhowmick Enterprise LPG Distribution Management System**. 

This repository serves as the scalable frontend foundation, structured specifically to handle complex business logic, routing, and a massive feature set over time.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 & custom CSS variables for easy theming
- **Components**: ShadCN UI (Base UI implementation)
- **Icons**: React Icons (`react-icons/fi`, `react-icons/ri`)
- **Fonts**: Inter (Optimized for enterprise readability)

---

## 🏗️ Architecture & Folder Structure

The project utilizes a highly modular and decoupled architecture. Shared layouts and components are strictly separated from page-level content.

```text
src/
├── app/                      # Next.js App Router
│   ├── (modules)/            # Individual module routes (e.g., dashboard, suppliers)
│   │   ├── layout.tsx        # Module-specific shell (Header, Tabs)
│   │   └── page.tsx          # Module content and data components
│   ├── layout.tsx            # Root layout (Providers + DashboardLayout shell)
│   ├── page.tsx              # Root redirect to /dashboard
│   └── globals.css           # Global styles and enterprise theme tokens
│
├── components/               # React Components
│   ├── common/               # Shared UI blocks (e.g., PageHeader)
│   ├── layout/               # Core layout pieces (Sidebar, Topbar)
│   └── ui/                   # Auto-generated ShadCN components
│
├── config/                   # Static application configuration
│   └── sidebar-routes.ts     # Centralized navigation configuration
│
├── constants/                # Magic strings and theme constants
│   └── theme.ts              # Syncs JS logic with CSS custom properties
│
├── hooks/                    # Custom React hooks
│   └── use-sidebar.ts        # Sidebar context consumer
│
├── providers/                # React Context Providers
│   └── sidebar-provider.tsx  # Manages sidebar collapse/mobile state
│
└── types/                    # Centralized TypeScript definitions
    ├── common.ts             # Generic interfaces
    ├── layout.ts             # Layout specific interfaces
    └── sidebar.ts            # Sidebar specific interfaces
```

---

## 🎨 Key Features

1. **Intelligent Routing**: 14 distinct modules built-in (Inventory, Suppliers, Deliveries, etc.). Every module utilizes a `layout.tsx` to handle its own header, leaving `page.tsx` entirely clean for business logic.
2. **Responsive Sidebar**: 
   - **Desktop**: Collapsible navigation driven by React context (280px Expanded ↔ 80px Collapsed).
   - **Mobile**: Transforms into a slide-out drawer (ShadCN Sheet) accessible via a sticky Topbar hamburger menu.
3. **Configuration Driven Navigation**: Adding a new page to the sidebar requires a single 4-line object addition in `src/config/sidebar-routes.ts`. The UI handles the rest.
4. **Strictly Typed**: Zero instances of `any`. The entire application architecture is explicitly typed via dedicated files in `src/types/`.

---

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js 18.x or later installed.

### Installation

1. Clone the repository and navigate into the directory:
   ```bash
   cd bhoumic-enterprise
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. You will automatically be redirected to the `/dashboard` route.

### Build & Linting

To ensure codebase integrity, run the following commands before committing:

```bash
# Check for any ESLint or TypeScript warnings/errors
npm run lint

# Create an optimized production build
npm run build
```
