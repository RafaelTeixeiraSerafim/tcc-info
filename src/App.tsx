import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserHome from "./pages/UserHome";
import ProductForm from "./components/ProductForm";
import { Suspense } from "react";
import LoadingFallback from "./components/LoadingFallback";

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LoginLayout />}>
                <Route path="login" element={<UserLogin />} />
                <Route path="signup" element={<Signup />} />
              </Route> */}
          {/* <Route path="/" element={<UserLayout />}> */}
          <Route index element={<UserHome />} />
          <Route path="new-product" element={<ProductForm />} />
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
  );
}

export default App;
