const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
      <p className="text-gray-800 text-lg mb-4">Oops! Something went wrong.</p>
      <p className="text-gray-600">
        Please try again later or contact support.
      </p>
    </div>
  );
};

export default ErrorPage;
