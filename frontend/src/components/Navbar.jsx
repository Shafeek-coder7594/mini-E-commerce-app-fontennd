import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  //for search sort and category
  const { search, setSearch, category, setCategory, sort, setSort } =
    useContext(ProductContext);

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

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* drop down and search bar */}
        <div className="hidden md:flex items-center gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-700 p-2 lg:px-3 lg:py-4 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="audio">Audio</option>
            <option value="furniture">Furniture</option>
            <option value="acessories">Accessories</option>
          </select>

          <select
            value={sort}
            className="bg-slate-700 p-2 w-20 lg:w-auto lg:px-3 lg:py-4 rounded-lg"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
          <form className="max-w-md mx-auto">
            <label
              htmlFor="search"
              className="block mb-2.5 text-sm font-medium text-heading sr-only "
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-body"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              <input
                type="search"
                className="block w-full p-3 ps-9 bg-slate-700 border border-default-medium text-heading text-sm rounded-full focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                placeholder="Search"
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>

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
              {" "}
              + Add product{" "}
            </button>
          )}
        </div>
      </div>

      {/* Mobile drop down menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 px-4 pb-4">
          <select
            className="bg-slate-700 p-2 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="audio">Audio</option>
            <option value="furniture">Furniture</option>
            <option value="acessories">Accessories</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-slate-700 p-2 rounded-lg"
          >
            <option value="">Sort</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
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
          {location.pathname === "/add-product" ?
          (<button
            className="bg-blue-500 p-2 rounded-lg box-border border border-transparent hover:bg-success-strong hover:bg-blue-600 
              transition-all duration-300 transform 
              hover:scale-102
              focus:ring-1 focus:ring-success-medium shadow-xs font-medium leading-5"
            onClick={() => navigate("/")}
          >
            ← Back Home
          </button>
          ):(
          <button
            className="bg-green-500 p-2 rounded-lg box-border border border-transparent hover:bg-success-strong hover:bg-green-600 
              transition-all duration-300 transform 
              hover:scale-102
              focus:ring-1 focus:ring-success-medium shadow-xs font-medium leading-5"
            onClick={() => navigate("/add-product")}
          >
            + Add Product
          </button>)}
        </div>
      )}
    </div>
  );
};

export default Navbar;
