import LoginForm from "../features/users/components/LoginUserForm";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          {/* Logo image */}
          <img
            src="/Logo.png"
            alt="D2Store Logo"
            className="h-15 mb-5 object-contain object-center block"/>
          <p className="text-gray-500 text-sm">Welcome back, login.</p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
