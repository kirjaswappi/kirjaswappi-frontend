import { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import filterIcon from '../../assets/filterBlue.png';
import sortIcon from '../../assets/sorticon.png';
import useDebounce from '../../hooks/useDebounce';
import { setSearch } from '../../redux/feature/filter/filterSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { cn } from '../../utility/cn';
import Image from './Image';
import Input from './Input';
export default function SearchBar({
  isShowFilterIcon = true,
  isShowSortingIcon = true,
  className,
}: {
  className?: string;
  isShowFilterIcon?: boolean;
  isShowSortingIcon?: boolean;
}) {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();
  const {
    filter: { search },
  } = useAppSelector((state) => state.filter);
  const queryValue = useDebounce(query, 300);

  useEffect(() => {
    dispatch(setSearch(queryValue));
  }, [queryValue]);
  console.log(search);
  return (
    <div className="flex items-center justify-between gap-2">
      {isShowFilterIcon && (
        <div className="w-11 h-10 rounded-2xl flex items-center justify-center bg-primary-light">
          <Image src={filterIcon} alt="Filter Icon" className="w-6" />
        </div>
      )}
      <div
        className={cn(
          'w-[78%] h-[42px] rounded-3xl bg-white border-gray border-[1px] flex items-center px-4',
          className,
        )}
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <IoIosSearch size={24} className="text-grayDark" />
        </div>
        <Input
          type="text"
          placeholder="Find Books"
          className="w-full outline-none border-none px-3 bg-white h-[40px]"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <div className="flex items-center justify-between gap-1 rounded-full bg-primary-light w-[106px] h-[26px] px-2 text-primary py-1">
          {' '}
          <FaLocationDot className="text-xs md:text-sm" />{' '}
          <p className="font-normal text-sx md:text-sm font-poppins">Helsinki</p>{' '}
          <MdKeyboardArrowDown />{' '}
        </div>
      </div>
      {isShowSortingIcon && (
        <div className="w-11 h-10 rounded-2xl flex items-center justify-center bg-primary-light">
          <Image src={sortIcon} alt="Sort Icon" className="w-6" />
        </div>
      )}
    </div>
  );
}
