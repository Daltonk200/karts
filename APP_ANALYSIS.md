# Apex Rush Karts - Complete Application Analysis

## 📋 Overview

**Apex Rush Karts** is a full-stack Next.js e-commerce application for selling go-karts, racing equipment, and related services. Built with Next.js 15, React 19, TypeScript, MongoDB, and modern web technologies.

---

## 🏗️ Architecture & Tech Stack

### Core Technologies
- **Framework**: Next.js 15.4.6 (App Router)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Database**: MongoDB (via Mongoose 8.17.1)
- **State Management**: Zustand 5.0.7 with persistence
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives, custom components
- **Image Management**: Cloudinary 2.7.0
- **Authentication**: JWT (jsonwebtoken 9.0.2) + bcryptjs 3.0.2
- **Email**: Nodemailer 7.0.5
- **Notifications**: react-hot-toast 2.5.2
- **Icons**: react-icons 5.5.0, lucide-react 0.540.0

### Key Features
- ✅ Server-side rendering (SSR) with Next.js App Router
- ✅ RESTful API routes
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT-based authentication
- ✅ Image upload and management via Cloudinary
- ✅ Persistent client-side state (Zustand with localStorage)
- ✅ Responsive design with Tailwind CSS
- ✅ Admin dashboard
- ✅ E-commerce features (cart, wishlist, checkout, orders)

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Admin dashboard pages
│   ├── karts/             # Product listing & detail pages
│   ├── services/          # Service pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── wishlist/          # Wishlist page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── admin/            # Dashboard components
│   ├── karts/            # Product-related components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility libraries
│   ├── mongodb.ts        # Database connection
│   ├── auth.ts           # Authentication utilities
│   ├── cloudinary.ts     # Image upload utilities
│   └── utils.ts          # Helper functions
├── models/               # Mongoose schemas
│   ├── Product.ts
│   ├── Order.ts
│   ├── User.ts
│   ├── Service.ts
│   └── Rating.ts
├── store/                # Zustand state stores
│   ├── cartStore.ts
│   ├── wishlistStore.ts
│   └── saveForLaterStore.ts
└── scripts/              # Database seeding
    └── seed.ts
```

---

## 🗄️ Database Models

### 1. Product (ApexProduct)
**Purpose**: Store go-karts and racing equipment

**Key Fields**:
- Basic: `name`, `description`, `price`, `originalPrice`, `brand`, `category`, `kartType`, `size`, `color`
- Media: `image` (main), `images[]`, `imagePublicIds[]` (Cloudinary)
- Inventory: `stock`, `sku` (unique), `isFeatured`, `isOnSale`
- Metadata: `rating`, `reviews`, `tags[]`, `weight`, `dimensions`
- Legacy fields (from guitar shop): `ingredients[]`, `benefits[]`, `application`, `expiryDate`

**Categories**:
- Racing Karts, Recreational Karts, Electric Karts, Racing Gear, Safety Equipment, Parts & Accessories, Services

**Kart Types**:
- Professional, Intermediate, Youth, Family, Eco-Friendly, All Types

### 2. Order (ApexOrder)
**Purpose**: Store customer orders

**Key Fields**:
- Customer info: `customer.firstName`, `customer.lastName`, `customer.email`, `customer.phone`, `customer.address`, `customer.city`, `customer.state`, `customer.zipCode`, `customer.country`
- Items: `items[]` (references Product with `productId`, `name`, `price`, `quantity`)
- Financial: `subtotal`, `tax`, `shipping`, `total`
- Metadata: `orderNumber` (unique), `invoiceNumber` (unique), `status`, `paymentMethod`, `notes`, `createdAt`, `updatedAt`

**Status Values**: pending, confirmed, shipped, delivered, cancelled
**Payment Methods**: invoice, bank-transfer, other

### 3. User (ApexUser)
**Purpose**: Admin/manager authentication

**Key Fields**:
- `username` (unique), `email` (unique), `password` (hashed with bcrypt)
- `role` (admin/manager), `isActive`, `lastLogin`, `createdAt`, `updatedAt`

**Security**: Passwords hashed with bcrypt (salt rounds: 10)

### 4. Service (ApexService)
**Purpose**: Store racing services (maintenance, tuning, coaching, etc.)

**Key Fields**:
- `name`, `description`, `category`, `price`, `duration` (minutes)
- `image`, `images[]`, `features[]`, `benefits[]`, `tags[]`
- `requirements[]`, `preparation`, `aftercare`
- `isActive`, `isFeatured` (max 3 featured services enforced in schema)

**Categories**: Maintenance, Tuning, Track Days, Coaching, Storage, Customization, Repairs

### 5. Rating (ApexRating)
**Purpose**: Product reviews and ratings

**Key Fields**:
- `productId` (reference), `userId`, `userName`, `userEmail`
- `rating` (1-5), `review` (max 1000 chars), `isVerified`
- Compound unique index on `(productId, userId)` to prevent duplicate ratings

---

## 🔌 API Routes

### Authentication
- `POST /api/auth/login` - Authenticate admin user, returns JWT token

### Products
- `GET /api/products` - List products with filtering, pagination, sorting
  - Query params: `page`, `limit`, `search`, `category`, `brand`, `kartType`, `featured`, `onSale`, `minPrice`, `maxPrice`, `sortBy`, `sortOrder`
- `POST /api/products` - Create new product (generates SKU if not provided)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/products/[id]/ratings` - Get product ratings
- `POST /api/products/[id]/ratings` - Add rating to product
- `GET /api/products/brands` - Get all unique brands

