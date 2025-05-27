# HrDashboard
# FLAM Frontend
A modern web application built with Next.js 13, TypeScript, and Tailwind CSS, featuring a beautiful UI powered by Radix UI components
## Features
- **Employee Management**
  - Employee profiles and information
  - Employee data management
  - Employee-related operations
- **Analytics Dashboard**
  - Data visualization
  - Performance metrics
  - Interactive charts and graphs
- **Bookmarks System**
  - Save and organize important items
  - Quick access to bookmarked content
  - Bookmark management
- **Modern UI/UX**
  - Responsive design
  - Dark/Light mode support
  - Beautiful animations
  - Accessible components using Radix UI
  - Tailwind CSS for styling
## 🛠️ Tech Stack
- **Framework:** Next.js 13
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **State Management:** Zustand
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Icons:** Lucide React
## 📋 Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
## 🚀 Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flam_frontend
   ```
2. **Install dependencies**
   ```bash
   cd project
   npm install
   # or
   yarn install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser**
   Navigate to `http://localhost:3000`
## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
## 🔧 Environment Variables
Create a `env.local` file in the project root with the following variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```
## 📦 Project Structure

```
project/
├── app/                # Next.js 13 app directory
│   ├── auth/          # Authentication related pages
│   ├── employee/      # Employee management
│   ├── analytics/     # Analytics dashboard
│   └── bookmarks/     # Bookmarks system
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
└── public/           # Static assets
```


