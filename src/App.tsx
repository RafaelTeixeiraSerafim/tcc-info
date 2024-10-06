import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Suspense } from "react";
import LoadingFallback from "./components/LoadingFallback";
import CreateProduct from "./pages/admin/products/CreateProduct";
import UpdateProduct from "./pages/admin/products/UpdateProduct";
import { UserProvider } from "./contexts/UserContext";
import UserLayout from "./layouts/UserLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminRequired from "./routeWrappers/AdminRequired";
import LogoutRequired from "./routeWrappers/LogoutRequired";
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
import LoginRequired from "./routeWrappers/LoginRequired";
import AdminDashboardLayout from "./components/AdminDashboardLayout";

function App() {
  return (
    <ThemeProviderWrapper>
      <UserProvider>
        <Suspense fallback={<LoadingFallback />}>
          <HashRouter basename="/tcc-info">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:productId" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<LoginRequired />}>
                  <Route path="address-options" element={<AddressOptions />} />
                </Route>
                <Route element={<LogoutRequired />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                </Route>
              </Route>
              <Route element={<AdminRequired />}>
                <Route path="admin" element={<AdminDashboardLayout />}>
                  <Route index element={<AdminDashboard />} />
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
              <Route path="*" element={<NoPage />} />
              {/* <Route path="user/:username" element={<UserProfile />} />
                <Route path="game/:title" element={<GameRouteWrapper />}>
                  <Route index element={<Game />} /> */}
              {/* </Route> */}

              {/* <Route element={<LoginRequired />}>
                  <Route
                    path="partner/:username"
                    element={<PartnerProfile />}
                  />
                  <Route path="settings/profile" element={<ProfileConfig />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="library" element={<GameLibrary />} />
                </Route>
              </Route>
              <Route path="/partner" element={<PartnerLayout />}>
                <Route element={<LoginRequired />}>
                  <Route index element={<PartnerHome />} />
                  <Route path="game/:title" element={<GameRouteWrapper />}>
                    <Route index element={<UpdateGame />} />
                  </Route>
                  <Route path="new-game" element={<CreateGame />} />
                </Route>
              </Route>
              <Route path="/" element={<ErrorLayout />}>
                <Route path="*" element={<NoPage />} />
              </Route> */}
            </Routes>
          </HashRouter>
        </Suspense>
      </UserProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
