import review from "../../../assets/review.svg"
import Image from '../../../components/shared/Image'
export default function RatingAndReview() {
  return (
    <div className="my-6 flex flex-col gap-3 items-center justify-center h-[50vh]">
        <Image src={review} alt='review' className="w-8/12 block mx-auto"  />
        <p>No reviews yet</p>
    </div>
  )
}
