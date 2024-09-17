import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserHome from "./pages/UserHome";
import { Suspense } from "react";
import LoadingFallback from "./components/LoadingFallback";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import { UserProvider } from "./contexts/UserContext";
import UserLayout from "./layouts/UserLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLayout from "./layouts/AdminLayout";
import AdminRequired from "./routeWrappers/AdminRequired";
import LogoutRequired from "./routeWrappers/LogoutRequired";
import { ThemeProviderWrapper } from "./contexts/ThemeContext";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import UpdateCategory from "./pages/UpdateCategory";
import CreateCategory from "./pages/CreateCategory";
import Product from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Users from "./pages/Users";
import NoPage from "./pages/NoPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <ThemeProviderWrapper>
      <UserProvider>
        <Suspense fallback={<LoadingFallback />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<UserHome />} />
                <Route path="product/:productId" element={<Product />} />
                <Route path="cart/" element={<Cart />} />
                <Route element={<LogoutRequired />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                </Route>
              </Route>
              <Route element={<AdminRequired />}>
                <Route path="admin" element={<AdminLayout />}>
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
                  <Route path="products/:productId/update" element={<UpdateProduct/>}/>
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
          </BrowserRouter>
        </Suspense>
      </UserProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
