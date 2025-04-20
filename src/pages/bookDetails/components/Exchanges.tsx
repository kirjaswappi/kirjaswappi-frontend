import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/shared/Carousel";
import Image from "../../../components/shared/Image";
import { IExchange, ISwapCondition } from "../interface";
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
  swapCondition: ISwapCondition;
}) {
  if (!swapCondition) return null;

  const conditionExchangeFn = (
    swapValues: ISwapCondition
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

      {/* left arrow */}
      {/* <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden lg:block">
        <CarouselPrevious className="h-[20px] w-[20px] rounded-full bg-gray-light hover:bg-gray-light">
          <ChevronLeft />
        </CarouselPrevious>
      </div> */}

      {/* right arrow */}
      {/* <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:block">
        <CarouselNext className="h-[20px] w-[20px] rounded-full bg-gray-light hover:bg-gray-light">
          <ChevronsRight />
        </CarouselNext>
      </div> */}
    </Carousel>
  );
}
