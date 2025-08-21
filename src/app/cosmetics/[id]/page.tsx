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
import { mockProducts, Product } from "@/data/mockProducts";

export default function CosmeticsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { addToCart, removeFromCart, isInCart } = useCartStore();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));

        const foundProduct = mockProducts.find((p) => p._id === productId);

        if (!foundProduct) {
          setError("Product not found");
          return;
        }

        setProduct(foundProduct);
      } catch (error) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💄</div>
          <h1 className="text-2xl font-semibold text-zinc-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-zinc-600 mb-6">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <Link
            href="/cosmetics"
            className="inline-block px-6 py-3 bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors duration-200 rounded-lg"
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
        skinType: product.skinType,
        size: product.sku,
        isFeatured: product.isFeatured,
      });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCart = () => {
    if (isInCart(product._id)) {
      removeFromCart(product._id);
      toast.success(`${product.name} removed from cart`);
    } else {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        condition: product.skinType,
        stock: product.stock,
        model: product.sku,
      };
      addToCart(cartItem);
      toast.success(`${product.name} added to cart`);
    }
  };

  // Create multiple images for the product (using the same image for demo)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  // Get related products
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-zinc-500">
            <li>
              <Link href="/" className="hover:text-rose-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/cosmetics"
                className="hover:text-rose-600 transition-colors"
              >
                Cosmetics
              </Link>
            </li>
            <li>/</li>
            <li className="text-zinc-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image Section */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-zinc-50 rounded-2xl overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={productImages[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Skin Type Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-rose-700 text-xs font-medium rounded-full shadow-sm">
                    {product.skinType}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all cursor-pointer duration-200"
                >
                  <svg
                    className={`w-5 h-5 transition-colors ${
                      isInWishlist(product._id)
                        ? "text-rose-500 fill-current"
                        : "text-zinc-400 fill-white"
                    }`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Image Selection */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-zinc-50 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-rose-500 shadow-md"
                        : "border-zinc-200 hover:border-rose-300"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            {/* Category & Brand */}
            <div className="space-y-2">
              <div className="text-sm text-rose-600 font-medium uppercase tracking-wide">
                {product.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-zinc-600">
                by{" "}
                <span className="font-semibold text-zinc-900">
                  {product.brand}
                </span>
              </p>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating!)
                          ? "text-yellow-400"
                          : "text-zinc-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-zinc-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="text-3xl font-bold text-zinc-900">
              XAF {product.price.toLocaleString()}
            </div>

            {/* Description */}
            <div className="text-zinc-600 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="bg-zinc-50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-zinc-900">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-zinc-500">Brand:</span>
                  <span className="ml-2 font-medium text-zinc-900">
                    {product.brand}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Category:</span>
                  <span className="ml-2 font-medium text-zinc-900">
                    {product.category}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Skin Type:</span>
                  <span className="ml-2 font-medium text-zinc-900">
                    {product.skinType}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Stock:</span>
                  <span className="ml-2 font-medium text-zinc-900">
                    {product.stock} units
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons - Following ProductCard structure */}
            <div className="space-y-4">
              {/* Remove from Cart Link - only show when in cart */}
              {isInCart(product._id) && (
                <div className="mb-2">
                  <button
                    onClick={() => {
                      removeFromCart(product._id);
                      toast.success(`${product.name} removed from cart`);
                    }}
                    className="text-left text-sm text-rose-600 hover:text-rose-700 font-medium hover:underline decoration-rose-300 hover:decoration-rose-500 transition-all cursor-pointer duration-200 font-outfit"
                  >
                    Remove from Cart
                  </button>
                </div>
              )}

              {/* Add to Cart Button */}
              {isInCart(product._id) ? (
                <button
                  disabled
                  className="w-full text-center px-4 py-3 bg-rose-300 cursor-not-allowed text-white font-medium text-sm rounded-[5px] font-outfit flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  In Cart
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full text-center px-4 py-3 bg-rose-600 text-white font-medium cursor-pointer hover:bg-rose-700 transition-all duration-300 text-sm rounded-[5px] font-outfit transform hover:scale-[1.02]"
                >
                  Add to Cart
                </button>
              )}

              {/* Secondary Buttons Row */}
              <div className="flex gap-3">
                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className={`flex-1 inline-flex items-center justify-center px-4 py-3 border text-sm rounded-[5px] font-outfit transition-all duration-300 ${
                    isInWishlist(product._id)
                      ? "border-rose-300 text-rose-600 bg-rose-50 shadow-sm"
                      : "border-zinc-300 text-zinc-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 hover:scale-[1.02]"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-2 transition-all duration-300"
                    fill={isInWishlist(product._id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {isInWishlist(product._id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={() => router.push(`/purchase/${product._id}`)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-teal-600 text-white font-medium hover:bg-teal-700 transition-all duration-300 text-sm rounded-[5px] font-outfit gap-2 hover:scale-[1.02]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Slider */}
        {relatedProducts.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">
              You might also like
            </h2>
            <div className="flex overflow-x-scroll snap-x snap-proximity gap-4 pb-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/cosmetics/${relatedProduct._id}`}
                  className="group snap-start flex-shrink-0"
                >
                  <div className="bg-white border border-zinc-200 hover:border-rose-300 transition-all duration-300 flex flex-col rounded-[5px] shadow-sm hover:shadow-lg transform hover:-translate-y-1 w-[280px] sm:w-[320px]">
                    {/* Image Container */}
                    <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden group rounded-t-[5px]">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1.5 bg-rose-600 text-white text-xs font-medium uppercase tracking-wide rounded-full shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                          {relatedProduct.skinType}
                        </span>
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="text-sm text-rose-600 uppercase tracking-wide mb-2 font-outfit font-medium">
                        {relatedProduct.category}
                      </div>
                      <h3 className="text-base font-semibold text-zinc-900 mb-2 line-clamp-2 group-hover:text-rose-700 transition-colors duration-300">
                        {relatedProduct.name}
                      </h3>
                      <div className="text-lg font-bold text-zinc-900 mt-auto">
                        XAF {relatedProduct.price.toFixed(0).toLocaleString()}
                      </div>
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
