import RegisterForm from "./components/RegisterForm"
import AuthNavbar from "./components/AuthNavbar"

const RegisterSchool = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <AuthNavbar />
      <div className="pt-6 pb-12">
        <RegisterForm />
      </div>

      <footer className="shadow shadow-blue-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} EduPlatform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RegisterSchool