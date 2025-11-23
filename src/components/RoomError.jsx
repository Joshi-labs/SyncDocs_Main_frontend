const RoomError = ({ message }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h2 className="text-2xl font-semibold text-red-600 mb-3">
        Room Access Failed
      </h2>
      <p className="text-gray-700 text-lg">{message}</p>
      <button
        onClick={() => window.location.href = "/"}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default RoomError;
