import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //for search sort and category
  const { search, setSearch } = useContext(ProductContext);

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* logo */}
        <div
          className="text-xl font-bold cursor-pointer flex items-center gap-3 mr-6"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
            O
          </div>
          <span className="hidden md:block">OMNISTRIDE</span>
        </div>

        <div className="flex-1 mx-6">
          <form className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                🔍
              </div>
              <input
                type="search"
                className="w-full p-2 pl-8 bg-slate-700 text-white text-sm rounded-full"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
        </div>
        {/* product add button */}
        {location.pathname === "/add-product" ? (
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2.5 rounded-md
              transition-all duration-300 transform 
              hover:scale-105
              focus:ring-1 focus:ring-success-medium "
            onClick={() => navigate("/")}
          >
            ← <span className="hidden md:block">Back Home</span>
          </button>
        ) : (
          <button
            type="button"
            className="text-white bg-green-500 box-border border border-transparent hover:bg-success-strong hover:bg-green-600 
              transition-all duration-300 transform 
              hover:scale-105
              focus:ring-1 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
            onClick={() => navigate("/add-product")}
          >
            + <span className="hidden md:block">Add product</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
