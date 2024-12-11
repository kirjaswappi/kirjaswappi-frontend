import BookCard from "../../../components/shared/BookCard";
import AddBookComponent from "./AddBookComponent";

export default function MyLibrary() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <AddBookComponent />
            {Array.from({ length: 4 }, (_, index) => (
                <BookCard key={index} isProfile />
            ))}
        </div>
    );
}
