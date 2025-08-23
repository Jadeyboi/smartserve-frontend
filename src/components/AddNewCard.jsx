import { Plus } from "lucide-react";

function AddNewCard() {
  return (
    <div className="bg-white rounded-xl shadow-md border-2 border-dashed border-gray-300 hover:border-red-400 transition-colors duration-200 cursor-pointer group">
      <div className="flex flex-col items-center justify-center h-48 p-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-50 transition-colors duration-200">
          <Plus className="w-8 h-8 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
        </div>
        <p className="text-gray-500 font-medium text-center group-hover:text-red-600 transition-colors duration-200">
          Add New Menu Item
        </p>
      </div>
    </div>
  );
}

export default AddNewCard;
