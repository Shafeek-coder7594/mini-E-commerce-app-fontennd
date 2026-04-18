import React, { useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //for search sort and category
  const { search, setSearch } = useContext(ProductContext);

  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* logo */}
        <div
          className="text-xl font-bold cursor-pointer flex items-center gap-3 mr-6"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
            O
          </div>
          <span>OMNISTRIDE</span>
        </div>

        <div className="fixed top-0 left-0 w-full bg-gray-900 z-50 md:hidden">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
            {/* search bar here */}
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="w-full p-2 pl-8 rounded-lg bg-slate-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
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
            ← Back Home
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
            + Add product
          </button>
        )}
      </div>

      {/* mobile version */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 z-50 md:hidden">
  <div className="px-4 py-2 flex items-center gap-2">

    {/* Logo (small) */}
    <div
      className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-white font-bold cursor-pointer"
      onClick={() => navigate("/")}
    >
      O
    </div>

    {/* Search */}
    <div className="flex-1 relative">
      <input
        type="search"
        placeholder="Search"
        className="w-full p-2 pl-8 rounded-full bg-slate-700 text-sm text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
    </div>

    {/* Button (Add / Home) */}
    {location.pathname === "/add-product" ? (
          <button
            className="text-white bg-blue-500 box-border border border-transparent hover:bg-success-strong hover:bg-blue-600 
              transition-all duration-300 transform 
              hover:scale-105
              focus:ring-1 focus:ring-success-medium shadow-xs font-bold leading-5 rounded-md text-lg px-4 py-2.5 focus:outline-none"
            onClick={() => navigate("/")}
          >
            ← 
          </button>
        ) : (
          <button
            type="button"
            className="text-white bg-green-500 box-border border border-transparent hover:bg-success-strong hover:bg-green-600 
              transition-all duration-300 transform 
              hover:scale-105
              focus:ring-1 focus:ring-success-medium shadow-xs font-bold leading-5 rounded-md text-lg px-4 py-2.5 focus:outline-none"
            onClick={() => navigate("/add-product")}
          >
            +
          </button>
        )}
  </div>
</div>
    </div>
  );
};

export default Navbar;
