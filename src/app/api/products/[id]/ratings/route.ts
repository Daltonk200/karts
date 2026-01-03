import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { authenticateToken } from '@/lib/auth';

// GET /api/products/[id]/ratings - Get all ratings for a product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // For now, return empty array as we don't have a ratings collection yet
    // You can extend this to fetch from a separate Ratings collection
    return NextResponse.json({ ratings: [] });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/ratings - Add a rating (public)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { userId, userName, userEmail, rating, review } = body;

    if (!userId || !userName || !userEmail || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // For now, just return success
    // You can extend this to save to a separate Ratings collection
    const newRating = {
      _id: Date.now().toString(),
      userId,
      userName,
      userEmail,
      rating,
      review: review || '',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        message: 'Rating submitted successfully',
        rating: newRating,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating rating:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

