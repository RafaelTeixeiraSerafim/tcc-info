import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Suspense } from "react";
import LoadingFallback from "./components/LoadingFallback";
import CreateProduct from "./pages/admin/products/CreateProduct";
import UpdateProduct from "./pages/admin/products/UpdateProduct";
import { UserProvider } from "./contexts/UserContext";
import UserLayout from "./layouts/UserLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminRequired from "./route_wrappers/AdminRequired";
import LogoutRequired from "./route_wrappers/LogoutRequired";
import { ThemeProviderWrapper } from "./contexts/ThemeContext";
import Products from "./pages/admin/products/Products";
import Categories from "./pages/admin/categories/Categories";
import UpdateCategory from "./pages/admin/categories/UpdateCategory";
import CreateCategory from "./pages/admin/categories/CreateCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/admin/orders/Orders";
import OrderDetails from "./pages/admin/orders/OrderDetails";
import Users from "./pages/admin/users/Users";
import NoPage from "./pages/NoPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import AddressOptions from "./pages/checkout/AddressOptions";
import LoginRequired from "./route_wrappers/LoginRequired";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import { AddressProvider } from "./contexts/AddressContext";
import Test from "./pages/Test";
import AdminLogin from "./pages/admin/login/AdminLogin";
import { CartProvider } from "./contexts/CartContext";
import ShippingOptions from "./pages/checkout/ShippingOptions";

function App() {
  return (
    <ThemeProviderWrapper>
      <UserProvider>
        <AddressProvider>
          <CartProvider>
            <Suspense fallback={<LoadingFallback />}>
              <BrowserRouter basename="/tcc-info">
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route
                      path="product/:productId"
                      element={<ProductDetails />}
                    />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<LoginRequired />}>
                      <Route
                        path="address-options"
                        element={<AddressOptions />}
                      />
                      <Route
                        path="shipping-options"
                        element={<ShippingOptions />}
                      />
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
                        <Route
                          path="orders/:orderId"
                          element={<OrderDetails />}
                        />
                        <Route path="categories" element={<Categories />} />
                        <Route
                          path="categories/new"
                          element={<CreateCategory />}
                        />
                        <Route path="categories/:categoryId">
                          <Route path="update" element={<UpdateCategory />} />
                        </Route>
                        <Route path="products" element={<Products />} />
                        <Route
                          path="products/new"
                          element={<CreateProduct />}
                        />
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
          </CartProvider>
        </AddressProvider>
      </UserProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
