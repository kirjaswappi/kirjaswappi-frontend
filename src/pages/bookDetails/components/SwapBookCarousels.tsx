import { Carousel, CarouselContent, CarouselItem } from "../../../components/shared/Carousel";
import Image from "../../../components/shared/Image";
import { IB } from "../interface";

export default function SwapBookCarousels({swapBook}:{swapBook: IB[]}) {
  if(!swapBook) return null;
  console.log(swapBook)
  return (
    <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent>
            {swapBook.map((item) => {
              return (
                <CarouselItem
                  key={`${item.title}`}
                  className={` ${
                    swapBook.length <= 1 ? "pr-4 basis-full" : "basis-[70%]"
                  }`}
                >
                  <div className="max-w-[120px] rounded-[8px] p-2 border">
                  <div className=" object-cover bg-cover">
                    <Image
                      className="mx-auto w-[104px] h-[120px] object-cover rounded-lg"
                      src={item.coverPhotoUrl}
                      alt={`'Your favorite book'`}
                    />
                  </div>
                  <div>
                    <h1 className="font-medium text-black text-sm leading-none mb-1 font-poppins truncate ">
                      {"Man’s Search for Meaning Man’s Search for Meaning"}
                    </h1>
                    <p className="text-black font-light text-xs font-poppins">
                      by {"Viktor Frankl's"}
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

  )
}
