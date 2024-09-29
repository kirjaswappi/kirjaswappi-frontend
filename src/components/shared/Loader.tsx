import "./style.css"

export default function Loader() {
    return (
        <div className="w-full h-screen bg-[#2c2c2ca0] fixed top-0 left-0 z-[99999]">
            <div className="rounded-full absolute top-[45%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
                {/* <img
                    src={loader}
                    alt="loader"
                    className="w-20 h-20 animate-[fadeInOut_2s_linear_infinite]"
                /> */}
                <div className="loader  "></div>
            </div>
        </div>
    )
}
