# Environment Variables Setup

## Creating .env.local File

1. **Create the file**: In the root directory of your project, create a file named `.env.local`

2. **Copy this template** into `.env.local`:

```env
# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/apexrush_karts
# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/apexrush_karts

# JWT Secret (generate a random string for production)
# You can generate one with: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration (for image uploads)
# Sign up at https://cloudinary.com to get these
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration (SMTP)
# For Gmail, you need to enable 2-Factor Auth and create an App Password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@apexrushkarts.com

# Admin Email (where order notifications will be sent)
ADMIN_EMAIL=your-admin-email@example.com
```

## Configuration Steps

### 1. MongoDB Setup
- **Local MongoDB**: Install MongoDB locally and use `mongodb://localhost:27017/apexrush_karts`
- **MongoDB Atlas (Recommended)**: 
  - Sign up at https://www.mongodb.com/cloud/atlas
  - Create a free cluster
  - Get your connection string
  - Replace `username:password@cluster.mongodb.net` with your credentials

### 2. JWT Secret
- Generate a secure random string: `openssl rand -base64 32`
- Or use any long random string (minimum 32 characters recommended)
- **Important**: Never commit this to git!

### 3. Cloudinary (Image Uploads)
- Sign up at https://cloudinary.com (free tier available)
- Go to Dashboard → Settings
- Copy your Cloud Name, API Key, and API Secret

### 4. Email Setup (Gmail Example)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled
   - Go to App passwords
   - Select "Mail" and your device
   - Copy the generated password
3. Use the generated password in `SMTP_PASS`

### 5. Admin Email
- Set this to the email address where you want to receive order notifications
- This is where order confirmation emails will be sent

## Important Notes

- ⚠️ **Never commit `.env.local` to git** - it's already in `.gitignore`
- ⚠️ Change all placeholder values before deploying to production
- ⚠️ The JWT_SECRET should be unique and secure in production
- ✅ For development, you can use placeholder values temporarily
- ✅ Restart your development server after changing `.env.local`

## Quick Start (Development)

For quick testing without all services configured:

```env
# Minimal setup for development
MONGODB_URI=mongodb://localhost:27017/apexrush_karts
JWT_SECRET=dev-secret-key-change-in-production-min-32-chars

# Optional - leave these empty if not using yet
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
ADMIN_EMAIL=
```

Note: Some features (image upload, email) won't work without proper configuration, but the app will run.

