
export const Toastify = ({ message, type, onClose }: any) => {
    // Dynamically determine background color based on toast type
    const typeStyles = {
      SUCCESS: "bg-green-500 text-white",
      ERROR: "bg-red-500 text-white",
      WARNING: "bg-yellow-500 text-black",
    };
  
    return (
      <div
        className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-md animate-fadeIn ${typeStyles[type]} transition-all duration-300`}
        style={{ minWidth: "250px" }}
      >
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button
            className="text-lg font-bold ml-4"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
      </div>
    );
  }
