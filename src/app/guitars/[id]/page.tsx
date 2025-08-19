"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore, Guitar } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import Testimonials from "@/components/Testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "@/components/Loader";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  condition: string;
  rating?: number;
  reviews?: number;
  isFeatured: boolean;
  isOnSale?: boolean;
  stock: number;
  sku: string;
  description: string;
  model: string;
  color?: string;
  body?: string;
  neck?: string;
  fretboard?: string;
  pickups?: string;
  bridge?: string;
}

const getSpecifications = (guitar: Product) => {
  const specs = [
    { label: "Brand", value: guitar.brand },
    { label: "Model", value: guitar.model },
    { label: "Category", value: guitar.category },
    { label: "Condition", value: guitar.condition },
    { label: "SKU", value: guitar.sku },
  ];

  // Add guitar-specific specifications if they exist
  if (guitar.color) specs.push({ label: "Color", value: guitar.color });
  if (guitar.body) specs.push({ label: "Body Type", value: guitar.body });
  if (guitar.neck) specs.push({ label: "Neck Type", value: guitar.neck });
  if (guitar.fretboard)
    specs.push({ label: "Fretboard", value: guitar.fretboard });
  if (guitar.pickups) specs.push({ label: "Pickups", value: guitar.pickups });
  if (guitar.bridge) specs.push({ label: "Bridge Type", value: guitar.bridge });

  return specs;
};

