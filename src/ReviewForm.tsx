import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AppDispatch } from "./moviesStore";
import { getReview, getSubmitReviewError, getSubmitReviewLoading, resetSubmitReviewError, resetSubmitReviewSuccess, submitReview } from "./moviesReducer";

export const ReviewForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [review, setReview] = useState<string>('');
    const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
    const loading = useSelector(getSubmitReviewLoading);
    const submitReviewError = useSelector(getSubmitReviewError);
    const reviewResponse = useSelector(getReview);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(resetSubmitReviewError());
        dispatch(resetSubmitReviewSuccess());
        if (event.target.value.length > 100) {
            setMaxLengthError(true);
        } else {
            setMaxLengthError(false);
            setReview(event.target.value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(submitReview(review));
    };

    return (
        <>
            <Typography variant="body1" sx={{marginBottom: '20px'}}>Please leave a review below</Typography>
            <form onSubmit={handleSubmit}>
                <TextField id="review"
                    label="Review"
                    variant="outlined"
                    multiline
                    minRows={4}
                    onChange={onInputChange}
                    error={maxLengthError}
                    helperText={maxLengthError ? "Review must be less than 100 characters" : ""}
                    sx={{width: '100%', backgroundColor: 'white'}}
                />
                {submitReviewError && <Typography variant="body1" sx={{color: 'red'}}>
                    Oh no! Something went wrong - please try again later.
                </Typography>}
                {reviewResponse && <Typography variant="body1" sx={{color: 'green'}}>
                    {reviewResponse}
                </Typography>}
                <LoadingButton variant="contained"
                    type="submit"
                    sx={{width: '150px', marginY: '20px'}}
                    disabled={maxLengthError || !review.length}
                    loading={loading}
                >
                    Submit
                </LoadingButton>
            </form>
        </>
    )
};