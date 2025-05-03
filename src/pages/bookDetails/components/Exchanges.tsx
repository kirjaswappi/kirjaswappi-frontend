import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/shared/Carousel";
import Image from "../../../components/shared/Image";
import { IExchange, ISwapConditionExchange } from "../interface";
import BookIconBlue from "../../../assets/bookIconBlue.png";
import BookIcon from "../../../assets/bookIcon.svg";
import {
  BYBOOKS,
  BYGENRES,
  GIVEAWAY,
  OPENTOOFFERS,
} from "../../../utility/ADDBOOKCONDITIONTYPE";

export default function Exchanges({
  swapCondition,
}: {
  swapCondition: ISwapConditionExchange;
}) {
  if (!swapCondition) return null;

  const conditionExchangeFn = (
    swapValues: ISwapConditionExchange
  ): Array<IExchange> => {
    switch (swapValues.conditionType) {
      case BYBOOKS:
        return swapValues.swappableBooks.map((swapBook) => ({
          type: swapValues.conditionType,
          title: swapBook.title,
          author: swapBook.author,
        }));

      case BYGENRES:
        return swapValues.swappableGenres.map((genre) => ({
          type: swapValues.conditionType,
          title: genre.name,
          author: "Any of this genre",
        }));

      case OPENTOOFFERS:
        return [
          {
            type: swapValues.conditionType,
            title: OPENTOOFFERS,
            author: "Flexible exchange",
          },
        ];

      case GIVEAWAY:
        return [
          {
            type: swapValues.conditionType,
            title: GIVEAWAY,
            author: "You will receive offers for giveaway",
          },
        ];

      default:
        return [];
    }
  };

  const condition = conditionExchangeFn(swapCondition);
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="relative"
    >
      <CarouselContent>
        {condition.map((item) => {
          return (
            <CarouselItem
              key={`${item.type}-${item.title}`}
              className={` ${
                condition.length <= 1 ? "pr-4 basis-full" : "basis-[70%]"
              }`}
            >
              <div className="relative w-full overflow-hidden h-[110px] rounded-lg bg-[#DEE7F5] flex items-center gap-3 px-[18px]">
                <Image
                  src={item.type === BYBOOKS ? BookIconBlue : BookIcon}
                  className="w-5"
                />
                <div className="w-[120px] text-left">
                  <h3 className="text-sm font-poppins leading-[18px] font-normal text-smokyBlack capitalize">
                    {item?.title}
                  </h3>
                  <p className="text-xs font-poppins font-light mt-1 text-smokyBlack">
                    {item?.type === BYBOOKS && "by"} {item?.author}
                  </p>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
