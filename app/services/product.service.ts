import axiosInstance from "@/app/utils/axiosInstance";

/**
 * Product Service
 * Backend Base Route: /product
 */
export const ProductService = {
  /**
   * Create product (ADMIN)
   */
  create: async (payload: {
    title: string;
    description?: string;
    price: number;
    sku?: string;
    stock?: number;
    images: string[];
    categoryId?: string;
  }) => {
    const res = await axiosInstance.post("/product/create", payload);
    return res.data;
  },

  /**
   * Get all products (Public)
   */
  getAll: async () => {
    const res = await axiosInstance.get("/product");
    return res.data.data;
  },

  /**
   * Get single product by ID (Public)
   */
  getById: async (id: string) => {
    const res = await axiosInstance.get(`/product/${id}`);
    return res.data.data;
  },

  /**
   * Update product (ADMIN)
   */
  update: async (
    id: string,
    payload: Partial<{
      title: string;
      description: string;
      price: number;
      stock: number;
      images: string[];
      categoryId: string;
    }>
  ) => {
    const res = await axiosInstance.patch(`/product/${id}`, payload);
    return res.data;
  },

  /**
   * Delete product (ADMIN)
   */
  delete: async (id: string) => {
    const res = await axiosInstance.delete(`/product/${id}`);
    return res.data;
  },
};
