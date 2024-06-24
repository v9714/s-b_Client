// import { useEffect } from "react";
// import { Link, Navigate, useParams } from "react-router-dom";
// import { resetCartAsync } from "../features/cart/cartSlice";
// import { useDispatch } from "react-redux";
// import { resetOrder } from "../features/order/orderSlice";

// function OrderSuccessPage() {
//   const params = useParams();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(resetCartAsync())
//       .then(() => {
//         console.log("Cart reset successfully!");
//       })
//       .catch((error) => {
//         console.error("Failed to reset cart:", error);
//       });

//     dispatch(resetOrder());
//   }, [dispatch]);

//   return (
//     <>
//       {!params.id && <Navigate to="/" replace={true}></Navigate>}
//       <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
//         <div className="text-center">
//           <p className="text-base font-semibold text-indigo-600">
//             Order Successfully Placed
//           </p>
//           <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             Order Number #{params?.id}
//           </h1>
//           <p className="mt-6 text-base leading-7 text-gray-600">
//             You can check your order in My Account {">"} My Orders
//           </p>
//           <div className="mt-10 flex items-center justify-center gap-x-6">
//             <Link
//               to="/"
//               className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Go back home
//             </Link>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default OrderSuccessPage;

import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { resetOrder } from "../features/order/orderSlice";

function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 100000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(resetCartAsync())
      .then(() => {
        console.log("Cart reset successfully!");
      })
      .catch((error) => {
        console.error("Failed to reset cart:", error);
      });

    dispatch(resetOrder());
  }, [dispatch]);

  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-textcolor">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{params?.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in My Account {">"} My Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-textcolor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccessPage;
