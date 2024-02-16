import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createReview } from '../features/reviews/reviewSlice'

function ReviewForm() {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createReview({ text }))
        setText('')
    }
    return (
        <section className='form'>
            <form onSubmit={onSubmit}>

                <div className='form-group'>
                    <label htmlFor='text'>Review</label>
                    <input
                        type='text'
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                        Add Review
                    </button>
                </div>

            </form>
        </section>
    )
}

export default ReviewForm