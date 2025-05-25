import { useEffect, useRef, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useMouseClick } from '../../hooks/useMouse';
import { useAppDispatch } from '../../redux/hooks';
import { setSearch } from '../../redux/feature/filter/filterSlice';
import useDebounce from '../../hooks/useDebounce';

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { clicked, reference } = useMouseClick();
  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(query, 300);

  useEffect(() => {
    inputRef.current?.focus(); // Focus when component mounts
  }, []);

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value || '';
    setQuery(newQuery);
  };

  return (
    <div ref={reference} className="relative w-full">
      <div
        className={`
        w-full h-[42px] rounded-3xl bg-white flex items-center px-4
        transition-all duration-300 ease-in-out
      `}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder="Find Books"
          className="w-full outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 border-none appearance-none [-webkit-appearance:none] [-moz-appearance:none] px-3 py-1 placeholder:pl-3 md:placeholder:pl-8 placeholder:text-grayDark placeholder:font-poppins placeholder:text-xs"
        />
        <div
          className={`
          flex items-center justify-between gap-1 rounded-full bg-primary-light w-[106px] h-[26px] px-2 text-primary py-1
          transition-all duration-300 ease-in-out
          ${isFocused ? 'opacity-50' : 'opacity-100'}
        `}
        >
          <FaLocationDot className="transition-transform duration-300 ease-in-out transform" />
          <p className="font-normal text-xs font-poppins">Helsinki</p>
          <MdKeyboardArrowDown
            className={`
            transition-transform duration-300 ease-in-out transform
            ${isFocused ? 'rotate-180' : 'rotate-0'}
          `}
          />
        </div>
      </div>

      {clicked && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col gap-2"></div>
        </div>
      )}
    </div>
  );
}
