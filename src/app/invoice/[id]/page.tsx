"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    name: string;
    description: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  notes: string;
}

export default function InvoicePage() {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        // Find the order by invoice number
        const response = await fetch(`/api/orders?invoiceNumber=${params.id}`);
        const data = await response.json();

        if (response.ok && data.orders && data.orders.length > 0) {
          const order = data.orders[0];

          const invoiceData: InvoiceData = {
            invoiceNumber: order.invoiceNumber,
            date: new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            dueDate: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            customer: {
              name: `${order.customer.firstName} ${order.customer.lastName}`,
              email: order.customer.email,
              phone: order.customer.phone,
              address: order.customer.address,
              city: order.customer.city,
              state: order.customer.state,
              zipCode: order.customer.zipCode,
              country: order.customer.country,
            },
            items: order.items.map((item: any) => ({
              name: item.name,
              description: `${item.name} - Professional Guitar`,
              quantity: item.quantity,
              price: item.price,
              total: item.price * item.quantity,
            })),
            subtotal: order.subtotal,
            tax: order.tax,
            shipping: order.shipping,
            total: order.total,
            paymentMethod: order.paymentMethod,
            notes: order.notes || "Thank you for your purchase!",
          };

          setInvoice(invoiceData);
        } else {
          console.error("Invoice not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error loading invoice:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [params.id, router]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
          <p className="mt-4 text-zinc-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-4">
            Invoice Not Found
          </h1>
          <p className="text-zinc-600 mb-6">
            The invoice you're looking for doesn't exist.
          </p>
          <Link
            href="/guitars"
            className="inline-block px-6 py-3 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200"
          >
            Browse Guitars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-zinc-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Classic Guitar Shop</h1>
              <p className="text-zinc-300 mt-1">
                Premium guitars for discerning musicians
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">INVOICE</h2>
              <p className="text-zinc-300 mt-1">#{invoice.invoiceNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Invoice Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">
              Bill To:
            </h3>
            <div className="bg-zinc-50 p-4 border border-zinc-200">
              <p className="font-semibold text-zinc-900">
                {invoice.customer.name}
              </p>
              <p className="text-zinc-600">{invoice.customer.email}</p>
              <p className="text-zinc-600">{invoice.customer.phone}</p>
              <p className="text-zinc-600">{invoice.customer.address}</p>
              <p className="text-zinc-600">
                {invoice.customer.city}, {invoice.customer.state}{" "}
                {invoice.customer.zipCode}
              </p>
              <p className="text-zinc-600">{invoice.customer.country}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">
              Invoice Details:
            </h3>
            <div className="bg-zinc-50 p-4 border border-zinc-200">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-600">Invoice Number:</span>
                <span className="font-semibold">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-zinc-600">Date:</span>
                <span>{invoice.date}</span>
              </div>
             
              <div className="flex justify-between">
                <span className="text-zinc-600">Payment Method:</span>
                <span>{invoice.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border border-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                <th className="text-left p-4 border-b border-zinc-200 font-semibold text-zinc-900">
                  Item
                </th>
                <th className="text-left p-4 border-b border-zinc-200 font-semibold text-zinc-900">
                  Description
                </th>
                <th className="text-right p-4 border-b border-zinc-200 font-semibold text-zinc-900">
                  Qty
                </th>
                <th className="text-right p-4 border-b border-zinc-200 font-semibold text-zinc-900">
                  Price
                </th>
                <th className="text-right p-4 border-b border-zinc-200 font-semibold text-zinc-900">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-zinc-200">
                  <td className="p-4 font-semibold text-zinc-900">
                    {item.name}
                  </td>
                  <td className="p-4 text-zinc-600">{item.description}</td>
                  <td className="p-4 text-right">{item.quantity}</td>
                  <td className="p-4 text-right">${item.price.toFixed(2)}</td>
                  <td className="p-4 text-right font-semibold">
                    ${item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-600">Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Tax (8%):</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Shipping:</span>
                <span>${invoice.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-zinc-200 pt-3">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Notes:</h3>
            <div className="bg-zinc-50 p-4 border border-zinc-200">
              <p className="text-zinc-700">{invoice.notes}</p>
            </div>
          </div>
        )}


        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Link
            href="/guitars"
            className="px-6 py-3 border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
          <div className="flex space-x-4">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200"
            >
              Print Invoice
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
