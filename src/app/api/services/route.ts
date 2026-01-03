import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { authenticateToken } from '@/lib/auth';

// GET /api/services - List services with filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const isFeatured = searchParams.get('isFeatured');
    const isActive = searchParams.get('isActive') !== 'false'; // default true
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '0');

    const query: any = {};

    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    if (isActive) {
      query.isActive = true;
    }

    if (category) {
      query.category = category;
    }

    let servicesQuery = Service.find(query).sort({ createdAt: -1 });

    if (limit > 0) {
      servicesQuery = servicesQuery.limit(limit);
    }

    const services = await servicesQuery.lean();

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create service (protected)
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
      category,
      price,
      duration,
      image,
      images,
      features,
      benefits,
      tags,
      requirements,
      preparation,
      aftercare,
      isActive,
      isFeatured,
    } = body;

    // Validate required fields
    if (!name || !description || !category || !price || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check featured service limit
    if (isFeatured) {
      const featuredCount = await Service.countDocuments({ isFeatured: true });
      if (featuredCount >= 3) {
        return NextResponse.json(
          { error: 'Maximum 3 featured services allowed' },
          { status: 400 }
        );
      }
    }

    // Create service
    const service = new Service({
      name,
      description,
      category,
      price,
      duration,
      image,
      images: images || [],
      features: features || [],
      benefits: benefits || [],
      tags: tags || [],
      requirements: requirements || [],
      preparation,
      aftercare,
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured || false,
    });

    await service.save();

    return NextResponse.json(
      {
        message: 'Service created successfully',
        service,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
