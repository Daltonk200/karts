"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  TextField,
  Pagination,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SlideableDeleteModal from "@/components/ui/SlideableDeleteModal";
import SlideableDrawer from "@/components/ui/SlideableDrawer";
import EnhancedProductForm from "@/components/admin/EnhancedProductForm";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  brand: string;
  category: string;
  skinType: string;
  stock: number;
  isFeatured: boolean;
  isOnSale: boolean;
  image: string;
  sku: string;
  rating: number;
  reviews: number;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    productId: string | null;
    productName: string;
  }>({
    isOpen: false,
    productId: null,
    productName: "",
  });

  const itemsPerPage = 10;

  const categories = [
    "All",
    "Racing Karts",
    "Recreational Karts",
    "Electric Karts",
    "Racing Gear",
    "Safety Equipment",
    "Parts & Accessories",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndPaginateProducts();
  }, [allProducts, currentPage, searchQuery, selectedCategory, sortBy]);

  const filterAndPaginateProducts = () => {
    let filtered = [...allProducts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) => {
          const categoryName = typeof product.category === 'string' 
            ? product.category 
            : product.category?.name || '';
          return (
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.sku.toLowerCase().includes(query) ||
            categoryName.toLowerCase().includes(query)
          );
        }
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => {
          const categoryName = typeof product.category === 'string' 
            ? product.category 
            : product.category?.name || '';
          return categoryName === selectedCategory;
        }
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        case "stock":
          return a.stock - b.stock;
        case "rating":
          return b.rating - a.rating;
        case "createdAt":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    // Calculate pagination
    const total = filtered.length;
    const pages = Math.ceil(total / itemsPerPage);
    setTotalPages(pages);

    // Get products for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);

    setProducts(paginated);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("dashboard_token") || localStorage.getItem("auth_token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch("/api/products?limit=1000", { headers });
      const data = await response.json();
      
      if (response.ok) {
        // Transform products to match Product interface
        const products = (data.products || []).map((p: any) => ({
          _id: p._id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          brand: p.brand,
          category: typeof p.category === 'object' ? p.category.name : p.category,
          skinType: p.productType || "",
          stock: p.stock,
          isFeatured: p.isFeatured,
          isOnSale: p.isOnSale,
          image: p.images?.[0] || p.image || "",
          sku: p.sku,
          rating: p.rating,
          reviews: p.reviews,
          createdAt: p.createdAt,
        }));
        setAllProducts(products);
      } else {
        setAllProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (productId: string, productName: string) => {
    setDeleteModal({
      isOpen: true,
      productId,
      productName,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.productId) return;

    try {
      setDeletingId(deleteModal.productId);
      const token = localStorage.getItem("dashboard_token") || localStorage.getItem("auth_token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`/api/products/${deleteModal.productId}`, {
        method: "DELETE",
        headers,
      });

      if (response.ok) {
        toast.success("Product deleted successfully");
        setDeleteModal({ isOpen: false, productId: null, productName: "" });
        fetchProducts(); // Refresh the list
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, productId: null, productName: "" });
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your karts inventory</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowAddProductModal(true)}
              className="inline-flex items-center px-4 py-2 bg-white text-red-600 border-2 border-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Product
            </button>
          </div>
        </div>

        {/* Filters */}
        <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 1, border: "1px solid #e5e7eb" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by name, brand, or SKU..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full !shadow-none py-5">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full py-5 !shadow-none">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Date Created</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSortBy("createdAt");
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </Box>

        {/* Products Table */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : products.length > 0 ? (
          <>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: 1,
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                overflow: "hidden",
              }}
            >
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f9fafb" }}>
                    <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Brand</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow
                      key={product._id}
                      sx={{
                        "&:hover": { bgcolor: "#f9fafb" },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            position: "relative",
                            borderRadius: 1,
                            overflow: "hidden",
                            bgcolor: "#f3f4f6",
                          }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="60px"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {product.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {product.brand}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={typeof product.category === 'string' ? product.category : product.category?.name || 'N/A'}
                          size="small"
                          sx={{
                            bgcolor: "#ffffff",
                            color: "#dc2626",
                            fontSize: "0.75rem",
                            border: "1px solid #dc2626",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#dc2626" }}
                          >
                            ${product.price.toLocaleString()}
                          </Typography>
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  textDecoration: "line-through",
                                  display: "block",
                                }}
                              >
                                ${product.originalPrice.toLocaleString()}
                              </Typography>
                            )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={product.stock}
                          size="small"
                          sx={{
                            bgcolor:
                              product.stock <= 5
                                ? "#fee2e2"
                                : "#dcfce7",
                            color:
                              product.stock <= 5
                                ? "#991b1b"
                                : "#166534",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
                        >
                          {product.sku}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <StarIcon
                            sx={{ fontSize: 16, color: "#fbbf24" }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {product.rating}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            ({product.reviews})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                          {product.isFeatured && (
                            <Chip
                              label="Featured"
                              size="small"
                              sx={{
                                bgcolor: "#ffffff",
                                color: "#dc2626",
                                fontSize: "0.7rem",
                                height: 20,
                                border: "1px solid #dc2626",
                              }}
                            />
                          )}
                          {product.isOnSale && (
                            <Chip
                              label="On Sale"
                              size="small"
                              sx={{
                                bgcolor: "#ffffff",
                                color: "#16a34a",
                                fontSize: "0.7rem",
                                height: 20,
                                border: "1px solid #16a34a",
                              }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                          <Tooltip title={product.isFeatured ? "Remove from featured" : "Add to featured"}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                toggleFeatured(product._id, product.isFeatured)
                              }
                              sx={{
                                color: product.isFeatured ? "#dc2626" : "#9ca3af",
                                "&:hover": {
                                  color: "#dc2626",
                                  bgcolor: "#fee2e2",
                                },
                              }}
                            >
                              {product.isFeatured ? (
                                <StarIcon fontSize="small" />
                              ) : (
                                <StarBorderIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit product">
                            <IconButton
                              size="small"
                              onClick={async () => {
                                // Fetch full product data
                                try {
                                  const token = localStorage.getItem("dashboard_token") || localStorage.getItem("auth_token");
                                  const response = await fetch(`/api/products/${product._id}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  });
                                  if (response.ok) {
                                    const data = await response.json();
                                    setEditingProduct(data.product);
                                    setShowEditProductModal(true);
                                  } else {
                                    toast.error("Failed to load product");
                                  }
                                } catch (error) {
                                  toast.error("Error loading product");
                                }
                              }}
                              sx={{
                                color: "#6b7280",
                                "&:hover": {
                                  color: "#2563eb",
                                  bgcolor: "#eff6ff",
                                },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete product">
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDeleteClick(product._id, product.name)
                              }
                              disabled={deletingId === product._id}
                              sx={{
                                color: "#6b7280",
                                "&:hover": {
                                  color: "#dc2626",
                                  bgcolor: "#fee2e2",
                                },
                                "&.Mui-disabled": {
                                  opacity: 0.5,
                                },
                              }}
                            >
                              {deletingId === product._id ? (
                                <CircularProgress size={16} />
                              ) : (
                                <DeleteIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      "&.Mui-selected": {
                        bgcolor: "#dc2626",
                        color: "white",
                        "&:hover": {
                          bgcolor: "#b91c1c",
                        },
                      },
                    },
                  }}
                />
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
              No products found
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              {searchQuery || selectedCategory !== "All"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating a new product."}
            </Typography>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="inline-flex items-center px-4 py-2 bg-white text-red-600 border-2 border-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Product
            </button>
          </Box>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <SlideableDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        itemName={deleteModal.productName}
        isLoading={deletingId === deleteModal.productId}
      />

      {/* Add Product Modal */}
      <SlideableDrawer
        open={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        title="Add New Product"
        width="700px"
      >
        <EnhancedProductForm
          onSuccess={() => {
            setShowAddProductModal(false);
            fetchProducts();
          }}
          onCancel={() => setShowAddProductModal(false)}
        />
      </SlideableDrawer>

      {/* Edit Product Modal */}
      <SlideableDrawer
        open={showEditProductModal}
        onClose={() => {
          setShowEditProductModal(false);
          setEditingProduct(null);
        }}
        title="Edit Product"
        width="700px"
      >
        <EnhancedProductForm
          product={editingProduct}
          onSuccess={() => {
            setShowEditProductModal(false);
            setEditingProduct(null);
            fetchProducts();
          }}
          onCancel={() => {
            setShowEditProductModal(false);
            setEditingProduct(null);
          }}
        />
      </SlideableDrawer>
    </DashboardLayout>
  );
}
