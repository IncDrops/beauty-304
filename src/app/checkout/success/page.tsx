export default function SuccessPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-green-50">
        <h1 className="text-3xl font-bold text-green-700">🎉 Payment Successful!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Thank you for your purchase. We’ve received your offer and will follow up shortly.
        </p>
        <a href="/" className="mt-6 inline-block text-blue-600 hover:underline">
          Return to Homepage
        </a>
      </div>
    );
  }
  