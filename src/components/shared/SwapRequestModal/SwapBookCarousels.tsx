/* eslint-disable @typescript-eslint/no-explicit-any */
import { Carousel, CarouselContent, CarouselItem } from '../Carousel';
import Image from '../Image';

export default function SwapBookCarousels({
  swapBook,
  handleSelectBookForSwapRequest,
}: {
  swapBook: any;
  handleSelectBookForSwapRequest: (item: any) => void;
}) {
  if (!swapBook) return null;
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="relative"
    >
      <CarouselContent>
        {swapBook.map(
          (item: { title: string; coverPhotoUrl: string | undefined; author: string }) => {
            return (
              <CarouselItem
                key={`${item.title}`}
                className={` ${swapBook.length <= 1 ? 'pr-4 basis-full' : 'basis-[120px]'}`}
                onClick={() => handleSelectBookForSwapRequest(item)}
              >
                <div className="max-w-[120px] w-[120px] rounded-[8px] p-2 border border-primary">
                  <div className="w-[104px] h-[120px] object-cover bg-center bg-cover border border-[#E5E5E5] rounded-lg">
                    <Image
                      className="mx-auto w-full h-full object-cover rounded-lg"
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
          },
        )}
      </CarouselContent>
    </Carousel>
  );
}
