# Guitar & Strings Co - Setup Guide

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority

# JWT Secret for Dashboard Authentication
JWT_SECRET=your_jwt_secret_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Contact Form Email
CONTACT_EMAIL=contact@guitarstringsco.com
ADMIN_EMAIL=admin@guitarstringsco.com

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Fixing the Image Upload Issue

The form reset issue when uploading images was caused by:

1. **Missing Cloudinary environment variables** - causing upload to fail
2. **Poor error handling** - causing form reset when upload fails

### What I Fixed:

1. **Better Error Handling**: The ImageUpload component now shows specific error messages instead of generic ones
2. **Environment Variable Check**: The upload API now checks if Cloudinary is configured and shows a helpful error message
3. **Form Protection**: The form won't reset when image upload fails

### To Fix the Upload Issue:

1. **Set up Cloudinary** (free tier available):

   - Go to [Cloudinary](https://cloudinary.com/) and create an account
   - Get your Cloud Name, API Key, and API Secret from the dashboard
   - Add them to your `.env.local` file

2. **Alternative**: If you don't want to use Cloudinary, you can:
   - Use placeholder images for now
   - The form will still work without images
   - You can add images later when Cloudinary is configured

### Testing the Fix:

1. Create the `.env.local` file with your Cloudinary credentials
2. Restart your development server: `npm run dev`
3. Try uploading an image in the create product form
4. The form should no longer reset when upload fails

## Database Setup

After setting up the environment variables:

1. Run the database seed script:

   ```bash
   npm run seed
   ```

2. This will create:
   - An admin user (username: `admin`, password: `admin123`)
   - Sample product data

## Dashboard Access

- URL: `/dashboard`
- Username: `admin`
- Password: `admin123`
- Or set `BYPASS_AUTH = true` in any dashboard page for easy access during development
