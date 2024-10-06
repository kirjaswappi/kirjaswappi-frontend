import foursDots from "../../../assets/foursDot.png"
import menu from "../../../assets/menu.png"
import twoDots from "../../../assets/twoDots.png"
import Button from "../../shared/Button"
import Image from '../../shared/Image'
export default function TopBar() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Image src={menu} alt='menu' />
                <h1>Fantasy Books </h1>
            </div>
            <div className="flex items-center gap-1">
                <Button className="w-8 h-8 flex items-center justify-center">
                    <Image src={twoDots} alt='twoDots' />
                </Button>
                <Button className="w-8 h-8 flex items-center justify-center bg-primary-light rounded-lg">
                    <Image src={foursDots} alt='foursDots' />
                </Button>
            </div>
        </div>
    )
}
