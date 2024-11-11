import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingFallback from "./components/LoadingFallback";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProviderWrapper } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import UserLayout from "./layouts/UserLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Categories from "./pages/admin/categories/Categories";
import CreateCategory from "./pages/admin/categories/CreateCategory";
import UpdateCategory from "./pages/admin/categories/UpdateCategory";
import AdminLogin from "./pages/admin/login/AdminLogin";
import OrderDetails from "./pages/admin/orders/OrderDetails";
import Orders from "./pages/admin/orders/Orders";
import CreateProduct from "./pages/admin/products/CreateProduct";
import Products from "./pages/admin/products/Products";
import UpdateProduct from "./pages/admin/products/UpdateProduct";
import Users from "./pages/admin/users/Users";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Cart from "./pages/client/Cart";
import AddressOptions from "./pages/checkout/AddressOptions";
import ShippingOptions from "./pages/checkout/ShippingOptions";
import Home from "./pages/client/Home";
import NoPage from "./pages/NoPage";
import ProductDetails from "./pages/client/ProductDetails";
import Profile from "./pages/client/Profile";
import Test from "./pages/Test";
import AdminRequired from "./routeWrappers/AdminRequired";
import LoginRequired from "./routeWrappers/LoginRequired";
import LogoutRequired from "./routeWrappers/LogoutRequired";
import ProfileUpdate from "./pages/client/ProfileUpdate";
import Success from "./pages/checkout/Success";
import ReviewOrder from "./pages/checkout/ReviewOrder";
import Purchases from "./pages/client/Purchases";

function App() {
  return (
    <ThemeProviderWrapper>
      <UserProvider>
        <Suspense fallback={<LoadingFallback />}>
          <BrowserRouter basename="/tcc-info">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />

                <Route path="product/:productId" element={<ProductDetails />} />
                
                <Route path="cart" element={<Cart />} />
                
                <Route path="checkout" element={<LoginRequired />}>
                  <Route path="address-options" element={<AddressOptions />} />
                  <Route
                    path="shipping-options"
                    element={<ShippingOptions />}
                  />
                  <Route path="review" element={<ReviewOrder />} />
                  <Route path="success" element={<Success />} />
                </Route>

                <Route path="profile" element={<LoginRequired />}>
                  <Route index element={<Profile />} />
                  <Route path="update" element={<ProfileUpdate />} />
                </Route>

                <Route path="purchases" element={<LoginRequired />}>
                  <Route index element={<Purchases />} />
                </Route>

                <Route element={<LogoutRequired />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                </Route>
                
                <Route path="test" element={<Test />} />
              </Route>
              <Route path="admin">
                <Route element={<LogoutRequired />}>
                  <Route index element={<AdminLogin />} />
                </Route>
                <Route element={<AdminRequired />}>
                  <Route element={<AdminDashboardLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/:orderId" element={<OrderDetails />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="categories/new" element={<CreateCategory />} />
                    <Route path="categories/:categoryId">
                      <Route path="update" element={<UpdateCategory />} />
                    </Route>
                    <Route path="products" element={<Products />} />
                    <Route path="products/new" element={<CreateProduct />} />
                    <Route
                      path="products/:productId/update"
                      element={<UpdateProduct />}
                    />
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </UserProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
