import { CiLocationOn } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "./Image";
import searchIcon from "../../assets/searchIcon.png"
export default function Search() {
  return (
    <div className='w-full h-[42px] rounded-3xl bg-white border-gray border-[1px] flex items-center px-4'>
        <div className="flex items-center justify-between gap-1 rounded-full bg-primary-light w-[106px] h-[26px] px-2 text-primary"> <CiLocationOn/> <p className="font-normal text-sm font-poppins">Helsinki</p> <MdKeyboardArrowDown/> </div>
        <input type="text" placeholder="Search here" className="w-full outline-none px-3 py-1" />
        <Image src={searchIcon} alt="Search..."  />
    </div>
  )
} 
