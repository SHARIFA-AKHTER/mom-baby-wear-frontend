Mom & Baby Wear Frontend 🍼👕
This is the modern, responsive, and high-performance frontend for the Mom & Baby Wear 
e-commerce platform. Built with Next.js 14 (App Router) and Tailwind CSS, it provides
a seamless shopping experience for customers and a robust management dashboard for
admins and staff.

🚀 Key Features
Next.js 14 App Router: Utilizes modern routing features like grouped routes (auth, public, dashboard) for clean architecture.

Google OAuth Login: Seamless authentication integration using @react-oauth/google.

Role-Based Access: Dedicated dashboards for Admin and Staff with protected routing.

Cart & Checkout: Smooth cart management with persistent data and a streamlined checkout process.

Responsive UI: Fully optimized for mobile, tablet, and desktop using Tailwind CSS.

Data Fetching: Efficient API handling using Axios with custom instances and interceptors.

Toast Notifications: Real-time feedback for user actions using Sonner.


🛠 Tech Stack
Framework: Next.js 14 (App Router)

Styling: Tailwind CSS, Lucide React (Icons)

State Management: React Query (TanStack Query) & Custom Hooks

Authentication: Google OAuth & JWT

HTTP Client: Axios

Forms & Validation: React Hook Form & Zod

📁 Project Structure
Plaintext

frontend/
├── app/                  # Next.js App Router (Grouped Routes)
│   ├── (auth)/           # Login and Registration pages
│   ├── (public)/         # Products, Categories, and Offers
│   ├── (dashboard)/      # Admin and Staff management panels
│   └── cart/             # Shopping cart and checkout flow
├── components/           # Reusable UI components (Navbar, Footer, Cards)
├── hooks/                # Custom React hooks (useAuth, useCart, useAxios)
├── utils/                # Helper functions (Axios instance, Auth helpers)
├── styles/               # Global CSS and Tailwind configurations
└── .env.local            # Local environment variables

🌐 Environment Variables
To run the frontend, create a .env.local file in the root directory and add the following:

NEXT_PUBLIC_API_BASE_URL="https://mom-baby-wear-backend.vercel.app/api"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_client_id"

⚙️ Installation & Setup
Clone the Repository:

git clone https://github.com/SHARIFA-AKHTER/mom-baby-wear-frontend.git

cd mom-baby-wear-frontend
Install Dependencies:
npm install

Run the Development Server:
npm run dev

Build for Production:
npm run build

🛡️ Authentication Flow
The frontend handles authentication securely by:

Sending the Google idToken to the backend for verification.

Storing the accessToken in HTTP-Only Cookies and LocalStorage for session persistence.

Using a custom useAxios hook with withCredentials: true to ensure secure cross-origin requests.