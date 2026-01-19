📌 Project Overview

Mom & Baby Wear Frontend is developed using Next.js 14 (App Router) and Tailwind CSS
with a strong focus on clean architecture, scalability, and professional UI/UX standards.
The application supports role-based access, secure authentication, advanced product
exploration, and a fully responsive design suitable for real-world deployment.

🚀 Key Features

Next.js 14 App Router

Grouped routes for auth, public, and dashboard

Clean, scalable folder architecture

Authentication & Authorization

Email/Password login

Google OAuth login using @react-oauth/google

Role-based protected routes (Customer, Staff, Admin,Manager)

E-commerce Functionality

Product listing & details

Search, filter, sort, and pagination

Cart & checkout flow

Order tracking

Dashboard System

Admin dashboard with statistics, charts, and CRUD management

Staff dashboard for inventory and order processing

UI / UX

Fully responsive (mobile, tablet, desktop)

Consistent card sizes, spacing, and components

Skeleton loaders, empty states, and toast notifications

Data Handling

Centralized Axios instance with interceptors

Secure cross-origin requests with credentials

Optimized data fetching using React Query

🛠 Tech Stack

Framework: Next.js 14 (App Router)

Styling: Tailwind CSS, Lucide React

State Management: TanStack Query (React Query), Custom Hooks

Authentication: Google OAuth & JWT

HTTP Client: Axios

Forms & Validation: React Hook Form & Zod


👥 User Roles & Access
Role	Access
Customer	Browse products, cart, checkout, orders
Staff	Inventory control, order processing
Admin	Full access (products, users, orders, coupons, analytics)
🧭 Page & Feature Mapping
Page	Features
Home	Hero, categories, highlights, CTA, newsletter
Products	Search, filter, sort, pagination
Product Details	Image gallery, description, related products
Cart	Add/remove items, quantity control
Checkout	Address & payment flow
Dashboard (Admin)	Stats, charts, CRUD
Dashboard (Staff)	Inventory & order handling

Maximum 3 primary colors + neutral palette

Light & Dark mode ready

Same card height, width, and border radius everywhere

Consistent button and typography styles

No placeholder or dummy content

Fully responsive layout

⏳ State Handling

Skeleton loaders for all async data

Empty state UI for no data scenarios

Toast notifications for success and error feedback

🔐 Route Protection

Public Routes: Home, Products, Login, Register

Protected Routes: Cart, Profile, Dashboard

Role-based access control implemented at layout and route level

🚀 Production Optimization

Dynamic imports for heavy components

Image optimization using next/image

Environment-based API configuration

📁 Project Structure
frontend/
├── app/                  # Next.js App Router (Grouped Routes)
│   ├── (auth)/           # Login & Registration
│   ├── (public)/         # Products, Categories, Offers
│   ├── (dashboard)/      # Admin & Staff dashboards
│   └── cart/             # Cart & Checkout
├── components/           # Reusable UI components
├── hooks/                # Custom hooks (useAuth, useCart, useAxios)
├── utils/                # Axios instance, helpers, constants
├── styles/               # Global styles & Tailwind config
└── .env.local            # Environment variables

🌐 Environment Variables

Create a .env.local file in the root directory:

NEXT_PUBLIC_API_BASE_URL=https://mom-baby-wear-backend.vercel.app/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

⚙️ Installation & Setup

Clone the repository:

git clone https://github.com/SHARIFA-AKHTER/mom-baby-wear-frontend.git
cd mom-baby-wear-frontend


Install dependencies:

npm install


Run development server:

npm run dev


Build for production:

npm run build

🔑 Demo Credentials

Admin

Email: samiha02@gmail.com

Password: 123456

Manager

Email: samiha50@gmail.com

Password: 123456

Staff

Email: samiha60@gmail.com

Password: 123456

Customer

Email: samiha01@gmail.com

Password: 123456

🛡️ Authentication Flow

Google idToken is sent to the backend for verification

JWT access token stored in HTTP-Only cookies

Axios configured with withCredentials: true

Session persistence across reloads

🌍 Live Deployment

Frontend: https://mom-baby-wear-frontend.vercel.app

Backend API: https://mom-baby-wear-backend.vercel.app



