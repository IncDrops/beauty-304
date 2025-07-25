export default function CancelPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-red-50">
        <h1 className="text-3xl font-bold text-red-700">❌ Payment Cancelled</h1>
        <p className="mt-4 text-lg text-gray-700">
          It looks like your payment didn’t go through. You can try again anytime.
        </p>
        <a href="/" className="mt-6 inline-block text-blue-600 hover:underline">
          Return to Homepage
        </a>
      </div>
    );
  }
  