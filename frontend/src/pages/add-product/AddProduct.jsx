import React, { useContext, useRef, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useFormik } from "formik";
import { productSchema } from "../../utils/validateProduct";

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);

  const fileInputRef = useRef(null);

  //preview of image
  const [preview, setPreview] = useState(null);

  //validate form
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      image: null,
    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();

      data.append("name", values.name);
      data.append("price", values.price);
      data.append("category", values.category);
      data.append("image", values.image);

      await addProduct(data);

      resetForm();
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  });

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Enter product name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 `}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              placeholder="Enter price"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500`}
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.errors.price && formik.touched.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              name="category"
              placeholder="Enter category"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500`}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            />
            {formik.errors.category && formik.touched.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              name="image"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  formik.setFieldValue("image", file);
                  formik.setFieldError("image", "");
                }
                formik.setFieldTouched("image",true,false)

                setPreview(URL.createObjectURL(file));
              }}
            />
            {formik.errors.image && formik.touched.image && (
              <p className="text-red-500 text-sm">{formik.errors.image}</p>
            )}
          </div>
          {preview && (
            <div className="mt-4 border rounded-lg p-4 bg-gray-100 relative">
              <p className="text-sm text-gray-600 mb-2">Image Preview:</p>

              <img
                src={preview}
                alt="preview"
                className="w-full max-h-64 object-contain rounded"
              />

              {/* optional close button */}
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 bg-gray-700 text-white rounded-full px-2 py-1"
              >
                ✕
              </button>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
            >
              Add Product
            </button>

            <button
              type="button"
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg"
              onClick={() => {
                formik.resetForm();
                setPreview(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
