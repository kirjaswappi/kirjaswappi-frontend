import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/shared/Carousel";
import Image from "../../../components/shared/Image";
import { IB } from "../interface";

export default function SwapBookCarousels({
  swapBook,
  handleSelectBookForSwapRequest,
}: {
  swapBook: IB[];
  handleSelectBookForSwapRequest: (item: IB) => void;
}) {
  if (!swapBook) return null;
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="relative"
    >
      <CarouselContent className="mr-4">
        {swapBook.map((item) => {
          return (
            <CarouselItem
              key={`${item.title}`}
              className={`${
                swapBook.length <= 1 ? "pr-4 basis-full" : "basis-[130px]"
              }`}
              onClick={() => handleSelectBookForSwapRequest(item)}
            >
              <div className="w-[120px] rounded-[8px] p-2 border border-primary">
                <div className="h-[120px] object-cover bg-center bg-cover border">
                  <Image
                    className="mx-auto w-full h-full object-contain  rounded-lg"
                    src={item.coverPhotoUrl}
                    alt={`${item.title}`}
                  />
                </div>
                <div>
                  <h1 className="font-medium text-black text-xs leading-none mt-2 mb-1 font-poppins truncate ">
                    {item.title}
                  </h1>
                  <p className="text-black font-light text-[10px] font-poppins truncate">
                    by {item.author}
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
