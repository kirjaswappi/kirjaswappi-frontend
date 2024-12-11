import BookCard from '../../../components/shared/BookCard'

export default function BookList() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Array.from({ length: 4 }, (_, index) => (
                <BookCard key={index} isProfile />
            ))}
        </div>
    )
}
