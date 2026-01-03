import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cart from '@/models/Cart';
import { verifyToken } from '@/lib/auth';
import mongoose from 'mongoose';

// GET /api/cart - Get user's cart
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate user
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let auth;
    try {
      auth = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId: auth.userId }).lean();

    if (!cart) {
      // Create empty cart if doesn't exist
      const newCart = new Cart({
        userId: auth.userId,
        items: [],
      });
      await newCart.save();
      cart = newCart.toObject();
    }

    return NextResponse.json({ cart: cart.items || [] });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/cart - Add/update item in cart
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate user
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let auth;
    try {
      auth = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, name, price, image, quantity = 1 } = body;

    if (!productId || !name || price === undefined || !image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: auth.userId });

    if (!cart) {
      cart = new Cart({
        userId: auth.userId,
        items: [],
      });
    }

    // Convert productId to ObjectId if it's a string
    const productObjectId = mongoose.Types.ObjectId.isValid(productId) 
      ? new mongoose.Types.ObjectId(productId)
      : productId;

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productObjectId.toString()
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].name = name;
      cart.items[existingItemIndex].price = price;
      cart.items[existingItemIndex].image = image;
    } else {
      // Add new item
      cart.items.push({
        productId: productObjectId,
        name,
        price,
        image,
        quantity,
      });
    }

    await cart.save();

    return NextResponse.json({
      message: 'Item added to cart',
      cart: cart.items,
    });
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/cart - Update cart (replace all items or update specific item)
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate user
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let auth;
    try {
      auth = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, productId, quantity, items } = body;

    let cart = await Cart.findOne({ userId: auth.userId });

    if (!cart) {
      cart = new Cart({
        userId: auth.userId,
        items: [],
      });
    }

    if (action === 'updateQuantity' && productId !== undefined) {
      // Update specific item quantity
      const itemIndex = cart.items.findIndex(
        (item: any) => item.productId.toString() === productId
      );

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          cart.items.splice(itemIndex, 1);
        } else {
          cart.items[itemIndex].quantity = quantity;
        }
      }
    } else if (action === 'replaceAll' && Array.isArray(items)) {
      // Replace all items (sync from localStorage)
      // Transform items to match Cart model structure
      cart.items = items.map((item: any) => {
        const productId = item.productId || item.id;
        // Convert string ID to ObjectId if needed
        const productObjectId = mongoose.Types.ObjectId.isValid(productId) 
          ? new mongoose.Types.ObjectId(productId)
          : productId;
        
        return {
          productId: productObjectId,
          name: item.name,
          price: item.price,
          image: item.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
          quantity: item.quantity || 1,
        };
      });
    } else if (action === 'removeItem' && productId) {
      // Convert productId to ObjectId if it's a string
      const productObjectId = mongoose.Types.ObjectId.isValid(productId) 
        ? new mongoose.Types.ObjectId(productId)
        : productId;
      
      // Remove specific item
      cart.items = cart.items.filter(
        (item: any) => item.productId.toString() !== productObjectId.toString()
      );
    } else if (action === 'clear') {
      // Clear cart
      cart.items = [];
    } else {
      return NextResponse.json(
        { error: 'Invalid action or missing parameters' },
        { status: 400 }
      );
    }

    await cart.save();

    return NextResponse.json({
      message: 'Cart updated',
      cart: cart.items,
    });
  } catch (error: any) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Clear cart
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate user
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let auth;
    try {
      auth = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const cart = await Cart.findOne({ userId: auth.userId });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    return NextResponse.json({ message: 'Cart cleared', cart: [] });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

