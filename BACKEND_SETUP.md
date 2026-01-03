# Backend Setup Guide

## ✅ Completed Backend Implementation

All core backend infrastructure has been implemented:

### 1. Database Connection
- ✅ `src/lib/mongodb.ts` - MongoDB connection with caching

### 2. Authentication
- ✅ `src/lib/auth.ts` - JWT token generation/verification, password hashing
- ✅ `src/app/api/auth/login/route.ts` - Login endpoint

### 3. Database Models
- ✅ `src/models/Product.ts` - Product schema with specifications
- ✅ `src/models/Order.ts` - Order schema with customer info
- ✅ `src/models/User.ts` - Admin user schema
- ✅ `src/models/Service.ts` - Service schema
- ✅ `src/models/Category.ts` - Category schema
- ✅ `src/models/Rating.ts` - Rating/review schema

### 4. API Routes
- ✅ `/api/products` - GET (list), POST (create)
- ✅ `/api/products/[id]` - GET, PUT, DELETE
- ✅ `/api/products/brands` - GET (list brands)
- ✅ `/api/orders` - GET (list), POST (create with email notification)
- ✅ `/api/orders/[id]` - GET, PUT, DELETE
- ✅ `/api/categories` - GET, POST
- ✅ `/api/categories/[id]` - PUT, DELETE
- ✅ `/api/services` - GET, POST
- ✅ `/api/services/[id]` - GET, PUT, DELETE
- ✅ `/api/upload` - POST (Cloudinary image upload)
- ✅ `/api/contact` - POST (contact form email)

### 5. Utilities
- ✅ `src/lib/email.ts` - Email sending with order notification HTML
- ✅ `src/lib/cloudinary.ts` - Image upload/delete utilities
- ✅ `src/lib/orderUtils.ts` - Order/invoice number generation

## 🔧 Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/apexrush_karts
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/apexrush_karts

# JWT Secret (generate a random string for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@apexrushkarts.com

# Admin Email (where order notifications will be sent)
ADMIN_EMAIL=your-admin-email@example.com
```

## 📧 Email Setup (Gmail Example)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `SMTP_PASS`

## 🚀 Next Steps

### 1. Set Up MongoDB
- Install MongoDB locally, or
- Create a MongoDB Atlas account (free tier available)
- Update `MONGODB_URI` in `.env.local`

### 2. Set Up Cloudinary (for image uploads)
- Sign up at https://cloudinary.com
- Get your Cloud Name, API Key, and API Secret
- Update Cloudinary env variables

### 3. Configure Email
- Set up SMTP credentials (Gmail recommended for testing)
- Update email env variables
- Set `ADMIN_EMAIL` to receive order notifications

### 4. Create Admin User
You'll need to create an admin user in the database. You can do this via MongoDB shell or create a seed script:

```javascript
// Example MongoDB shell command
use apexrush_karts
db.users.insertOne({
  username: "admin",
  email: "admin@apexrushkarts.com",
  password: "<hashed-password>", // Use bcrypt to hash
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or create a seed script to hash the password properly.

### 5. Test the APIs
- Test login: `POST /api/auth/login`
- Test product creation: `POST /api/products`
- Test order creation: `POST /api/orders` (should send email)

## 📝 Important Notes

### Order Email Notifications
- Orders are automatically sent to `ADMIN_EMAIL` when created
- Email includes full order details, customer info, and items
- No payment gateway - orders are processed manually
- Admin contacts customer directly to proceed with payment

### Authentication
- Protected routes require JWT token in Authorization header: `Bearer <token>`
- Token expires after 24 hours
- Login endpoint: `POST /api/auth/login` with `{ username, password }`

### Product Specifications
- Specifications are stored as a dynamic object
- Structure depends on productType (go-karts, scooters, spare-parts)
- See `src/config/productTypes.ts` for field definitions

### Category Management
- Categories are linked to products via ObjectId reference
- Categories can be filtered by productType
- Inline category creation from product form supported

## 🔒 Security Considerations

1. **Change JWT_SECRET** in production
2. **Use strong passwords** for admin users
3. **Enable HTTPS** in production
4. **Validate all inputs** (currently basic validation in place)
5. **Rate limiting** - Consider adding rate limiting for API routes
6. **CORS** - Configure CORS if needed for external API access

## 📊 Database Indexes

The models include indexes for:
- Product: category, productType, brand, isFeatured, isOnSale, sku, text search
- Order: orderNumber, invoiceNumber, customer.email, status, createdAt
- Service: category, isFeatured, isActive
- Category: productType, isActive
- Rating: productId, userId (compound unique)

## 🎯 Frontend Integration

The frontend is ready but currently uses mock data. You'll need to:
1. Update API calls to use the new endpoints
2. Handle authentication tokens
3. Update product data structure to match new schema
4. Test all CRUD operations

All API routes follow RESTful conventions and return JSON responses.

