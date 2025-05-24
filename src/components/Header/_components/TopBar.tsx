import foursDots from '../../../assets/foursDot.png';
import Button from '../../shared/Button';
import Image from '../../shared/Image';
export default function TopBar() {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-1">
        <Button className="w-8 h-8 flex items-center justify-center bg-primary-light rounded-lg">
          <Image src={foursDots} alt="foursDots" />
        </Button>
      </div>
    </div>
  );
}
