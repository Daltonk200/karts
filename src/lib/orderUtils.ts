import Order from '@/models/Order';

// Generate unique order number
export async function generateOrderNumber(): Promise<string> {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  
  // Count orders created today
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const count = await Order.countDocuments({
    createdAt: { $gte: startOfDay }
  });
  
  return `ORD-${dateStr}-${String(count + 1).padStart(4, '0')}`;
}

// Generate unique invoice number
export async function generateInvoiceNumber(): Promise<string> {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  
  // Count orders created today
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const count = await Order.countDocuments({
    createdAt: { $gte: startOfDay }
  });
  
  return `INV-${dateStr}-${String(count + 1).padStart(4, '0')}`;
}

