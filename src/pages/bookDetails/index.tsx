import { useNavigate } from "react-router-dom";
import book from "../../assets/book.jpg";
import bookDetailsBg from "../../assets/bookdetailsbg.jpg";
import BookMarkIcon from "../../assets/icon_bookmark.png";
import leftArrowIcon from "../../assets/leftArrow.png";
import locationIcon from "../../assets/location-icon.png";
import conditionIcon from "../../assets/offerBookIcon.png";
import profileIcon from "../../assets/profile.png";
import shareIcon from "../../assets/share-icon.png";
import upArrowIcon from "../../assets/upArrow.png";
import Button from "../../components/shared/Button";
import Image from "../../components/shared/Image";
import { goToTop } from "../../utility/helper";
export default function BookDetails() {
    const navigate = useNavigate();
    goToTop()
    return (
        <div>
            <div className="absolute left-0 top-4 w-full flex justify-between px-4">
                <div className="flex items-center gap-4">
                    <Image src={leftArrowIcon} alt="icon" onClick={()=> navigate(-1)}  />
                    <h2 className="text-black text-base font-medium leading-none mt-[3px]">Book Details</h2>
                </div>
                <div className="flex items-center gap-4">
                    <Image src={shareIcon} alt="icon" />
                    <Image src={BookMarkIcon} alt="icon" />
                </div>
            </div>
            <div className="w-full h-[260px]">
                <Image src={bookDetailsBg} className="w-full h-full" />
            </div>
            <div className="mx-auto w-[160px] h-[190px] -mt-36">
                <Image src={book} className="w-full h-full" />
            </div>
            <div className="container pb-32">
                <div className="text-center my-5 ">
                    <h1 className="font-medium text-black text-sm leading-none mb-1 font-poppins">
                        Man’s Search for Meaning'
                    </h1>
                    <p className="text-black font-light text-xs font-poppins">
                        by Viktor Frankl's
                    </p>
                    <p className="text-black font-light text-xs font-poppins">
                        Biography | Autobiography | Personal narrative
                    </p>
                </div>
                <div className="bg-white py-2 px-5 grid grid-cols-3">
                    <div className="text-center">
                        <p className="text-grayDark text-xs font-poppins font-normal">
                            Book Condition
                        </p>
                        <h3 className="text-black text-xs font-normal font-poppins">
                            Used Like New
                        </h3>
                    </div>
                    <div className="text-center">
                        <p className="text-grayDark text-xs font-poppins font-normal">
                            language
                        </p>
                        <h3 className="text-black text-xs font-normal font-poppins">
                            English
                        </h3>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-grayDark text-xs font-poppins font-normal">
                            Exchange Condition
                        </p>
                        <h3 className="text-black text-xs font-normal font-poppins flex items-center gap-1">
                            <Image src={conditionIcon} /> Used Like New
                        </h3>
                    </div>
                </div>
                <div className="flex items-center gap-1 my-5">
                    <Image src={locationIcon} alt="location" />
                    <p className="text-xs font-poppins font-normal">
                        Senate Square, Helsinki
                    </p>
                </div>
                <div>
                    <h3 className="text-xs font-normal font-poppins text-grayDark mb-2">
                        Offered by
                    </h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Image src={profileIcon} alt="profile" />
                            <p className="text-xs font-normal font-poppins text-black">
                                Raisa Binte Hossain
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={upArrowIcon} alt="profile" />
                            <p className="text-xs font-normal font-poppins text-black">
                                95% Positive Swaps
                            </p>
                        </div>
                    </div>
                    <h3 className="text-sm font-medium font-poppins text-black mt-5">
                        Book Description
                    </h3>
                    <p className="text-xs font-light font-poppins text-grayDark">
                        A brief synopsis or description of the book’s content,
                        providing potential swappers with an idea of what the
                        book is about.
                    </p>
                </div>
                <div className="bg-[#E4E4E4] w-full h-[1px] my-5"></div>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-base text-black font-medium font-poppins">More from this user</h1>
                    <Button className="text-primary underline font-poppins font-normal text-sm">See all</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {/* {Array.from({ length: 4 }, (_, index) => <BookCard key={index} />)} */}
                </div>
            </div>
            <div className="h-16 flex items-center gap-5 justify-between text-xs font-normal px-6 fixed bottom-0  bg-white w-full" style={{
                boxShadow:"0px 0px 1px 0px #33333345"
            }}>
                <div>
                    <p className="text-xs font-poppins">
                        Offered by
                    </p>
                    <h3 className="text-sm font-poppins underline">Raisa Hossain</h3>
                </div>
                <div>
                    <Button className="bg-primary text-white w-full px-6 py-3 font-poppins font-medium rounded-md">Request Swap</Button>
                </div>
            </div>
        </div>
    );
}
