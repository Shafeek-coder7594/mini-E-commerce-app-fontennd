import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";

const ProductsPage = () => {
  const {
    products,
    fetchProducts,
    search,
    category,
    setCategory,
    sort,
    setSort,
    API,
    loading,
  } = useContext(ProductContext);

  console.log("API URL:", API);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  //for search
  const displayedProducts = products;

  //pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = displayedProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  return (
    <div className="flex flex-col md:flex-row gap-6 pt-16">
      <aside class="w-full lg:w-72 bg-white rounded-2xl shadow-xl p-6 m-4 lg:sticky lg:top-24 lg:h-fit border border-gray-100">
        {/* left filter */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-xl text-gray-800 mb-3">Filters</h2>

          {/* Category */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800 mb-4">Category</h3>

            {["Electronics", "Audio", "Furniture", "Accessories"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 p-3 rounded-lg gradient-to-r hover:from-indigo-50 cursor-pointer transition-all duration-300 group"
              >
                <input
                  type="checkbox"
                  checked={category === cat}
                  onChange={() => setCategory(category === cat ? "" : cat)}
                  className="w-4 h-4"
                />

                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300 font-medium">
                  {cat}
                </span>
              </label>
            ))}
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Sort by:</h3>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-500 transition-all duration-300"
            >
              <option value="">Sort</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
            </select>
          </div>
        </div>
      </aside>
      <div className="w-3/4 px-4 sm:px-6 py-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Products
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-6">
          {loading ? (
            <p className="text-center col-span-full text-lg font-semibold">
              Loading Products...
            </p>
          ) : displayedProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            currentProducts.map((product) => (
              <div
                key={product._id}
                className="rounded-xl p-3 sm:p-4 hover:scale-103 hover:shadow-xl hover:-translate-y-1 transition"
              >
                <img
                  src={`${API}/uploads/${product.image}`}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-lg"
                />
                {console.log("imageURL: ", product.image)}

                <h2 className="text-base sm:text-lg font-semibold mt-2">
                  {product.name}
                </h2>

                <p className="text-sm sm:text-base text-gray-600">
                  ${product.price}
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  {product.category}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm sm:text-base rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-900 text-white"}`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full ${
                currentPage == i + 1 ? "bg-gray-900 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-900 text-white"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
