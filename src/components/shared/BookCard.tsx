import { useNavigate } from "react-router-dom";
import bookImg from "../../assets/book.jpg";
import closeIcon from "../../assets/close.svg";
import Button from "./Button";
import Image from './Image';
interface IBookCard {
    image?: string;
    title?: string;
    by?: string
}

export default function BookCard({ title, by }: IBookCard) {
    const navigate = useNavigate()

    
    return (
        <div className="max-w-[168px] flex flex-col gap-2" onClick={() => navigate('/book-details/12')}>
            <div className=" max-h-[190px] rounded-[8px]">
                <Image className="mx-auto" src={bookImg} alt={`${title} || 'Your favorite book'`} />
            </div>
            <div>
                <h1 className="font-medium text-black text-sm leading-none mb-1 font-sofia">{title || 'Man’s Search for Meaning'}</h1>
                <p className="text-black font-light text-xs font-sofia">by {by || "Viktor Frankl's"}</p>
                <div className="flex items-center gap-2 mt-1">
                    <Button className="bg-primary text-white font-medium text-xs py-2 w-9/12 h-[30px] rounded-[8px] font-sofia">Swap Request</Button>
                    <Button className="bg-white w-[48px] h-[30px] flex items-center justify-center rounded-[8px] shadow-sm">
                        <Image src={closeIcon} alt={`${title} || 'Your favorite book'`} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
