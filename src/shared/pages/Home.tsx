function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/Logo.png"
          alt="D2Store Logo"
          className="h-40 w-auto object-contain mb-6"
        />
        <h1 className="text-2xl font-bold text-gray-800">Welcome to D2Store</h1>
        <p className="text-gray-600 mt-2">Your shop, your way.</p>
      </div>
    </div>
  );
}

export default HomePage;
