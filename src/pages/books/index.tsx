import { useCallback, useEffect, useRef, useState } from "react";
import BookCard from "../../components/shared/BookCard";
import BookSkeleton from "../../components/shared/skeleton/BookSkeleton";
import { useGetAllBooksQuery } from "../../redux/feature/book/bookApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { goToTop } from "../../utility/helper";
import { IBook } from "./interface";
import { setPageNumber } from "../../redux/feature/filter/filterSlice";
export default function Books() {
  const observer = useRef<IntersectionObserver>();
  const [books, setBooks] = useState([]);
  const { filter } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, isFetching } = useGetAllBooksQuery(filter, {
    refetchOnMountOrArgChange: false,
  });

  // <=======Fetch data store in state=======>
  useEffect(() => {
    if (data?._embedded?.books) {
      setBooks((prevBooks) =>
        filter.pageNumber === 0
          ? data?._embedded?.books
          : [...prevBooks, ...data?._embedded?.books]
      );
    }
  }, [data?._embedded?.books, filter.pageNumber]);

  // <======= Reset page number =======>
  useEffect(() => {
    goToTop();
    dispatch(setPageNumber(0));
    setBooks([]);
  }, [
    filter.search,
    filter.genre.join(","),
    filter.condition.join(","),
    filter.language.join(","),
  ]);

  // <======= Intersection observe =======>
  const lastBookRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          data != null &&
          filter.pageNumber + 1 < data.page.totalPages
        ) {
          dispatch(setPageNumber(filter.pageNumber + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, data, filter.pageNumber]
  );
  const isInitialLoading = isFetching || isLoading;

  if (isError) return <p>Something went wrong</p>;
  return (
    <section>
      <div className="container min-h-[80vh]">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2">
          {books.map((book: IBook, idx: number) => {
            if (idx === books.length - 1) {
              return (
                <div ref={lastBookRef} key={idx}>
                  <BookCard book={book} />
                </div>
              );
            }
            return <BookCard book={book} key={idx} />;
          })}
          {isInitialLoading &&
            Array.from({ length: 12 }, (_, index) => (
              <BookSkeleton key={index} />
            ))}
        </div>
      </div>
    </section>
  );
}
