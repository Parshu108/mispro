function Products() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      <div className="bg-white shadow rounded p-4">Product List Here</div>
    </div>
  );
}

export default Products;
