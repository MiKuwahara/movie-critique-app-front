import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReviewForm from '../components/ReviewForm'
import ReviewItem from '../components/ReviewItem'
import Spinner from '../components/Spinner'
import { getReviews, reset2 } from '../features/reviews/reviewSlice'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { reviews, isLoading, isError, message } = useSelector(
        (state) => state.reviews
    )

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
            //return
        } else {
            dispatch(getReviews())
        }

        return () => {
            dispatch(reset2())
        }
        // dispatch(reset())
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <p>Reviews Dashboard</p>
            </section>

            <ReviewForm />

            <section className='content'>
                {reviews.length > 0 ? (
                    <div className='goals'>
                        {reviews.map((review) => (
                        <ReviewItem key={review._id} review={review} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any reviews</h3>
                )}
            </section>
        </>
    )
}

export default Dashboard