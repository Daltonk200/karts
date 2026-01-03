import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { authenticateToken } from '@/lib/auth';

// GET /api/products - List products with filtering, pagination, search
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const productType = searchParams.get('productType');
    const isFeatured = searchParams.get('isFeatured');
    const isOnSale = searchParams.get('isOnSale');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const query: any = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (productType) {
      query.productType = productType;
    }

    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    if (isOnSale === 'true') {
      query.isOnSale = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('category', 'name')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create product (protected)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate user
    try {
      await authenticateToken(request);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      name,
      description,
      productType,
      category,
      price,
      originalPrice,
      brand,
      sku,
      stock,
      images,
      imagePublicIds,
      isFeatured,
      isOnSale,
      tags,
      specifications,
    } = body;

    // Validate required fields
    if (!name || !description || !productType || !category || !price || !brand) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate category ObjectId
    const mongoose = await import('mongoose');
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return NextResponse.json(
        { error: 'Invalid category ID format' },
        { status: 400 }
      );
    }

    // Generate SKU if not provided
    let finalSku = sku;
    if (!finalSku) {
      const brandPrefix = brand.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      finalSku = `${brandPrefix}${randomNum}`;
    }

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: finalSku });
    if (existingProduct) {
      return NextResponse.json(
        { error: 'SKU already exists' },
        { status: 400 }
      );
    }

    // Create product
    const product = new Product({
      name,
      description,
      productType,
      category,
      price,
      originalPrice,
      brand,
      sku: finalSku,
      stock: stock || 0,
      images: images || [],
      imagePublicIds: imagePublicIds || [],
      isFeatured: isFeatured || false,
      isOnSale: isOnSale || false,
      tags: tags || [],
      specifications: specifications || {},
    });

    await product.save();
    await product.populate('category', 'name');

    return NextResponse.json(
      {
        message: 'Product created successfully',
        product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'SKU already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