export default function GuitarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const guitarId = params.id as string;
  const [selectedImage, setSelectedImage] = useState(0);
  const [guitar, setGuitar] = useState<Product | null>(null);
  const [relatedGuitars, setRelatedGuitars] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { addToCart, removeFromCart, isInCart } = useCartStore();

  // Fetch guitar data
  useEffect(() => {
    const fetchGuitar = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${guitarId}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Guitar not found");
          } else {
            setError("Failed to load guitar");
          }
          return;
        }

        const data = await response.json();
        setGuitar(data);

        // Fetch related guitars
        const relatedResponse = await fetch(
          `/api/products?category=${data.category}&brand=${data.brand}&limit=8`
        );

        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          // Filter out the current guitar and limit to 8
          const filtered = relatedData.products
            .filter((g: Product) => g._id !== data._id)
            .slice(0, 8);
          setRelatedGuitars(filtered);
        }
      } catch (error) {
        console.error("Error fetching guitar:", error);
        setError("Failed to load guitar");
      } finally {
        setLoading(false);
      }
    };

    if (guitarId) {
      fetchGuitar();
    }
  }, [guitarId]);

  if (loading) {
    return (
      <Container className="py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      </Container>
    );
  }

  if (error || !guitar) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">🎸</div>
          <h1 className="text-2xl font-semibold text-zinc-900 mb-4">
            Guitar Not Found
          </h1>
          <p className="text-zinc-600 mb-6">
            {error || "The guitar you're looking for doesn't exist."}
          </p>
          <Link
            href="/guitars"
            className="inline-block px-6 py-3 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200"
          >
            Browse All Guitars
          </Link>
        </div>
      </Container>
    );
  }

  const specifications = getSpecifications(guitar);

  const handleWishlistToggle = () => {
    // Convert Product to Guitar format for wishlist
    const guitarForWishlist: Guitar = {
      id: guitar._id,
      name: guitar.name,
      price: guitar.price,
      originalPrice: guitar.originalPrice || guitar.price,
      image: guitar.image,
      category: guitar.category,
      brand: guitar.brand,
      condition: guitar.condition,
      rating: guitar.rating || 4.5,
      reviews: guitar.reviews || 0,
      isFeatured: guitar.isFeatured,
      isOnSale: guitar.isOnSale || false,
    };

    if (isInWishlist(guitar._id)) {
      removeFromWishlist(guitar._id);
      toast.success(`${guitar.name} removed from wishlist`);
    } else {
      addToWishlist(guitarForWishlist);
      toast.success(`${guitar.name} added to wishlist`);
    }
  };

  const handlePurchase = () => {
    router.push(`/purchase/${guitar._id}`);
  };

  const handleAddToCart = () => {
    if (!guitar) return;

    if (isInCart(guitar._id)) {
      // Remove from cart
      removeFromCart(guitar._id);
      toast.success(`${guitar.name} removed from cart`);
    } else {
      // Add to cart
      const cartItem = {
        id: guitar._id,
        name: guitar.name,
        price: guitar.price,
        image: guitar.image,
        category: guitar.category,
        brand: guitar.brand,
        condition: guitar.condition,
        stock: guitar.stock,
        model: guitar.model,
      };

      addToCart(cartItem);
      toast.success(`${guitar.name} added to cart`);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-4 border-b border-zinc-200">
        <Container>
          <nav className="flex items-center space-x-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/guitars"
              className="hover:text-zinc-900 transition-colors"
            >
              Guitars
            </Link>
            <span>/</span>
            <span className="text-zinc-900">{guitar.name}</span>
          </nav>
        </Container>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-zinc-100 relative overflow-hidden mb-4">
                <Image
                  src={guitar.images[selectedImage]}
                  alt={guitar.name}
                  fill
                  className="object-cover"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {guitar.isOnSale && (
                    <span className="px-3 py-1 text-center bg-red-600 text-white text-sm font-medium uppercase tracking-wide">
                      Sale
                    </span>
                  )}
                  {guitar.isFeatured && (
                    <span className="px-3 py-1 text-center bg-zinc-900 text-white text-sm font-medium uppercase tracking-wide">
                      Featured
                    </span>
                  )}
                  <span className="px-3 py-1 text-center bg-white text-zinc-900 text-sm font-medium uppercase tracking-wide border border-zinc-200">
                    {guitar.condition}
                  </span>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {guitar.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-zinc-100 relative overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-zinc-900"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${guitar.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="text-sm text-zinc-500 uppercase tracking-wide mb-2">
                  {guitar.brand} • {guitar.category}
                </div>
                <h1 className="text-3xl font-bold text-zinc-900 mb-4">
                  {guitar.name}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-zinc-900">
                    ${guitar.price.toLocaleString()}
                  </span>
                  {guitar.isOnSale && (
                    <span className="text-xl text-zinc-500 line-through">
                      ${guitar.originalPrice?.toLocaleString()}
                    </span>
                  )}
                  {guitar.isOnSale && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium">
                      Save $
                      {(
                        guitar.originalPrice || guitar.price - guitar.price
                      ).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-green-700">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">In Stock</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  {guitar.description}
                </p>
              </div>

              {/* Purchase Actions */}
              <div className="space-y-4 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handlePurchase}
                    className="flex-1 px-6 py-3 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200"
                  >
                    Purchase
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 px-6 py-3 border font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                      isInCart(guitar._id)
                        ? "border-green-300 text-green-700 bg-green-50 hover:bg-green-100"
                        : "border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
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
                    {isInCart(guitar._id) ? "In Cart" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleWishlistToggle}
                    className={`px-6 py-3 border font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                      isInWishlist(guitar._id)
                        ? "border-red-300 text-red-700 bg-red-50 hover:bg-red-100"
                        : "border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isInWishlist(guitar._id) ? "fill-current" : "fill-none"
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
                    {isInWishlist(guitar._id)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-zinc-200 pt-6">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2 text-zinc-600">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Premium tonewoods for exceptional sound
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Professional setup and intonation
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Includes hardshell case
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    2-year warranty included
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Specifications */}
      <section className="py-12 bg-zinc-50">
        <Container>
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">
            Specifications
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white p-6 border border-zinc-200">
              <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                Technical Specs
              </h3>
              <dl className="space-y-3">
                {specifications.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-zinc-100"
                  >
                    <dt className="text-zinc-600">{item.label}</dt>
                    <dd className="text-zinc-900 font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Custom Guitar Alert */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              Want Something Different?
            </h2>
            <p className="text-lg text-amber-800 mb-6">
              If this guitar isn't quite what you're looking for, our master
              luthiers can create a custom instrument tailored to your exact
              specifications and preferences.
            </p>
            <Link
              href="/custom-guitar"
              className="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200"
            >
              Start Your Custom Build
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      <Testimonials />

      {/* Related Products */}
      {relatedGuitars.length > 0 && (
        <section className="py-12 bg-zinc-50">
          <Container>
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">
              Related Guitars
            </h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={2}
              navigation={true}
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="related-guitars-swiper"
            >
              {relatedGuitars.map((relatedGuitar) => (
                <SwiperSlide key={relatedGuitar._id}>
                  <div className="bg-white border border-zinc-200 hover:border-zinc-300 transition-colors duration-200 flex flex-col group h-full">
                    <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                      <Image
                        src={relatedGuitar.image}
                        alt={relatedGuitar.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {relatedGuitar.isOnSale && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-medium uppercase tracking-wide">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="text-sm text-zinc-500 uppercase tracking-wide mb-1">
                        {relatedGuitar.brand}
                      </div>
                      <h3 className="font-semibold text-zinc-900 mb-2 line-clamp-2">
                        {relatedGuitar.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(relatedGuitar.rating || 0)
                                  ? "text-yellow-400"
                                  : "text-zinc-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-zinc-600">
                          ({relatedGuitar.reviews || 0})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-zinc-900">
                          ${relatedGuitar.price.toLocaleString()}
                        </span>
                        {relatedGuitar.isOnSale && (
                          <span className="text-sm text-zinc-500 line-through">
                            ${relatedGuitar.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/guitars/${relatedGuitar._id}`}
                        className="mt-auto text-center px-4 py-2 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </section>
      )}

      <style jsx global>{`
        .related-guitars-swiper {
          padding-bottom: 60px;
        }

        .related-guitars-swiper .swiper-slide {
          height: auto;
        }

        .related-guitars-swiper .swiper-button-next,
        .related-guitars-swiper .swiper-button-prev {
          width: 48px;
          height: 48px;
          background: white;
          border: 1px solid #d4d4d8;
          border-radius: 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .related-guitars-swiper .swiper-button-next:hover,
        .related-guitars-swiper .swiper-button-prev:hover {
          background: #fafafa;
          border-color: #a1a1aa;
          transform: scale(1.05);
        }

        .related-guitars-swiper .swiper-button-next::after,
        .related-guitars-swiper .swiper-button-prev::after {
          font-size: 18px;
          color: #52525b;
          font-weight: bold;
        }

        .related-guitars-swiper .swiper-pagination {
          bottom: 0;
        }

        .related-guitars-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d4d4d8;
          opacity: 1;
          transition: all 0.2s ease;
        }

        .related-guitars-swiper .swiper-pagination-bullet-active {
          background: #52525b;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .related-guitars-swiper .swiper-button-next,
          .related-guitars-swiper .swiper-button-prev {
            display: flex !important;
            width: 40px;
            height: 40px;
          }

          .related-guitars-swiper .swiper-button-next::after,
          .related-guitars-swiper .swiper-button-prev::after {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}
