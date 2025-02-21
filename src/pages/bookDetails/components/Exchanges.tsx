import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/shared/Carousel";
import Image from "../../../components/shared/Image";

export default function Exchanges() {
  const slidersData = [
    {
      id: 1,
      title: "Harry Potter and The Order of The Phoenix",
      by:"By J. K. Rowling",
      image: "/src/assets/bookIcon.png",
    },
    {
      id: 2,
      title: "Harry Potter and The Order of The Phoenix",
      by:"By J. K. Rowling",
      image: "/src/assets/bookIcon.png",
    },
    {
      id: 3,
      title: "Harry Potter and The Order of The Phoenix",
      by:"By J. K. Rowling",
      image: "/src/assets/bookIcon2.png",
    },
  ];
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="relative"
    >
      <CarouselContent>
        {slidersData.map((slider) => {
          return (
            <CarouselItem
              key={slider?.id}
              className="basis-[200px] lg:basis-1/2"
            >
                <div className="relative w-full overflow-hidden h-[110px] rounded-lg bg-[#DEE7F5] flex items-center gap-3 px-[18px]">
                    <Image src={slider.image} />
                    <div className="w-[120px] text-left">
                        <h3 className="text-sm font-poppins leading-[18px] font-normal">{slider.title}</h3>
                        <p className="text-xs font-poppins font-light mt-1">by {slider.by}</p>
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
