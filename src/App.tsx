import Layout from "./pages/public/Landing/Layout"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import PrivateLayout from "./pages/private/layout/PrivateLayout"
import { Dashboard } from "./pages/private/componets/Dashboard"
import RegisterSchool from "./pages/public/Auth/RegisterSchool"
import { usePublicAuthStore } from "./pages/public/Auth/publicAuthStore"
const App = () => {

  // check if user is logged in
  const { userRole, checkLoggedIn } = usePublicAuthStore();
  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);



  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 4000,
            style: {
              background: '#4CAF50',
              color: 'white',
              borderRadius: '8px',
              padding: '12px 20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#4CAF50',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#F44336',
              color: 'white',
              borderRadius: '8px',
              padding: '12px 20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#F44336',
            },
          },
          loading: {
            duration: 4000,
            style: {
              background: '#2196F3',
              color: 'white',
              borderRadius: '8px',
              padding: '12px 20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
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
          </>
        )}
      </Routes>
    </>
  );
};

export default App;