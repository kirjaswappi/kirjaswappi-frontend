import bookDetailsBg from "../../assets/bookdetailsbg.jpg";
import locationIcon from "../../assets/location-icon.png";
import rightMenu from "../../assets/rightmenu.png";
import upArrowIcon from "../../assets/upArrow.png";
import userprofile from "../../assets/userprofile.png";
import BookCard from "../../components/shared/BookCard";
import Button from "../../components/shared/Button";
import Image from "../../components/shared/Image";
import rating from "../../assets/rating.png"
import { goToTop } from "../../utility/helper";
import editIcon from "../../assets/editBlue.png"
export default function Profile() {
    goToTop()
    return (
        <div>
            <div className="absolute left-0 top-4 w-full flex justify-between px-4">
                <div className="flex items-center gap-4">
                    <h2>My profile</h2>
                </div>
                <div className="flex items-center gap-4">
                    <Image src={rightMenu} alt="icon" />
                </div>
            </div>
            <div className="w-full h-[124px] z-0">
                <Image src={bookDetailsBg} className="w-full h-full" />
            </div>
            <div className="absolute top-4/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full  bg-white">
                <Image src={userprofile} className="w-full h-full object-fill relative rounded-full" />
                <div className="w-7 h-7 bg-white cursor-pointer z-[99999999px] absolute bottom-0 right-2 rounded-full flex items-center justify-center">
                    <Image src={editIcon} alt="edit" />
                </div>
            </div>
            <div className="container mt-20">
                <div className="text-center my-5 ">
                    <h1 className="font-medium text-black text-sm leading-none mb-2 font-sofia">
                        Raisa Binte Hossain
                    </h1>
                    <p className="text-black font-light text-xs font-sofia">
                        Biography | Autobiography | Personal narrative
                    </p>
                </div>
                <div className="mt-6">
                    <Button className="bg-primary-light text-primary p-2  rounded-full text-sm font-sofia font-normal">
                        About
                    </Button>
                    <Button className="text-grayDark p-2  rounded-full text-sm font-sofia font-normal">
                        My Library
                    </Button>
                    <Button className="text-grayDark p-2  rounded-full text-sm font-sofia font-normal">
                        Rating & Reviews
                    </Button>
                </div>
                <div className="bg-[#E4E4E4] w-full h-[1px] mt-2 mb-5"></div>
                <p className="text-xs font-light font-sofia text-grayDark">
                    A brief synopsis or description of the book’s content,
                    providing potential swappers with an idea of what the
                    book is about.
                </p>
                <div className="bg-white py-2 px-5 grid grid-cols-3 my-5 rounded-2xl">
                    <div className="relative">
                        <div className="text-center after:absolute after:right-0 after:top-0 after:h-[30px] after:w-[1px] after:bg-[#E4E4E4]">
                            <p className="text-grayDark text-xs font-sofia font-normal">
                                Total Swaps
                            </p>
                            <h3 className="text-black text-xs font-normal font-sofia">
                                3
                            </h3>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="text-center flex flex-col items-center after:absolute after:right-0 after:top-0 after:h-[30px] after:w-[1px] after:bg-[#E4E4E4]">
                            <p className="text-grayDark text-xs font-sofia font-normal ">
                                Users Reviews
                            </p>
                            <h3 className="text-black text-xs font-normal font-sofia flex items-center gap-1">
                            <Image src={rating} alt="rating" /> <span className="inline-block mt-[2px]">4.3</span>
                            </h3>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-grayDark text-xs font-sofia font-normal">
                            Books Listed
                        </p>
                        <h3 className="text-black text-xs font-normal font-sofia">
                            8
                        </h3>
                    </div>
                </div>
                <div className="flex items-center gap-1 my-5">
                    <Image src={locationIcon} alt="location" />
                    <p className="text-xs font-sofia font-normal">
                        Senate Square, Helsinki
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <Image src={upArrowIcon} alt="profile" />
                    <p className="text-xs font-normal font-sofia text-black">
                        95% Positive Swaps
                    </p>
                </div>

                <div className="bg-[#E4E4E4] w-full h-[1px] my-5"></div>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-base text-black font-medium font-sofia">
                    My Library
                    </h1>
                    <Button className="text-primary underline font-sofia font-normal text-sm">
                        See all
                    </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {Array.from({ length: 4 }, (_, index) => (
                        <BookCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
