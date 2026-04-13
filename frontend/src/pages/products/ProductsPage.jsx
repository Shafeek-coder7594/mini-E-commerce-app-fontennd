import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";

const ProductsPage = () => {
  const { products, fetchProducts, search, category, sort,API } =
    useContext(ProductContext);

    console.log("API URL:", API);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  //for search
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category,
    );
  }

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  //pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Products
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-6">
        {filteredProducts.length === 0 ? (
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
              {console.log("imageURL: ",product.image)}

              <h2 className="text-base sm:text-lg font-semibold mt-2">{product.name}</h2>

              <p className="text-sm sm:text-base text-gray-600">${product.price}</p>

              <p className="text-xs sm:text-sm text-gray-500">{product.category}</p>
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
  );
};

export default ProductsPage;
