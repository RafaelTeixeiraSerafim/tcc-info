import { Box, Typography } from "@mui/material";
import { IReview } from "../../interfaces";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  reviews: IReview[];
  onDelete: () => void;
  onUpdate: () => void;
  userReview?: IReview;
}

export default function ReviewList({
  reviews,
  onDelete,
  onUpdate,
  userReview,
}: ReviewListProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {reviews.length === 0 ? (
        <Typography>
          Parece que este produto ainda não possui nenhuma análise...
        </Typography>
      ) : (
        <>
          {userReview && (
            <ReviewCard
              review={userReview}
              showActions
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          )}
          {reviews.map((review) => (
            <>
              {review.id !== userReview?.id && (
                <ReviewCard review={review} key={review.id} />
              )}
            </>
          ))}
        </>
      )}
    </Box>
  );
}
