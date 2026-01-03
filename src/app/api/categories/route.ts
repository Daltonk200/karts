import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import { authenticateToken } from '@/lib/auth';

// GET /api/categories - List categories (filter by productType)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const productType = searchParams.get('productType');

    const query: any = { isActive: true };

    if (productType) {
      query.productType = productType;
    }

    const categories = await Category.find(query).sort({ name: 1 }).lean();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create category (protected)
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
    const { name, productType, description } = body;

    if (!name || !productType) {
      return NextResponse.json(
        { error: 'Name and productType are required' },
        { status: 400 }
      );
    }

    const category = new Category({
      name,
      productType,
      description,
      isActive: true,
    });

    await category.save();

    return NextResponse.json(
      {
        message: 'Category created successfully',
        category,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating category:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Category name already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

