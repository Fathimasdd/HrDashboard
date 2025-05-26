# 💼 HR Performance Dashboard

A modern HR dashboard built with Next.js for tracking employee performance, managing bookmarks, and viewing detailed analytics.

## 🚀 Features

### Core Features

1. **Dashboard Homepage (`/`)**
   - Employee cards with detailed information
   - Performance ratings (1-5 stars)
   - View, Bookmark, and Promote actions
   - Responsive grid layout

2. **Search & Filter**
   - Real-time search by name, email, or department
   - Multi-select department filter
   - Performance rating filter
   - Combined filtering capabilities

3. **Employee Details (`/employee/[id]`)**
   - Comprehensive employee profile
   - Performance history
   - Tabbed interface:
     - Overview
     - Projects
     - Feedback
   - Interactive actions (Bookmark, Promote)

4. **Bookmark Manager (`/bookmarks`)**
   - List of bookmarked employees
   - Quick actions for bookmarked employees
   - Remove from bookmarks functionality
   - Promote and Assign to Project actions

5. **Analytics Dashboard (`/analytics`)**
   - Department-wise performance ratings
   - Bookmark trends over time
   - Quick stats overview
   - Interactive charts

6. **Employee Management**
   - Add new employees
   - Form validation
   - Department assignment
   - Performance tracking

### Technical Features

- **Modern Tech Stack**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Zustand for state management
  - Chart.js for analytics

- **UI/UX**
  - Responsive design
  - Dark/Light mode
  - Loading states
  - Error handling
  - Toast notifications

- **Performance**
  - Client-side data fetching
  - Optimized rendering
  - Efficient state management

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hr-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
project/
├── app/                    # Next.js app directory
│   ├── analytics/         # Analytics page
│   ├── bookmarks/         # Bookmarks page
│   ├── employee/          # Employee details
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── employee/         # Employee-related components
│   ├── ui/              # UI components
│   └── header.tsx       # Header component
├── lib/                  # Utility functions and store
│   ├── store.ts         # Zustand store
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## 🔧 Environment Variables

No environment variables are required for the basic setup. The application uses the DummyJSON API for mock data.

## 🎨 Customization

- **Theme**: The application supports both light and dark modes. The theme can be toggled using the theme button in the header.
- **Styling**: The UI is built with Tailwind CSS and can be customized by modifying the Tailwind configuration.

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop
- Tablet
- Mobile devices

## 🔒 Data Management

- Employee data is fetched from the DummyJSON API
- Bookmarks are persisted in local storage
- Performance ratings are randomly generated for demo purposes

 