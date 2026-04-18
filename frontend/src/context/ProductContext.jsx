import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);

  const addProduct = async (formData) => {
    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      //refresh after adding
      fetchProducts();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/products?search=${search}&category=${category}&sort=${sort}`);
      const data = await res.json();

      setProducts(data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  return (
    <div>
      <ProductContext.Provider
        value={{ products, setProducts, addProduct, fetchProducts,search,setSearch,category,setCategory,sort,setSort,API,loading }}
      >
        {children}
      </ProductContext.Provider>
    </div>
  );
};

export default ProductProvider;
