import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaRupeeSign,
  FaTag,
  FaImage,
  FaCheck,
} from "react-icons/fa";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("product2"); // 'product' or 'product2'

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    prize: "",
    img: "",
    category: "Mattress",
  });

  const sampleImages = [
    { name: "Astron Pro", path: "../src/image/shop/astron-mattress.png" },
    {
      name: "Dream Catcher",
      path: "../src/image/shop/Dream-Catcher-Mattress.png",
    },
    { name: "Ortho Pro", path: "../src/image/shop/Ortho-Pro.png" },
    { name: "Vintage Pro", path: "../src/image/shop/Vintage-Pro.png" },
    { name: "Dot Classic", path: "../src/image/products/dot-01.jpg" },
    { name: "Comfort Plus", path: "../src/image/products/pr-04.jpg" },
  ];

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/${activeTab}`);
      setProducts(res.data || []);
    } catch (error) {
      console.error("Error loading products:", error);
      // Fallback empty array
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [activeTab]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.prize) {
      alert("Please fill in Product Name and Price");
      return;
    }

    try {
      const newProd = {
        name: currentProduct.name,
        prize: Number(currentProduct.prize),
        img: currentProduct.img || "../src/image/shop/astron-mattress.png",
      };

      const res = await axios.post(
        `http://localhost:3000/${activeTab}`,
        newProd,
      );
      setProducts([...products, res.data]);
      setIsAddModalOpen(false);
      setCurrentProduct({
        id: "",
        name: "",
        prize: "",
        img: "",
        category: "Mattress",
      });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      // local optimistic update
      const mockId = Date.now().toString();
      const mockProd = {
        ...currentProduct,
        id: mockId,
        prize: Number(currentProduct.prize),
      };
      setProducts([...products, mockProd]);
      setIsAddModalOpen(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = {
        name: currentProduct.name,
        prize: Number(currentProduct.prize),
        img: currentProduct.img,
      };

      await axios.put(
        `http://localhost:3000/${activeTab}/${currentProduct.id}`,
        updated,
      );
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id ? { ...p, ...updated } : p,
        ),
      );
      setIsEditModalOpen(false);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      // local fallback update
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id
            ? {
                ...p,
                name: currentProduct.name,
                prize: Number(currentProduct.prize),
                img: currentProduct.img,
              }
            : p,
        ),
      );
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/${activeTab}/${id}`);
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        setProducts(products.filter((p) => p.id !== id));
      }
    }
  };

  const openEditModal = (product) => {
    setCurrentProduct({
      id: product.id,
      name: product.name || "",
      prize: product.prize || "",
      img: product.img || product.image || "",
      category: "Mattress",
    });
    setIsEditModalOpen(true);
  };

  const filteredProducts = products.filter((p) => {
    const name = p.name ? p.name.toLowerCase() : "";
    const id = String(p.id || "");
    return name.includes(searchTerm.toLowerCase()) || id.includes(searchTerm);
  });

  return (
    <div className="space-y-6 bg-[#EEEEEE] p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#222831] flex items-center gap-2">
            <FaBoxOpen className="text-[#00ADB5]" /> Products Management
          </h1>
          <p className="text-sm text-[#393E46] mt-1">
            Create, update, and manage your mattress inventory
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentProduct({
              id: "",
              name: "",
              prize: "",
              img: "../src/image/shop/astron-mattress.png",
              category: "Mattress",
            });
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00ADB5] hover:bg-[#00959c] text-[#EEEEEE] text-sm font-semibold rounded-lg shadow-sm transition"
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#393E46]/10 shadow-sm">
          <p className="text-xs font-semibold text-[#393E46] uppercase tracking-wider">
            Total in Catalog
          </p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1">
            {products.length} Products
          </h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#393E46]/10 shadow-sm">
          <p className="text-xs font-semibold text-[#00ADB5] uppercase tracking-wider">
            Average Price
          </p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1 flex items-center">
            <FaRupeeSign className="text-lg" />
            {products.length > 0
              ? Math.round(
                  products.reduce((acc, p) => acc + (Number(p.prize) || 0), 0) /
                    products.length,
                ).toLocaleString("en-IN")
              : 0}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#393E46]/10 shadow-sm">
          <p className="text-xs font-semibold text-[#00ADB5] uppercase tracking-wider">
            Active Collection
          </p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1 uppercase text-lg">
            {activeTab === "product2"
              ? "Shop Catalog (product2)"
              : "Featured Showcase (product)"}
          </h3>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-[#393E46]/10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Collections Tab */}
        <div className="flex bg-[#EEEEEE] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("product2")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "product2"
                ? "bg-white text-[#00ADB5] shadow-xs"
                : "text-[#393E46] hover:text-[#222831]"
            }`}
          >
            Shop Collection (product2)
          </button>
          <button
            onClick={() => setActiveTab("product")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "product"
                ? "bg-white text-[#00ADB5] shadow-xs"
                : "text-[#393E46] hover:text-[#222831]"
            }`}
          >
            Featured Mattresses (product)
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-3 text-[#393E46]/60 text-xs" />
          <input
            type="text"
            placeholder="Search products by title or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-4 py-1.5 border border-[#393E46]/20 rounded-lg text-sm text-[#222831] focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          />
        </div>
      </div>

      {/* Products Grid/Table */}
      <div className="bg-white rounded-xl border border-[#393E46]/10 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#393E46]">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#EEEEEE] border-t-[#00ADB5] mb-2"></div>
            <p>Loading catalog items...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-[#393E46]">
            <FaBoxOpen className="mx-auto text-4xl text-[#393E46]/30 mb-3" />
            <p className="font-semibold text-[#222831]">No products found</p>
            <p className="text-sm text-[#393E46]/70 mt-1">
              Add a new product or check your search term
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEEEEE] border-b border-[#393E46]/10 text-xs font-semibold text-[#393E46] uppercase tracking-wider">
                  <th className="py-3.5 px-4">#ID</th>
                  <th className="py-3.5 px-4">Image</th>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#393E46]/10 text-sm">
                {filteredProducts.map((p) => {
                  const imgSrc =
                    p.img || p.image || "../src/image/shop/astron-mattress.png";
                  return (
                    <tr key={p.id} className="hover:bg-[#EEEEEE]/60 transition">
                      <td className="py-3.5 px-4 font-mono text-xs text-[#393E46]">
                        #{p.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <img
                          src={imgSrc}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded-lg border border-[#393E46]/15 bg-[#EEEEEE]"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=100";
                          }}
                        />
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#222831]">
                        {p.name}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#222831]">
                        ₹{(Number(p.prize) || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00ADB5]/10 text-[#00ADB5]">
                          <FaTag className="text-[10px]" /> Mattress
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            title="Edit Product"
                            className="p-2 text-[#00ADB5] hover:bg-[#00ADB5]/10 rounded-lg transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            title="Delete Product"
                            className="p-2 text-[#e05252] hover:bg-[#e05252]/10 rounded-lg transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#222831]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#393E46]/10">
            <div className="p-6 border-b border-[#393E46]/10 bg-[#EEEEEE] flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#222831] flex items-center gap-2">
                {isAddModalOpen ? (
                  <FaPlus className="text-[#00ADB5]" />
                ) : (
                  <FaEdit className="text-[#00ADB5]" />
                )}
                {isAddModalOpen
                  ? "Add New Mattress Product"
                  : `Edit Product #${currentProduct.id}`}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="text-[#393E46]/60 hover:text-[#222831] font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ortho Memory Foam Mattress"
                  value={currentProduct.name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 border border-[#393E46]/20 rounded-lg text-sm text-[#222831] focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="e.g. 7999"
                  value={currentProduct.prize}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      prize: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 border border-[#393E46]/20 rounded-lg text-sm text-[#222831] focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. ../src/image/shop/astron-mattress.png"
                  value={currentProduct.img}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      img: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 border border-[#393E46]/20 rounded-lg text-sm text-[#222831] focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                />
              </div>

              {/* Image Presets Selector */}
              <div>
                <label className="block text-xs font-medium text-[#393E46]/70 mb-2">
                  Or select from existing asset library:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sampleImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setCurrentProduct({ ...currentProduct, img: img.path })
                      }
                      className={`p-2 border rounded-lg text-left text-xs transition flex flex-col items-center gap-1 ${
                        currentProduct.img === img.path
                          ? "border-[#00ADB5] bg-[#00ADB5]/10 text-[#00ADB5] font-semibold"
                          : "border-[#393E46]/20 hover:bg-[#EEEEEE] text-[#393E46]"
                      }`}
                    >
                      <img
                        src={img.path}
                        alt={img.name}
                        className="w-12 h-10 object-cover rounded"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=50";
                        }}
                      />
                      <span className="truncate w-full text-center text-[10px]">
                        {img.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#393E46]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  className="px-4 py-2 border border-[#393E46]/20 text-[#393E46] text-sm font-semibold rounded-lg hover:bg-[#EEEEEE] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00ADB5] text-white text-sm font-semibold rounded-lg hover:bg-[#00959c] transition flex items-center gap-1.5"
                >
                  <FaCheck />{" "}
                  {isAddModalOpen ? "Save Product" : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
