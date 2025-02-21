import { useNavigate } from "react-router-dom";
import plus from "../../../assets/plusAdd.png";
import Image from "../../../components/shared/Image";
export default function AddBookComponent() {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate("/profile/add-book")}
            className="max-w-[168px] h-[229px] flex flex-col items-center justify-center gap-2 border border-primary border-dashed bg-white"
        >
            <Image src={plus} alt="Plus" />
            <p className="font-poppins text-sm font-medium text-primary">
                Add a book
            </p>
        </div>
    );
}
