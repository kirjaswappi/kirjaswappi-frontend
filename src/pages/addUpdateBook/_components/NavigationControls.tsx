import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import NextArrowIcon from "../../../assets/arrow1.png";
import PrevArrowIcon from "../../../assets/arrow2.png";
import { cn } from "../../../utility/cn";

interface NavigationControlsProps {
  activeStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  isSubmitting: boolean;
  className?: string;
}
const NavigationControls = ({
  activeStep,
  totalSteps,
  onPrev,
  onNext,
  isSubmitting,
  className,
}: NavigationControlsProps) => (
  <div className={cn("mt-4 flex justify-between gap-3 pb-4", className)}>
    {activeStep > 0 && (
      <Button type="button" onClick={onPrev}>
        <Image
          src={PrevArrowIcon}
          alt="Previous"
          className="bg-primary-light text-primary w-full py-4 rounded-lg border border-primary flex items-center justify-center font-poppins text-base font-medium"
        />{" "}
        Back
      </Button>
    )}

    {activeStep < totalSteps - 1 ? (
      <Button type="button" onClick={onNext}>
        Next{" "}
        <Image
          src={NextArrowIcon}
          alt="Next"
          className="bg-primary text-white w-full py-4 rounded-lg flex items-center justify-center  font-poppins text-base font-medium"
        />
      </Button>
    ) : (
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white w-full py-4 rounded-lg"
      >
        {isSubmitting ? "Loading..." : "Confirm"}
      </Button>
    )}
  </div>
);
export default NavigationControls;
