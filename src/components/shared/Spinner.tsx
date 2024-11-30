import icon from "../../assets/offerBookIcon.png";

export default function Spinner() {
    return (
        <div><div className="relative rounded-full w-8 h-8 bg-white flex items-center justify-center shadow-md">
            <img src={icon} alt="loader" className=" animate-pulse" />
            <div className="absolute top-[2px] left-[2px] w-7 h-7 border-4 border-transparent border-t-4 border-t-primary border-r-4 border-r-white rounded-full animate-spin" />
        </div></div>
    )
}
