import axios from 'axios'

const API_URL = '/api/reviews/'

// Create new review
const createReview = async (reviewData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, reviewData, config)

    return response.data
}

// Get user reviews
const getReviews = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)
    
    return response.data
}

// Delete user goal
const deleteReview = async (reviewId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + reviewId, config)
  
    return response.data
  }
const reviewService = {
    createReview,
    getReviews,
    deleteReview,
}

export default reviewService