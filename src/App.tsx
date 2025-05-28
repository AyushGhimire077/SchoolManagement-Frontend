import Layout from "./pages/public/Landing/Layout"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import PrivateLayout from "./pages/private/layout/PrivateLayout"
import { Dashboard } from "./pages/private/componets/Dashboard"
import RegisterSchool from "./pages/public/Auth/RegisterSchool"
import { usePublicAuthStore } from "./pages/public/Auth/publicAuthStore"
import Login from "./pages/public/Auth/Login"
const App = () => {

  // check if user is logged in
  const { userRole, checkLoggedIn } = usePublicAuthStore();
  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  console.log("user role is", userRole);



  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            padding: "16px 24px",
            fontWeight: 500,
            fontSize: "15px",
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
          },
          success: {
            duration: 4000,
            style: {
              background: "#1DBF73",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#1DBF73",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#EF4444",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EF4444",
            },
          },
          loading: {
            duration: 5000,
            style: {
              background: "#3B82F6",
              color: "#fff",
            },
          },
        }}
      />

      <Routes>
        {userRole === "ADMIN" ? (
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Layout />} />
              <Route path="/auth/register-school" element={<RegisterSchool />} />
              <Route path="/auth" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;