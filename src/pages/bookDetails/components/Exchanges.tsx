import BookIcon from '../../../assets/bookIcon.svg';
import BookIconBlue from '../../../assets/bookIconBlue.png';
import { Carousel, CarouselContent, CarouselItem } from '../../../components/shared/Carousel';
import Image from '../../../components/shared/Image';
import { SwapType } from '../../addUpdateBook/types/enum';
import { IExchange, ISwapConditionData } from '../interface';
import { useTranslation } from 'react-i18next';

export default function Exchanges({ swapCondition }: { swapCondition: ISwapConditionData }) {
  const { t } = useTranslation();

  if (!swapCondition) return null;

  const getSwapTypeTitle = (swapType: SwapType): string => {
    switch (swapType) {
      case SwapType.BYBOOKS:
        return t('byBooks');
      case SwapType.BYGENRES:
        return t('byGenres');
      case SwapType.OPENTOOFFERS:
        return t('openForOffers');
      case SwapType.GIVEAWAY:
        return t('giveAway');
      default:
        return swapType;
    }
  };

  const swapConditionExchange = (swapConditionData: ISwapConditionData): Array<IExchange> => {
    switch (swapConditionData.swapType) {
      case SwapType.BYBOOKS:
        return swapConditionData.swappableBooks.map((swappableBook) => ({
          swapType: swapConditionData.swapType,
          title: swappableBook.title,
          value: swappableBook.author,
        }));

      case SwapType.BYGENRES:
        return swapConditionData.swappableGenres.map((swappableGenre) => ({
          swapType: swapConditionData.swapType,
          title: swappableGenre.name,
          value: t('exchange.anyOfThisGenre'),
        }));

      case SwapType.OPENTOOFFERS:
        return [
          {
            swapType: swapConditionData.swapType,
            title: getSwapTypeTitle(swapConditionData.swapType),
            value: t('exchange.flexibleExchange'),
          },
        ];

      case SwapType.GIVEAWAY:
        return [
          {
            swapType: swapConditionData.swapType,
            title: getSwapTypeTitle(swapConditionData.swapType),
            value: t('exchange.giveAwayOffers'),
          },
        ];

      default:
        return [];
    }
  };

  const condition = swapConditionExchange(swapCondition);
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="relative"
    >
      <CarouselContent>
        {condition.map((item) => {
          return (
            <CarouselItem
              key={`${item.swapType}-${item.title}`}
              className={` ${condition.length <= 1 ? 'pr-4 basis-full' : 'basis-[70%]'}`}
            >
              <div className="relative w-full overflow-hidden h-[110px] rounded-lg bg-[#DEE7F5] flex items-center gap-3 px-[18px]">
                <Image
                  src={item.swapType === SwapType.BYBOOKS ? BookIconBlue : BookIcon}
                  className="w-5"
                />
                <div className="w-[120px] text-left">
                  <h3 className="text-sm font-poppins leading-[18px] font-normal text-smokyBlack capitalize">
                    {item?.title}
                  </h3>
                  <p className="text-xs font-poppins font-light mt-1 text-smokyBlack">
                    {item?.swapType === SwapType.BYBOOKS && t('by')} {item?.value}
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
