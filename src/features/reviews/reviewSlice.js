import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reviewService from './reviewService'

const initialState = {
    reviews: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Crate new review
export const createReview = createAsyncThunk(
    'reviews/create',
    async (reviewData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await reviewService.createReview(reviewData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)

        }
    }
)

// Get user reviews
export const getReviews = createAsyncThunk(
    'reviews/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await reviewService.getReviews(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)

        }
    }
)

// Delete user review
export const deleteReview = createAsyncThunk(
    'reviews/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await reviewService.deleteReview(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        reset2: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reviews.push(action.payload)
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reviews = action.payload
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteReview.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reviews = state.reviews.filter(
                    (review) => review._id !== action.payload.id
                )
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset2 } = reviewSlice.actions
export default reviewSlice.reducer