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
import { Product, mockProducts } from "@/data/mockProducts";
import ProductRating from "@/components/karts/ProductRating";
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";

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

  // Fetch product and related products from mock data
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Find product in mock data
      const foundProduct = mockProducts.find((p) => p._id === productId);

      if (foundProduct) {
        setProduct(foundProduct);

        // Find related products (same category, exclude current)
        const related = mockProducts
          .filter(
            (p) => p.category === foundProduct.category && p._id !== productId
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    }, 500);
  }, [productId]);

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
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        skinType: product.kartType,
        size: product.sku,
        isFeatured: product.isFeatured,
      });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        kartType: product.kartType,
        stock: product.stock,
        model: product.sku,
      });
    }
    toast.success(`${product.name} added to cart`);
  };

  const images = product.images || [product.image];
  const isOnSale = product.isOnSale && product.originalPrice;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        {/* Breadcrumb */}
        <nav className="py-4 text-sm text-gray-600 font-outfit">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-red-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-red-600">
                Products
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/products?category=${product.category}`} className="hover:text-red-600">
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-6">
            {/* Image Gallery */}
            <div className="space-y-3 max-w-full lg:max-w-md mx-auto lg:mx-0">
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square max-w-full">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {isOnSale && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium font-outfit">
                    Sale
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative bg-gray-100 rounded-lg overflow-hidden border-2 transition-all aspect-square ${
                        selectedImage === index
                          ? "border-red-600"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-red-600 uppercase tracking-wide font-medium font-outfit">
                    {product.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600 font-outfit">
                    {product.brand}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-caveat">
                  {product.name}
                </h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-3 mb-4">
                    {renderStars(product.rating)}
                    <span className="text-sm font-medium text-gray-700 font-outfit">
                      {product.rating.toFixed(1)}
                    </span>
                    {product.reviews && (
                      <span className="text-sm text-gray-500 font-outfit">
                        ({product.reviews} reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-red-600 font-caveat">
                    ${product.price.toLocaleString()}
                  </span>
                  {isOnSale && product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through font-outfit">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-red-600 font-medium font-outfit">
                        Save ${(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-outfit">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed font-outfit">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 font-outfit">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-2">
                        <span className="text-sm font-medium text-gray-700 font-outfit">
                          {key}:
                        </span>
                        <span className="text-sm text-gray-600 ml-2 font-outfit">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center text-sm text-green-600 font-medium font-outfit">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="inline-flex items-center text-sm text-red-600 font-medium font-outfit">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700 font-outfit">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-outfit"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 font-medium font-outfit">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-outfit"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isInCart(product._id)}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-outfit"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  {isInCart(product._id) ? "In Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 font-outfit ${
                    isInWishlist(product._id)
                      ? "bg-red-100 text-red-600 border-2 border-red-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300"
                  }`}
                >
                  <FaHeart
                    className={`w-5 h-5 ${
                      isInWishlist(product._id) ? "fill-current" : ""
                    }`}
                  />
                  Wishlist
                </button>
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600 font-outfit">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>SKU: {product.sku}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Ratings & Reviews */}
        {product.rating && (
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 mb-8">
            <ProductRating
              productId={product._id}
              currentRating={product.rating}
              reviewCount={product.reviews || 0}
            />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-caveat">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/products/${relatedProduct._id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors font-outfit">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-600 font-caveat">
                        ${relatedProduct.price.toLocaleString()}
                      </span>
                      {relatedProduct.rating && (
                        <div className="flex items-center gap-1">
                          <FaStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-600 font-outfit">
                            {relatedProduct.rating.toFixed(1)}
                          </span>
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
