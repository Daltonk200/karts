"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import ProductRating from "@/components/karts/ProductRating";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { GrStar } from "react-icons/gr";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string | any;
  categoryName?: string;
  brand: string;
  description: string;
  isFeatured: boolean;
  isOnSale?: boolean;
  stock: number;
  sku: string;
  rating?: number;
  reviews?: number;
  specifications?: any;
  productType?: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { addToCart, removeFromCart, isInCart } = useCartStore();

  // Fetch product from API
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}`);
      
      if (response.ok) {
        const data = await response.json();
        const productData = data.product;
        
        // Transform category if it's an object
        if (productData.category && typeof productData.category === 'object') {
          productData.categoryName = productData.category.name;
          productData.category = productData.category.name || productData.category._id;
        }
        
        setProduct(productData);
        
        // Fetch related products (same category)
        const categoryId = typeof productData.category === 'object' 
          ? productData.category._id 
          : productData.category;
        
        if (categoryId) {
          const relatedResponse = await fetch(
            `/api/products?category=${categoryId}&limit=5`
          );
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            const related = (relatedData.products || [])
              .filter((p: Product) => p._id !== productId)
              .slice(0, 4);
            
            // Transform categories in related products
            related.forEach((p: Product) => {
              if (p.category && typeof p.category === 'object') {
                p.categoryName = p.category.name;
                p.category = p.category.name || p.category._id;
              }
            });
            
            setRelatedProducts(related);
          }
        }
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏎️</div>
          <h1 className="text-2xl font-semibold text-zinc-900 mb-4 font-caveat">
            Product Not Found
          </h1>
          <p className="text-zinc-600 mb-6 font-outfit">
            The product you're looking for doesn't exist.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 rounded-lg font-outfit"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0] || "",
        category: typeof product.category === 'string' ? product.category : product.categoryName || "",
        brand: product.brand,
        kartType: "",
        stock: product.stock,
      });
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0] || "",
      category: typeof product.category === 'string' ? product.category : product.categoryName || "",
      brand: product.brand,
      kartType: "",
      stock: product.stock,
      quantity,
    });
    toast.success("Added to cart");
  };

  const displayImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
    ? [product.image] 
    : [];

  const displayPrice = product.isOnSale && product.originalPrice
    ? product.originalPrice
    : product.price;

  // Helper function to format spec keys
  const formatSpecKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  // Helper function to format spec values with units
  const formatSpecValue = (key: string, value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (key === 'maxSpeed' && typeof value === 'number') return `${value} mph`;
    if (key === 'weightCapacity' && typeof value === 'number') return `${value} lbs`;
    if (['length', 'width', 'height'].includes(key) && typeof value === 'number') return `${value} inches`;
    if (key === 'engineType' && typeof value === 'string') return value.charAt(0).toUpperCase() + value.slice(1);
    if (key === 'scooterType' && typeof value === 'string') return value.charAt(0).toUpperCase() + value.slice(1);
    if (key === 'compatibleWith' && typeof value === 'string') return value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return value;
  };

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-600 mb-6 font-outfit">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-red-600 transition-colors">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 max-w-[600px] mx-auto lg:mx-0">
              {displayImages.length > 0 ? (
                <Image
                  src={displayImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                  No Image
                </div>
              )}
            </div>
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3 max-w-[600px] mx-auto lg:mx-0">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all bg-zinc-50 ${
                      selectedImage === index
                        ? "border-red-600 ring-2 ring-red-200"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-contain p-2"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2 font-caveat">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <GrStar
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(product.rating || 0)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-zinc-900">
                      {product.rating.toFixed(1)}
                    </span>
                    {product.reviews !== undefined && product.reviews > 0 && (
                      <span className="text-sm text-zinc-500">
                        ({product.reviews} {product.reviews === 1 ? "review" : "reviews"})
                      </span>
                    )}
                  </div>
                )}
                <span className="text-sm text-zinc-500 font-outfit">
                  SKU: {product.sku}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-red-600 font-outfit">
                ${product.price.toLocaleString()}
              </span>
              {product.isOnSale && product.originalPrice && (
                <>
                  <span className="text-xl text-zinc-400 line-through font-outfit">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full font-outfit">
                    On Sale
                  </span>
                </>
              )}
            </div>

            <p className="text-zinc-600 leading-relaxed font-outfit">
              {product.description}
            </p>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="border-t border-zinc-200 pt-6">
                <h3 className="text-lg font-semibold text-zinc-900 mb-3 font-outfit">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-zinc-200 pb-2">
                      <span className="text-sm font-medium text-zinc-700 font-outfit">
                        {formatSpecKey(key)}:
                      </span>
                      <span className="text-sm text-zinc-600 ml-2 font-outfit">
                        {formatSpecValue(key, value as string | number | boolean)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="border-t border-zinc-200 pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-zinc-700 font-outfit">
                  Quantity:
                </label>
                <div className="flex items-center border border-zinc-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-x border-zinc-300 font-outfit">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-zinc-500 font-outfit">
                  {product.stock} in stock
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-medium hover:bg-red-700 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors rounded-lg font-outfit"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`px-6 py-3 border-2 rounded-lg transition-colors font-outfit ${
                    isInWishlist(product._id)
                      ? "border-red-600 bg-red-50 text-red-600"
                      : "border-zinc-300 text-zinc-700 hover:border-red-600 hover:text-red-600"
                  }`}
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-zinc-200 pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 font-caveat">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related._id}
                  href={`/products/${related._id}`}
                  className="group block bg-white rounded-lg border border-zinc-200 hover:border-red-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square bg-zinc-50 rounded-t-lg overflow-hidden">
                    <Image
                      src={related.images?.[0] || related.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"}
                      alt={related.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-zinc-900 mb-2 font-outfit group-hover:text-red-600 transition-colors line-clamp-2 min-h-[3rem]">
                    {related.name}
                  </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-bold text-lg font-outfit">
                    ${related.price.toLocaleString()}
                  </p>
                      {related.rating && (
                        <div className="flex items-center gap-1">
                          <GrStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-zinc-600">{related.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