### Services
- `GET /api/services` - List services with filtering, pagination
  - Query params: `page`, `limit`, `search`, `category`, `isActive`, `isFeatured`, `sortBy`, `sortOrder`
- `POST /api/services` - Create new service
- `GET /api/services/[id]` - Get single service
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### Orders
- `GET /api/orders` - List orders with filtering, pagination
  - Query params: `page`, `limit`, `search`, `status`, `invoiceNumber`, `sortBy`, `sortOrder`
- `POST /api/orders` - Create new order (generates order number)
- `GET /api/orders/[id]` - Get single order
- `PUT /api/orders/[id]` - Update order (status, etc.)
- `DELETE /api/orders/[id]` - Delete order
- `GET /api/orders/[id]/invoice` - Generate invoice PDF

### Utilities
- `POST /api/upload` - Upload images to Cloudinary
- `POST /api/contact` - Send contact form email

---

## 🎨 Frontend Pages

### Public Pages
- `/` - Homepage with featured products, services, categories, promotional banner
- `/karts` - Product listing page with filters (category, brand, kartType, price, search)
- `/karts/[id]` - Product detail page
- `/services` - Service listing page
- `/services/[id]` - Service detail page
- `/cart` - Shopping cart page
- `/checkout` - Checkout process
- `/wishlist` - Wishlist page
- `/contact` - Contact form page
- `/about` - About page
- `/faq` - FAQ page
- `/privacy`, `/terms`, `/warranty`, `/shipping`, `/returns` - Legal/policy pages
- `/invoice/[id]` - Invoice view page
- `/purchase/[id]` - Purchase confirmation page

### Dashboard Pages (Protected)
- `/dashboard` - Main dashboard with stats overview
- `/dashboard/login` - Admin login page
- `/dashboard/products` - Product management list
- `/dashboard/products/create` - Create new product
- `/dashboard/products/[id]/edit` - Edit product
- `/dashboard/services` - Service management list
- `/dashboard/services/create` - Create new service
- `/dashboard/orders` - Order management list
- `/dashboard/orders/[id]` - Order detail view
- `/dashboard/analytics` - Analytics page
- `/dashboard/settings` - Settings page

---

## 🗂️ State Management (Zustand Stores)

### Cart Store (`cartStore.ts`)
**Storage**: localStorage key `"cart-storage"`

**State**:
- `items: CartItem[]` - Array of cart items

