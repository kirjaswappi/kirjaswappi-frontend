import { useNavigate } from "react-router-dom";
import plus from "../../../assets/plus.png";
import Image from "../../../components/shared/Image";
export default function AddBookComponent() {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate("/profile/add-book")}
            className="max-w-[168px] h-[264px] flex flex-col items-center justify-center gap-2 border border-grayDark border-dashed"
        >
            <Image src={plus} alt="Plus" />
            <p className="font-poppins text-sm font-medium text-grayDark">
                Add a book
            </p>
        </div>
    );
}
