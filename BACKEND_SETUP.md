# Backend Dashboard Setup Guide

This guide will help you set up the backend dashboard for managing products and orders.

## Prerequisites

- Node.js and npm installed
- MongoDB database (local or cloud)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/guitar-shop

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Optional: MongoDB Atlas connection string (if using cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/guitar-shop?retryWrites=true&w=majority
```

## Database Setup

1. **Install MongoDB locally** or use MongoDB Atlas (cloud service)

2. **Seed the database** with initial data:
   ```bash
   npm run seed
   ```
   This will create:
   - An admin user (username: `admin`, password: `admin123`)
   - Sample guitar products

## Dashboard Access

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Access the dashboard**:
   - URL: `http://localhost:3000/dashboard/login`
   - Username: `admin`
   - Password: `admin123`

## Dashboard Features

### Authentication

- Secure login system with JWT tokens
- Protected routes requiring authentication
- Automatic logout on token expiration

### Product Management

- **View all products** with search, filter, and pagination
- **Add new products** with comprehensive form
- **Edit existing products** with pre-populated data
- **Delete products** with confirmation
- **Toggle featured status** for homepage display
- **Sort by** various criteria (price, date, etc.)

### Order Management

- **View all orders** with search and filtering
- **Update order status** (Pending, Processing, Shipped, Delivered, Cancelled)
- **View detailed order information** including customer details and items
- **Delete orders** with confirmation
- **Print orders** and view invoices

### API Endpoints

#### Authentication

- `POST /api/auth/login` - User login

#### Products

- `GET /api/products` - Get all products (with filtering/pagination)
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

#### Orders

- `GET /api/orders` - Get all orders (with filtering/pagination)
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get single order
- `PUT /api/orders/[id]` - Update order
- `DELETE /api/orders/[id]` - Delete order

## Database Models

### Product Schema

- Basic info: name, description, price, brand, model, year
- Specifications: condition, color, body, neck, fretboard, pickups, bridge
- Inventory: stock, SKU, category, featured status
- Metadata: creation/update timestamps

### Order Schema

- Customer information: name, email, phone, address
- Order details: items, subtotal, tax, shipping, total
- Payment: method, status, invoice number
- Metadata: creation/update timestamps

### User Schema

- Authentication: username, email, password (hashed)
- Role-based access: admin/manager roles
- Activity tracking: last login, active status

## Security Features

- **Password hashing** using bcryptjs
- **JWT token authentication** for API routes
- **Input validation** and sanitization
- **Error handling** with appropriate HTTP status codes
- **CORS protection** for API endpoints

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── route.ts
│   │   ├── products/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── orders/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   └── dashboard/
│       ├── page.tsx
│       ├── login/
│       │   └── page.tsx
│       ├── products/
│       │   ├── page.tsx
│       │   ├── create/
│       │   │   └── page.tsx
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx
│       └── orders/
│           ├── page.tsx
│           └── [id]/
│               └── page.tsx
├── lib/
│   └── mongodb.ts
├── models/
│   ├── Product.ts
│   ├── Order.ts
│   └── User.ts
└── scripts/
    └── seed.ts
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check connection string in `.env.local`
   - Verify network access for cloud databases

2. **Authentication Issues**

   - Clear browser localStorage
   - Check JWT_SECRET in environment variables
   - Verify admin user exists (run seed script)

3. **API Errors**
   - Check browser console for error messages
   - Verify API routes are accessible
   - Check server logs for detailed errors

### Development Tips

- Use MongoDB Compass for database visualization
- Monitor API requests in browser Network tab
- Check server logs for debugging information
- Use Postman or similar tools for API testing

## Production Deployment

For production deployment:

1. **Set secure environment variables**
2. **Use production MongoDB instance**
3. **Configure proper CORS settings**
4. **Set up SSL/TLS certificates**
5. **Implement rate limiting**
6. **Add monitoring and logging**
7. **Set up backup strategies**

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review server logs
3. Verify environment configuration
4. Test with fresh database seed