**Actions**:
- `addToCart(item)` - Add item or increment quantity
- `removeFromCart(itemId)` - Remove item
- `updateQuantity(itemId, quantity)` - Update item quantity
- `clearCart()` - Empty cart
- `getTotalItems()` - Total quantity of all items
- `getUniqueItems()` - Count of unique items
- `getTotalPrice()` - Sum of all item prices
- `isInCart(itemId)` - Check if item exists

**CartItem Interface**:
```typescript
{
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  kartType: string;
  quantity: number;
  stock: number;
  model: string;
}
```

### Wishlist Store (`wishlistStore.ts`)
**Storage**: localStorage key `"wishlist-storage"`

**State**:
- `items: KartProduct[]` - Array of wishlist items

**Actions**:
- `addToWishlist(product)` - Add product (no duplicates)
- `removeFromWishlist(productId)` - Remove product
- `isInWishlist(productId)` - Check if product exists
- `clearWishlist()` - Empty wishlist

### Save for Later Store (`saveForLaterStore.ts`)
**Storage**: localStorage key `"save-for-later-storage"`

**State**:
- `items: SavedItem[]` - Array of saved items

**Actions**:
- `addToSaved(item)` - Add item (no duplicates)
- `removeFromSaved(itemId)` - Remove item
- `clearSaved()` - Empty saved items
- `getSavedCount()` - Count items
- `isSaved(itemId)` - Check if item exists
- `moveToCart(itemId)` - Move item to cart and remove from saved

---

## 🎨 UI Components

### Layout Components
- `LayoutWrapper` - Conditionally renders Navbar/Footer (excludes dashboard routes)
- `Navbar` - Main navigation with search, cart, wishlist, mobile menu
- `Footer` - Footer with links, social media, newsletter
- `Container` - Page width container wrapper

### Product Components (`components/karts/`)
- `KartsHero` - Hero section for products page
- `KartsFilters` - Filter sidebar (category, brand, kartType, price, search, sort)
- `ProductsGrid` - Product grid/list view with pagination
- `ProductCard` - Individual product card component
- `ProductRating` - Rating display component

### Admin Components
- `DashboardLayout` - Sidebar navigation layout for dashboard

### UI Components (`components/ui/`)
- `button`, `input`, `label`, `select` - Form components
- `calendar`, `date-picker`, `date-range-picker` - Date components
- `popover` - Popover component
- `delete-confirmation-modal` - Confirmation dialog

### Utility Components
- `Hero` - Homepage hero section with video
- `Testimonials` - Testimonials section
- `Loader` - Loading spinner
- `PageLoader` - Full-page loader
- `ImageUpload` - Image upload component with Cloudinary integration

---

## 🔐 Authentication Flow

1. **Login** (`/dashboard/login`):
   - User submits username/password
   - POST to `/api/auth/login`
   - Server validates credentials with bcrypt
   - Returns JWT token (24h expiry)
   - Token stored in localStorage
   - Redirect to `/dashboard`

2. **Protected Routes**:
   - Dashboard pages check for JWT token
   - Token sent in Authorization header: `Bearer <token>`
   - Middleware verifies token via `authenticateToken()` from `lib/auth.ts`

3. **Token Structure**:
   ```typescript
   {
     userId: string;
     username: string;
     email: string;
     role: string;
   }
   ```

---

## 🖼️ Image Management

