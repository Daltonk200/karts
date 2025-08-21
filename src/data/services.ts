export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  features: string[];
  benefits: string[];
}

export const services: Service[] = [
  {
    id: "facial-treatments",
    title: "Facial Treatments",
    description:
      "Professional facial treatments tailored to your skin type and concerns",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    price: "25,000 - 45,000 XAF",
    duration: "60-90 minutes",
    features: [
      "Deep cleansing and exfoliation",
      "Customized mask application",
      "Moisturizing and hydration",
      "Anti-aging treatments",
      "Acne and blemish control",
      "Skin brightening treatments",
    ],
    benefits: [
      "Improves skin texture and tone",
      "Reduces fine lines and wrinkles",
      "Unclogs pores and prevents breakouts",
      "Boosts collagen production",
      "Enhances skin radiance",
    ],
  },
  {
    id: "makeup-services",
    title: "Makeup Services",
    description:
      "Professional makeup application for special occasions and everyday glamour",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
    price: "15,000 - 35,000 XAF",
    duration: "45-90 minutes",
    features: [
      "Bridal makeup",
      "Party and event makeup",
      "Natural everyday makeup",
      "Contouring and highlighting",
      "False lash application",
      "Makeup lessons available",
    ],
    benefits: [
      "Professional finish for special occasions",
      "Long-lasting makeup application",
      "Customized to your style and preferences",
      "High-quality products used",
      "Expert techniques and tips",
    ],
  },
  {
    id: "skincare-consultation",
    title: "Skincare Consultation",
    description: "Personalized skincare advice and product recommendations",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    price: "10,000 - 20,000 XAF",
    duration: "30-45 minutes",
    features: [
      "Skin analysis and assessment",
      "Personalized skincare routine",
      "Product recommendations",
      "Lifestyle and diet advice",
      "Follow-up consultations",
      "Home care instructions",
    ],
    benefits: [
      "Understand your skin type and concerns",
      "Get personalized product recommendations",
      "Learn proper skincare techniques",
      "Address specific skin issues",
      "Long-term skin health improvement",
    ],
  },
  {
    id: "body-treatments",
    title: "Body Treatments",
    description:
      "Relaxing and rejuvenating body treatments for total wellness",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
    price: "30,000 - 60,000 XAF",
    duration: "90-120 minutes",
    features: [
      "Body scrubs and exfoliation",
      "Moisturizing body wraps",
      "Cellulite reduction treatments",
      "Anti-aging body treatments",
      "Relaxation massages",
      "Detoxifying treatments",
    ],
    benefits: [
      "Improves skin texture and firmness",
      "Reduces cellulite appearance",
      "Promotes relaxation and stress relief",
      "Enhances skin hydration",
      "Boosts circulation and detoxification",
    ],
  },
  {
    id: "nail-services",
    title: "Nail Services",
    description: "Professional nail care and beautiful nail art designs",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
    price: "8,000 - 25,000 XAF",
    duration: "45-90 minutes",
    features: [
      "Manicure and pedicure",
      "Gel and acrylic nails",
      "Nail art and designs",
      "Nail extensions",
      "Nail repair and maintenance",
      "Hand and foot massages",
    ],
    benefits: [
      "Professional nail care and maintenance",
      "Beautiful and long-lasting results",
      "Custom nail art designs",
      "Hand and foot relaxation",
      "Improved nail health",
    ],
  },
  {
    id: "hair-treatments",
    title: "Hair Treatments",
    description: "Nourishing hair treatments for healthy, beautiful hair",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
    price: "20,000 - 40,000 XAF",
    duration: "60-120 minutes",
    features: [
      "Hair conditioning treatments",
      "Scalp treatments and massages",
      "Hair repair and restoration",
      "Anti-dandruff treatments",
      "Hair growth stimulation",
      "Color protection treatments",
    ],
    benefits: [
      "Improves hair texture and shine",
      "Strengthens hair follicles",
      "Reduces hair loss and breakage",
      "Promotes healthy scalp",
      "Enhances hair manageability",
    ],
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServiceTitleById = (id: string): string => {
  const service = getServiceById(id);
  return service ? service.title : id;
}; 