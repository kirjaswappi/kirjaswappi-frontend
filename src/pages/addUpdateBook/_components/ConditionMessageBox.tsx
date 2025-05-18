import byGenres from "../../../assets/3d-condition-icon-Genre.png";
import Giveaway from "../../../assets/3d-condition-icon-Giveaway.png";
import Open from "../../../assets/3d-condition-icon-Open-to-Offer.png";
import book from "../../../assets/3d-condition-icon-by-book.png";
import Image from "../../../components/shared/Image";

import { SwapType } from "../types/enum";

export default function ConditionMessageBox({
  conditionType,
}: {
  conditionType: string;
}) {
  if (!conditionType) return null;

  const conditionList: Record<string, { image: string; message: string }> = {
    [SwapType.BYGENRES]: {
      image: byGenres,
      message: "Click ‘Add’ to add your preferable genre",
    },
    [SwapType.BYBOOKS]: {
      image: book,
      message: "You will receive offers for specific books.",
    },
    [SwapType.OPENTOOFFERS]: {
      image: Open,
      message: "You will receive offers of all sorts of books",
    },
    [SwapType.GIVEAWAY]: {
      image: Giveaway,
      message: "You will receive offers for giveaway",
    },
  };


  const condition = conditionList[conditionType];


  return (
    <div className="border border-yellow bg-yellow-light flex flex-col items-center justify-center p-5 gap-2 rounded-lg ">
      <Image src={condition.image} alt={conditionType} className="h-[64px]" />
      <p className="text-smokyBlack font-poppins text-sm font-normal text-center">
        {condition.message}
      </p>
    </div>
  );
}
