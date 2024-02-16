import { useDispatch } from 'react-redux'
import { deleteReview } from '../features/reviews/reviewSlice'

function ReviewItem({ review }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(review.createdAt).toLocaleString('en-US')}</div>
      <h2>{review.text}</h2>
      <button onClick={() => dispatch(deleteReview(review._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default ReviewItem