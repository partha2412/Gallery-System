import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import GalleryPage from "./pages/GalleryPage";

import Header from "./components/Header";
import { PATHS } from "./routes/paths";
import ThemeProvider from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

function AuthWithKey() {
  const location = useLocation();
  return <Auth key={location.pathname} />;
}

function AppContent() {
  const location = useLocation();

  const hideHeader =
    location.pathname === PATHS.LOGIN ||
    location.pathname === "/signup";

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />

      {!hideHeader && <Header />}

      <Routes>
        <Route path={PATHS.HOME} element={<Landing />} />
        <Route path={PATHS.LOGIN} element={<AuthWithKey />} />
        <Route path="/signup" element={<AuthWithKey />} />
        <Route path={PATHS.GALLERY} element={<GalleryPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}