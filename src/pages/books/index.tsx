import BookCard from "../../components/shared/BookCard";
import BookSkeleton from "../../components/shared/skeleton/BookSkeleton";
import { useGetAllBooksQuery } from "../../redux/feature/book/bookApi";
import { goToTop } from "../../utility/helper";
import { IBook } from "./interface";

export default function Books() {
    const { data: booksData, isLoading } = useGetAllBooksQuery(undefined);
    goToTop();
    return (
        <section>
            <div className="container min-h-[80vh]">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {isLoading
                        ? Array.from({ length: 10 }, (_, index) => (
                              <BookSkeleton key={index} />
                          ))
                        : booksData &&
                          booksData?.map((book: IBook, index: number) => (
                              <BookCard key={index} book={book} />
                          ))}
                </div>
            </div>
        </section>
    );
}
