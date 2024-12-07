import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bookImg from "../../assets/book.jpg";
import editIcon from "../../assets/editWhite.png";
import { setSwapModal } from "../../redux/feature/open/openSlice";
import { useAppSelector } from "../../redux/hooks";
import Button from "./Button";
import Image from "./Image";
interface IBookCard {
    image?: string;
    title?: string;
    by?: string;
    isProfile?: boolean;
}

export default function BookCard({ title, by, isProfile = false }: IBookCard) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { swapModal } = useAppSelector((state)=> state.open)
    return (
        <div className="max-w-[168px] flex flex-col">
            <div
                onClick={() => navigate("/book-details/12", {
                    state:"book-details"
                })}
                className="cursor-pointer"
            >
                <div className=" max-h-[190px] rounded-[8px] mb-2">
                    <Image
                        className="mx-auto"
                        src={bookImg}
                        alt={`${title} || 'Your favorite book'`}
                    />
                </div>
                <div>
                    <h1 className="font-medium text-black text-sm leading-none mb-1 font-sofia">
                        {title || "Man’s Search for Meaning"}
                    </h1>
                    <p className="text-black font-light text-xs font-sofia">
                        by {by || "Viktor Frankl's"}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
                {isProfile ? (
                    <Button className="bg-primary text-white font-medium text-xs py-2 w-full h-[30px] rounded-[8px] font-sofia flex items-center justify-center gap-2">
                        <Image src={editIcon} alt="Edit" />
                        Edit Details
                    </Button>
                ) : (
                    <Button onClick={() => dispatch(setSwapModal(!swapModal))} className="bg-primary text-white font-medium text-xs py-2 w-full h-[30px] rounded-[8px] font-sofia">
                        Swap Request
                    </Button>
                )}
                {/* <Button className="bg-primary text-white font-medium text-xs py-2 w-full h-[30px] rounded-[8px] font-sofia">Swap Request</Button> */}
                {/* <Button className="bg-white w-[48px] h-[30px] flex items-center justify-center rounded-[8px] shadow-sm">
                    <Image src={closeIcon} alt={`${title} || 'Your favorite book'`} />
                </Button> */}
            </div>
        </div>
    );
}