### Cloudinary Integration
- **Configuration**: Environment variables `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- **Upload Endpoint**: `POST /api/upload`
- **Image Processing**: Automatic resizing (800x800), WebP format conversion
- **Folder Structure**: `glowbeauty/products` (legacy folder name, should be updated)
- **Public IDs**: Stored in `imagePublicIds[]` array for deletion management

### Upload Flow
1. User selects images in admin/product forms
2. Images sent to `/api/upload` endpoint
3. Files converted to buffer, uploaded to Cloudinary
4. Returns URLs and public IDs
5. URLs stored in product `images[]`, first image in `image`
6. Public IDs stored in `imagePublicIds[]`

---

## 📧 Email Integration

### Nodemailer Setup
- **Configuration**: Environment variables `EMAIL_USER`, `EMAIL_PASS` (Gmail app password)
- **Contact Email**: `CONTACT_EMAIL`, `ADMIN_EMAIL`

### Email Endpoints
- `POST /api/contact` - Sends contact form submissions via email

---

## 🔍 Search & Filtering

### Product Search
- **Search Fields**: name, brand, description, ingredients, benefits, tags
- **Case-insensitive**: Uses MongoDB regex with `$options: "i"`
- **Debounced**: 300ms delay on frontend

### Filtering Options
- Category, Brand, Kart Type, Price Range, Featured, On Sale
- Combined filters with AND logic
- URL params synced with filters

### Sorting Options
- Featured (by `isFeatured` then `createdAt`)
- Price: Low to High / High to Low
- Rating (highest first)
- Name (alphabetical)
- Date (newest/oldest)

---

## 🛒 E-commerce Features

### Shopping Cart
- Persistent storage (localStorage)
- Add/remove/update quantities
- Price calculations (subtotal, tax, shipping, total)
- Stock tracking (display only, no validation in cart)

### Wishlist
- Persistent storage (localStorage)
- Add/remove items
- Visual indicators (filled heart icon)
- TikTok-style animation on add

### Checkout Flow
1. Cart review
2. Customer information form
3. Order creation via `POST /api/orders`
4. Order number generation
5. Invoice generation
6. Confirmation page

### Order Management
- Status tracking: pending → confirmed → shipped → delivered
- Order number generation (unique)
- Invoice number generation (unique)
- Invoice PDF generation (`/api/orders/[id]/invoice`)

---

## 🎨 Styling & Design

### Design System
- **Primary Color**: Red (#DC2626, #EF4444)
- **Fonts**: 
  - Outfit (main font via Google Fonts)
  - Caveat (accent font for headings)
- **Color Palette**: Zinc grays (50-900 scale)
- **Border Radius**: Custom `rounded-[5px]` (5px)
- **Shadows**: Subtle shadows with `shadow-sm`, `shadow-lg`

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Mobile menu with slide-in sidebar
- Responsive grids (1 → 2 → 3 → 4+ columns)

### Animations
- Smooth transitions (duration-200, duration-300)
- Hover effects (scale, translate, color changes)
- Loading states (spinners, skeletons)
- Wishlist pop animation (TikTok-style ripple effect)

---

## 🔧 Environment Variables

Required environment variables (`.env.local`):

```bash
# Database
MONGODB_URI=mongodb+srv://...

# Authentication
JWT_SECRET=your-secret-key

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=contact@apexrushkarts.com
ADMIN_EMAIL=admin@apexrushkarts.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🗄️ Database Seeding

**Script**: `npm run seed` (runs `src/scripts/seed.ts`)

**Seeded Data**:
- 1 admin user: `admin` / `admin123`
- 8 sample products (karts, gear, accessories)
- 6 sample services (maintenance, tuning, coaching, etc.)

**Database Collections**:
- `apexproducts` - Products
- `apexorders` - Orders
- `apexusers` - Admin users
- `apexservices` - Services
- `apexratings` - Product ratings

---

## 🚀 Key Features Summary

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Product browsing with filters and search
- ✅ Shopping cart with persistent storage
- ✅ Wishlist functionality
- ✅ Product detail pages with images
- ✅ Service listing and detail pages
- ✅ Checkout process
- ✅ Order management
- ✅ Invoice generation and viewing
- ✅ Admin dashboard
- ✅ Contact forms
- ✅ SEO-friendly pages

### Backend Features
- ✅ RESTful API
- ✅ MongoDB database with Mongoose
- ✅ JWT authentication
- ✅ Image upload to Cloudinary
- ✅ Email sending via Nodemailer
- ✅ Order number generation
- ✅ Invoice generation
- ✅ Product ratings/reviews
- ✅ Pagination and filtering
- ✅ Search functionality

### Admin Features
- ✅ Product CRUD operations
- ✅ Service CRUD operations
- ✅ Order management (view, update status, delete)
- ✅ Dashboard with statistics
- ✅ Analytics page
- ✅ Settings page
- ✅ Image upload and management

