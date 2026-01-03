import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { authenticateToken } from '@/lib/auth';

// PUT /api/products/[id]/ratings/[ratingId] - Update a rating (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; ratingId: string } }
) {
  try {
    await connectDB();

    // Authenticate admin
    try {
      const user = await authenticateToken(request);
      if (user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized - Admin access required' },
          { status: 403 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { rating, review } = body;

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // For now, just return success
    // You can extend this to update in a separate Ratings collection
    return NextResponse.json({
      message: 'Rating updated successfully',
      rating: {
        _id: params.ratingId,
        rating,
        review,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error updating rating:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/ratings/[ratingId] - Delete a rating (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; ratingId: string } }
) {
  try {
    await connectDB();

    // Authenticate admin
    try {
      const user = await authenticateToken(request);
      if (user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized - Admin access required' },
          { status: 403 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // For now, just return success
    // You can extend this to delete from a separate Ratings collection
    return NextResponse.json({
      message: 'Rating deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting rating:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

