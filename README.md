# DOZ3 Patient App

The patient-facing app in the DOZ3 health ecosystem. Built as a cross-platform PWA (Progressive Web App) that works on Android, iOS, and desktop browsers.

**Live Demo:** _Deploy to GitHub Pages to get your URL (see below)_

**Figma Design:** [High-Fidelity Home Screen](https://www.figma.com/design/hCLWQRgtLL3HKfR6gvnAXj/High-Fidelity-Home-Screen)

## Features

- **Prescription Management** - Upload prescriptions or place doctor orders
- **DOZ3 Mart** - Browse and order pharmacy products
- **Health ID** - Digital health card with QR code
- **Order Tracking** - Track active and past orders
- **Cart & Checkout** - Full shopping flow with promo codes
- **Push Notifications** - Stay updated on orders and health reminders

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite 6 (SWC) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Routing | React Router v7 (HashRouter) |
| Icons | Lucide React |
| PWA | Custom Service Worker + Web App Manifest |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deploy to GitHub Pages (YC Demo)

### Option 1: Automatic (recommended)

1. Push this repo to GitHub
2. Go to **Settings > Pages > Source** and select **GitHub Actions**
3. Push to `main` branch - the app auto-deploys via the included GitHub Actions workflow

### Option 2: Manual

```bash
npm run build
# Upload the contents of the `dist/` folder to any static host
```

## Cross-Platform Support

This is a **PWA** (Progressive Web App), which means:

- **Android**: Users get an "Add to Home Screen" prompt. The app runs fullscreen like a native app.
- **iOS**: Users can tap Share > "Add to Home Screen" in Safari. The app runs in standalone mode.
- **Desktop**: Chrome/Edge will show an install button in the address bar.

The app includes:
- Web App Manifest for install prompts
- Service Worker for offline caching
- Viewport configuration for notch devices (safe area insets)
- Overscroll prevention for native app feel
- Touch-optimized UI (430px max-width mobile layout)

## Part of the DOZ3 Ecosystem

This patient app is one component of the DOZ3 platform:

| App | Purpose |
|-----|---------|
| **Patient App** (this) | Patient-facing pharmacy & health companion |
| Doctor App | Doctor consultation and prescription management |
| Pharmacy Dashboard | Pharmacy order fulfillment and inventory |
| Admin Panel | Platform administration and analytics |

## Project Structure

```
src/
├── App.tsx                    # Router + layout shell
├── main.tsx                   # Entry point with HashRouter
├── components/
│   ├── Header.tsx             # App header with notifications + cart
│   ├── BottomNav.tsx          # 5-tab bottom navigation
│   ├── HeroBanner.tsx         # Promotional carousel
│   ├── PrescriptionCards.tsx  # Upload/doctor order cards
│   ├── QuickActions.tsx       # Quick action grid
│   ├── ActiveNeeds.tsx        # Monthly refill section
│   ├── DOZ3Mart.tsx           # Product horizontal scroll
│   ├── figma/                 # Figma-specific utilities
│   ├── pages/                 # 10 page components
│   └── ui/                    # 30+ shadcn/ui primitives
├── styles/
│   └── globals.css            # Design tokens
└── index.css                  # Tailwind output
```
