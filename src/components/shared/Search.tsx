import { MdKeyboardArrowDown } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
export default function Search() {
  return (
    <div className="w-full h-[42px] rounded-3xl bg-white border-gray border-[1px] flex items-center px-4">
      <div className="w-6 h-6 flex items-center justify-center">
        <IoIosSearch size={24} className="text-grayDark" />
      </div>
      <input
        type="text"
        placeholder="Find Books"
        className="w-full outline-none px-3 py-1 placeholder:pl-3 md:placeholder:pl-8 placeholder:text-grayDark placeholder:font-poppins placeholder:text-xs"
      />
      <div className="flex items-center justify-between gap-1 rounded-full bg-primary-light w-[106px] h-[26px] px-2 text-primary py-1">
        {" "}
        <FaLocationDot />{" "}
        <p className="font-normal text-xs font-poppins">Helsinki</p>{" "}
        <MdKeyboardArrowDown />{" "}
      </div>
    </div>
  );
}
