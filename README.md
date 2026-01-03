# Apex Rush Karts - E-Commerce Platform

Full-stack Next.js e-commerce application for go-karts, scooters, and spare parts.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- SMTP email credentials (Gmail recommended)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your credentials (see BACKEND_SETUP.md for details)

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/dashboard/login

## 📚 Documentation

- **BACKEND_SETUP.md** - Complete backend setup guide with all API routes and configuration
- All API routes are documented with request/response formats

## 🎯 Key Features

- ✅ Complete e-commerce frontend
- ✅ Admin dashboard with analytics
- ✅ Product management (Go-Karts, Scooters, Spare Parts)
- ✅ Order management with email notifications
- ✅ Category management
- ✅ Service management
- ✅ Image upload (Cloudinary)
- ✅ JWT authentication
- ✅ Email notifications (orders, contact form)

## 💳 Payment Processing

**Important**: This application does NOT integrate payment gateways. Orders are sent via email to the admin, who contacts customers directly to process payment manually. This approach builds trust through personal communication.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Image Storage**: Cloudinary
- **Email**: Nodemailer
- **State Management**: Zustand
- **UI**: Tailwind CSS, Radix UI
- **Charts**: Recharts

## 📁 Project Structure

```
src/
├── app/              # Next.js pages and API routes
│   ├── api/         # Backend API routes
│   ├── dashboard/   # Admin dashboard
│   └── ...          # Public pages
├── components/      # React components
├── lib/             # Utilities (auth, email, cloudinary, mongodb)
├── models/          # Mongoose schemas
├── store/           # Zustand stores
└── types/           # TypeScript types
```

## 🔐 Admin Access

Create an admin user in MongoDB (see BACKEND_SETUP.md for instructions).

## 📝 License

Private project

