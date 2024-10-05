import BookCard from "../../components/shared/BookCard";

export default function Books() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {Array.from({ length: 10 }, (_, index) =>  <BookCard key={index} />)}
        </div>
        
      </div>
    </section>
  )
}
