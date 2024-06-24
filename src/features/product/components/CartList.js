import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { Link } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { useAlert } from "react-alert";

export default function CartList({ product, isLiked = false, user = "user" }) {
  const [linkPath, setLinkPath] = useState("##");
  const alert = useAlert();

  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (product && product.colors && product.colors.length > 0) {
        newItem.color = product.colors[0];
      }
      if (product && product.sizes && product.sizes.length > 0) {
        newItem.size = product.sizes[0];
      }
      // console.log(newItem);
      dispatch(addToCartAsync(newItem));
      alert.success("Item added to Cart");
    } else {
      alert.error("Item Already added");
    }
  };

  return (
    <Link to={`/product-detail/${product.id}`}>
      <div className="product-card">
        <div className="product-tumb">
          <img src={product.thumbnail} alt="" />
        </div>
        <div className="product-details">
          <span className="product-catagory font-poppins font-medium text-textcolor text-base">
            {product.category}
          </span>
          <h4 className="font-poppins ">{product.title}</h4>
          <p className="font-poppins ">{product.description}</p>
          <div className="product-bottom-details">
            <div className="flex items-start mb-0  mt-2 justify-between">
              <span className="bg-textcolor text-white text-sm font-semibold inline-flex items-center p-1 rounded">
                {product.rating}
                <span className="ms-2">
                  <svg
                    className="w-4 h-3 text-white  me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </span>
              </span>

              {product && product.stock > 0 && (
                <button
                  onClick={handleCart}
                  type="button"
                  className="text-transparent hover:text-textcolor border border-textcolor hover:bg-textcolor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-0 dark:border-textcolor dark:text-textcolor dark:hover:text-white dark:hover:bg-textcolor dark:focus:ring-0"
                >
                  ADD
                </button>
              )}
            </div>

            <div className="product-price">
              <div>
                <span className=" text-xl me-2 ">
                  ₹ {product.discountPrice}
                </span>
                <small className="text-xs"> ₹ {product.price}</small>
              </div>

              <div>
                {" "}
                {user === "admin" && product?.deleted && (
                  <span className="text-red-500">Product deleted</span>
                )}
                {product.stock <= 0 && (
                  <span className="text-sm text-red-400">Out of stock</span>
                )}
              </div>
            </div>

            <div className="product-links">
              {/* <Link to={"#"}>
                  <i className="bi bi-cart-check-fill"></i>
                </Link>

                <Link to={linkPath}>
                  {isLiked ?
                    (<i className="bi bi-heart-fill" style={{ color: "#ff7089" }}></i>)
                    : (<i className='bi bi-heart'> </i>)
                  }
                </Link> */}
            </div>

            <div className="flex flex-wrap justify-between items-baseline">
              {user === "admin" && (
                <Link
                  to={`/admin/product-form/edit/${product.id}`}
                  className="rounded-md bg-secondary px-3 py-2 mb-2 text-sm font-semibold text-white shadow-sm hover:bg-textcolor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-textcolor"
                >
                  Edit Product
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
