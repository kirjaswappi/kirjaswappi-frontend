import { useGetAllBooksQuery } from "../../redux/feature/book/bookApi";
import { goToTop } from "../../utility/helper";

export default function Books() {
    const { data, isError } = useGetAllBooksQuery(undefined);
    goToTop();
    if(isError) return 
    console.log(data)
    return (
        <section>
            <div className="container min-h-[80vh]">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2">
                    {/* {isLoading
                        ? Array.from({ length: 10 }, (_, index) => (
                              <BookSkeleton key={index} />
                          ))
                        : booksData &&
                          booksData?.map((book: IBook, index: number) => (
                              <BookCard key={index} book={book} />
                          ))} */}
                </div>
            </div>
        </section>
    );
}