---

## 🔍 Notable Code Patterns

### Database Connection
- Cached connection pattern (prevents multiple connections in development)
- Uses global variable for connection caching
- Mongoose connection pooling

### Error Handling
- Try-catch blocks in API routes
- Proper HTTP status codes
- Error messages in JSON responses

### State Management
- Zustand with persistence middleware
- localStorage for client-side persistence
- Separate stores for different concerns (cart, wishlist, saved)

### Image Handling
- Next.js Image component for optimization
- Cloudinary for storage and CDN
- Multiple image support with main image fallback

### Authentication
- JWT tokens for stateless authentication
- Password hashing with bcrypt (salt rounds: 10)
- Token expiry: 24 hours

---

## 📝 Development Notes

### Legacy Code
- Some fields from guitar shop template remain (e.g., `ingredients`, `benefits`, `application` in Product model)
- Cloudinary folder name still uses `glowbeauty/products` (should be updated)
- Package name is `moose_project` (should be `apexrush_karts`)

### Areas for Improvement
1. Remove legacy fields from Product model
2. Update Cloudinary folder structure
3. Add proper TypeScript types for API responses
4. Implement rate limiting for API routes
5. Add comprehensive error logging
6. Implement proper authentication middleware for protected routes
7. Add input validation with Zod or similar
8. Update package.json name
9. Add unit tests
10. Add E2E tests

### Known Issues
- Dashboard uses mock data instead of real API calls in some places
- Some authentication checks are bypassed (commented out)
- Search query persistence uses sessionStorage (could be improved)
- No proper error boundaries
- No loading states for some async operations

---

## 🎯 Business Logic

### Product Features
- Featured products displayed on homepage (max 8)
- Sale pricing (originalPrice vs price)
- Stock tracking
- SKU auto-generation if not provided (format: `BRANDNAMERAND` + 3 digits)

### Service Features
- Maximum 3 featured services (enforced in schema)
- Duration in minutes
- Active/inactive status
- Categories for organization

### Order Features
- Unique order number generation
- Unique invoice number generation
- Status workflow: pending → confirmed → shipped → delivered
- Customer information capture
- Itemized order details

---

## 📊 Data Flow

### Product Purchase Flow
1. User browses products on `/karts`
2. Clicks product → `/karts/[id]`
3. Adds to cart → Zustand store + localStorage
4. Goes to `/cart` → Reviews items
5. Proceeds to `/checkout` → Fills customer info
6. Submits → `POST /api/orders`
7. Order created → Order number generated
8. Redirect to `/purchase/[id]` → Confirmation
9. Invoice available at `/invoice/[id]`

### Admin Product Management Flow
1. Login → `/dashboard/login`
2. Navigate to Products → `/dashboard/products`
3. Create/Edit → Form with image upload
4. Submit → `POST/PUT /api/products`
5. Images uploaded → Cloudinary
6. Product saved → MongoDB
7. View on storefront → `/karts`

---

## 🎓 Learning Points

This codebase demonstrates:
- Next.js App Router architecture
- Server and Client Components separation
- API Route handlers
- MongoDB with Mongoose ODM
- JWT authentication
- State management with Zustand
- Image upload and CDN integration
- E-commerce functionality
- Admin dashboard patterns
- Responsive design with Tailwind CSS
- TypeScript in React/Next.js

---

## 📚 External Dependencies Summary

**Core**:
- next, react, react-dom
- typescript
- mongodb, mongoose

**UI/Styling**:
- tailwindcss
- @radix-ui/* (UI primitives)
- lucide-react, react-icons
- swiper

**State/Data**:
- zustand
- date-fns

**Utilities**:
- bcryptjs, jsonwebtoken
- nodemailer
- cloudinary
- react-hot-toast
- dotenv

**Development**:
- eslint, eslint-config-next
- tsx (for seed script)

---

*Analysis completed: Complete understanding of Apex Rush Karts application architecture, features, and codebase structure.*

