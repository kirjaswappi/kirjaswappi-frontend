import Button from './Button';

interface IBookDeleteModal {
  onConfirm: () => void;
  onCancel: () => void;
  header?: string;
  description?: string;
}

const DeleteBookModal = ({ onConfirm, onCancel, header, description }: IBookDeleteModal) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-[80%]">
        <h3 className="text-xl font-semibold mb-4">{header}</h3>
        <p className="mb-6 text-sm font-poppins font-normal">{description}</p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onCancel}
            className="px-4 py-2 bg-[#EA244E] hover:bg-[#c0163b] rounded-md hover:bg-gray-50 transition-colors text-white font-poppins text-sm"
          >
            No
          </Button>
          <Button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#3FBA49] text-white rounded-md  transition-colors font-poppins text-sm"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookModal;
