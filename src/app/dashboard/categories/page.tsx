"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { toast } from "react-hot-toast";
import { Category, ProductType } from "@/types/product";
import { PRODUCT_TYPES } from "@/config/productTypes";
import SlideableDrawer from "@/components/ui/SlideableDrawer";
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
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import SlideableDeleteModal from "@/components/ui/SlideableDeleteModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductType, setSelectedProductType] = useState<ProductType>('go-karts');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    categoryId: string | null;
    categoryName: string;
  }>({
    isOpen: false,
    categoryId: null,
    categoryName: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [categories, selectedProductType]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("dashboard_token") || localStorage.getItem("auth_token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch("/api/categories", { headers });
      const data = await response.json();

      if (response.ok) {
        // Transform categories to match Category interface
        const transformedCategories = (data.categories || []).map((cat: any) => ({
          id: cat._id,
          name: cat.name,
          productType: cat.productType || "all",
          slug: cat.slug,
          description: cat.description || "",
          isActive: true,
          createdAt: cat.createdAt,
          updatedAt: cat.updatedAt,
        }));
        setCategories(transformedCategories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = () => {
    const filtered = categories.filter(
      (cat) => cat.productType === selectedProductType
    );
    setFilteredCategories(filtered);
  };

  const handleDeleteClick = (categoryId: string, categoryName: string) => {
    setDeleteModal({
      isOpen: true,
      categoryId,
      categoryName,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.categoryId) return;

    try {
      const token = localStorage.getItem("dashboard_token") || localStorage.getItem("auth_token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`/api/categories/${deleteModal.categoryId}`, {
        method: "DELETE",
        headers,
      });

      if (response.ok) {
        setCategories(prevCategories =>
          prevCategories.filter(cat => cat.id !== deleteModal.categoryId)
        );
        toast.success("Category deleted successfully");
        setDeleteModal({ isOpen: false, categoryId: null, categoryName: "" });
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setShowAddModal(true);
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    setEditingCategory(null);
    fetchCategories();
  };

  const productTypeConfig = PRODUCT_TYPES.find(
    (type) => type.id === selectedProductType
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600">Manage your product categories</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowAddModal(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-white text-red-600 border-2 border-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <AddIcon className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </div>
        </div>

        {/* Product Type Filter */}
        <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 1, border: "1px solid #e5e7eb" }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Filter by Product Type
          </Typography>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedProductType(type.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedProductType === type.id
                    ? 'bg-white text-red-600 border-2 border-red-600'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300'
                }`}
              >
                <span className="mr-2">{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>
        </Box>

        {/* Categories Table */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredCategories.length > 0 ? (
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
                  <TableCell sx={{ fontWeight: 600 }}>Category Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Product Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Slug</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{
                      "&:hover": { bgcolor: "#f9fafb" },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {category.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          PRODUCT_TYPES.find((t) => t.id === category.productType)
                            ?.name
                        }
                        size="small"
                        icon={
                          <span>
                            {
                              PRODUCT_TYPES.find((t) => t.id === category.productType)
                                ?.icon
                            }
                          </span>
                        }
                        sx={{
                          bgcolor: "#ffffff",
                          color: "#dc2626",
                          fontSize: "0.75rem",
                          border: "1px solid #dc2626",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: "monospace", fontSize: "0.75rem", color: "text.secondary" }}
                      >
                        {category.slug}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {category.description || "-"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={category.isActive ? "Active" : "Inactive"}
                        size="small"
                        sx={{
                          bgcolor: category.isActive ? "#ffffff" : "#f3f4f6",
                          color: category.isActive ? "#16a34a" : "#6b7280",
                          fontSize: "0.7rem",
                          height: 20,
                          border: category.isActive ? "1px solid #16a34a" : "1px solid #d1d5db",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <Tooltip title="Edit category">
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(category)}
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
                        <Tooltip title="Delete category">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleDeleteClick(category.id, category.name)
                            }
                            sx={{
                              color: "#6b7280",
                              "&:hover": {
                                color: "#dc2626",
                                bgcolor: "#fee2e2",
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
              No categories found
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              Get started by creating a new category for{" "}
              {productTypeConfig?.name}.
            </Typography>
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowAddModal(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-white text-red-600 border-2 border-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <AddIcon className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </Box>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <SlideableDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, categoryId: null, categoryName: "" })}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        itemName={deleteModal.categoryName}
      />

      {/* Add/Edit Category Modal */}
      <SlideableDrawer
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        width="500px"
      >
        <CategoryForm
          category={editingCategory}
          onSuccess={handleAddSuccess}
          onCancel={() => {
            setShowAddModal(false);
            setEditingCategory(null);
          }}
        />
      </SlideableDrawer>
    </DashboardLayout>
  );
}

// Category Form Component
interface CategoryFormProps {
  category: Category | null;
  onSuccess: () => void;
  onCancel: () => void;
}

function CategoryForm({ category, onSuccess, onCancel }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    productType: category?.productType || ("go-karts" as ProductType),
    description: category?.description || "",
    isActive: category?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("dashboard_token") || localStorage.getItem("auth_token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const url = category 
        ? `/api/categories/${category.id}`
        : "/api/categories";
      const method = category ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          name: formData.name,
          productType: formData.productType,
          description: formData.description,
        }),
      });

      if (response.ok) {
        toast.success(
          category ? "Category updated successfully" : "Category created successfully"
        );
        onSuccess();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="e.g., Electric Go-Karts"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Type <span className="text-red-600">*</span>
        </label>
        <select
          value={formData.productType}
          onChange={(e) =>
            setFormData({ ...formData, productType: e.target.value as ProductType })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          required
        >
          {PRODUCT_TYPES.map((type) => (
            <option key={type.id} value={type.id}>
              {type.icon} {type.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
          placeholder="Brief description of this category"
          rows={3}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
        />
        <label className="ml-2 text-sm text-gray-700">
          Active (visible to customers)
        </label>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-white text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {loading ? "Saving..." : category ? "Update Category" : "Create Category"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

