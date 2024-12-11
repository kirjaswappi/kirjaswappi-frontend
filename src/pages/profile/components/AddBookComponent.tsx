import plus from "../../../assets/plus.png";
import Image from "../../../components/shared/Image";
export default function AddBookComponent() {
    return (
        <div className="max-w-[168px] h-[264px] flex flex-col items-center justify-center gap-2 border border-grayDark border-dashed">
            <Image src={plus} alt="Plus" />
            <p className="font-sofia text-sm font-medium text-grayDark">Add a book</p>
        </div>
    );
}
