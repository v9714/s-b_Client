import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthUserAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Loder from "./features/Loder/Loder";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        {" "}
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>{" "}
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        {" "}
        <UserProfilePage></UserProfilePage>{" "}
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="App">
        {userChecked && (
          <Provider template={AlertTemplate} {...options}>
            <RouterProvider router={router} />
          </Provider>
        )}
      </div>
      {/* <Loder isLoding={true} /> */}
    </>
  );
}

export default App;