import { useState } from "react";
import plusIcon from "../../../assets/plusIcon.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import SideDrawer from "./SideDrawer";



export default function AddGenre() {
    const [genre, _setGenre] = useState([
        { id: 1, title: "Good", active: false },
        { id: 2, title: "Bad", active: true },
        { id: 3, title: "Very Good", active: false },
    ])

    // const handleAddGenre = (id: number) => {
        
    // }

    // 
    const onSave = () => {
        console.log('click')
    }
    return (
        <SideDrawer title="Genre" isShowSave={true} onSave={onSave}>
            <div className="flex flex-col gap-2 pb-4 mt-8">
                {genre.map(genreItem => <div key={genreItem.id} className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
                    <h3 className="font-sofia text-sm font-light">{genreItem.title}</h3>
                    <Button  >
                        <Image src={plusIcon} alt="close" className="h-auto" />
                    </Button>
                </div>)}
                {/* {Array.from({ length: 6 }, (_, index) => <div key={index} className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
                    <h3 className="font-sofia text-sm font-light">Biography</h3>
                    <Button onClick={() => handleAddGenre(index)} >
                        <Image src={plusIcon} alt="close" className="h-auto" />
                    </Button>
                </div>)} */}
            </div>
        </SideDrawer>
    )
}
