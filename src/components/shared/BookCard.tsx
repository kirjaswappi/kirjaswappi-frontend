import { useNavigate } from "react-router-dom";
import { IBook } from "../../pages/books/interface";
import Image from "./Image";

export default function BookCard({
    book,
    isProfile = false,
}: {
    book: IBook;
    isProfile?: boolean;
}) {
    if(!book) return;
    const navigate = useNavigate();
    console.log(isProfile);
    const { title, author, coverPhotoUrl, id } = book;
    return (
        <div className="max-w-[168px] max-h-[264px] flex flex-col ">
            <div
                onClick={() =>
                    navigate(`/book-details/${id}`, {
                        state: "book-details",
                    })
                }
                className="cursor-pointer"
            >
                <div className="h-[190px] rounded-[8px] mb-2 rounded-md overflow-hidden	">
                    <Image
                        className="mx-auto h-full object-cover"
                        src={coverPhotoUrl}
                        alt={`${title} || 'Your favorite book'`}
                    />
                </div>
                <div>
                    <h1 className="font-medium text-black text-xs leading-none mb-1 font-poppins">
                        {title && title}
                    </h1>
                    {author && (
                        <p className="text-black font-light text-[10px] font-poppins">
                            by {author}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
                {/* {isProfile ? (
                    <Button className="bg-primary text-white font-medium text-xs py-2 w-full h-[30px] rounded-[8px] font-poppins flex items-center justify-center gap-2">
                        <Image src={editIcon} alt="Edit" />
                        Edit Details
                    </Button>
                ) : (
                    <Button onClick={() => dispatch(setSwapModal(!swapModal))} className="bg-primary text-white font-medium text-xs py-2 w-full h-[30px] rounded-[8px] font-poppins">
                        Swap Request
                    </Button>
                )} */}
                {/* <Button className="bg-primary text-white font-medium text-xs py-2 w-full h-[30px] rounded-[8px] font-poppins">Swap Request</Button> */}
                {/* <Button className="bg-white w-[48px] h-[30px] flex items-center justify-center rounded-[8px] shadow-sm">
                    <Image src={closeIcon} alt={`${title} || 'Your favorite book'`} />
                </Button> */}
            </div>
        </div>
    );
}
