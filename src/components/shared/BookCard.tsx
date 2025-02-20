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

    const { title, author, coverPhotoUrl, id } = book;
    return (
        <div className="max-w-[168px] max-h-[264px] flex flex-col ">
            <div
                onClick={() =>
                    navigate(`${isProfile? "/profile/":"/"}book-details/${id}`, {
                        state: "book-details",
                    })
                }
                className="cursor-pointer"
            >
                <div className="h-[190px] mb-2 rounded-md overflow-hidden	">
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
        </div>
    );
}
