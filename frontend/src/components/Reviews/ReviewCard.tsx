import { Box, Avatar, Typography, Rating, Button } from "@mui/material";
import { IReview } from "../../interfaces";
import { formatDatetime } from "../../utils/helpers";

interface ReviewCardProps {
  review: IReview;
  showActions?: boolean;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function ReviewCard({
  review,
  showActions,
  onUpdate,
  onDelete,
}: ReviewCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: 2,
        borderRadius: 1,
        marginBottom: 3,
      }}
      key={review.id}
    >
      <Box>
        <Box
          style={{
            display: "flex",
            gap: "0.5rem",
            width: "fit-content",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Avatar src={review.user.profilePic} alt="" />
          <Typography sx={{ fontWeight: "bold" }}>
            {review.user.username}
          </Typography>
        </Box>
        <Rating
          value={review.rating}
          readOnly
          size="small"
          sx={{
            marginTop: 1,
          }}
        />
      </Box>
      <Box>
        <Typography variant="h5">{review.title}</Typography>
        <Typography >{review.comment}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{
            display: "block",
          }}
        >
          Publicada: {formatDatetime(review.createdAt)}
        </Typography>
        {review.updatedAt && (
          <Typography variant="caption">Editada: {formatDatetime(review.updatedAt)}</Typography>
        )}
      </Box>
      {showActions && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginTop: 1,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={onUpdate}
          >
            Alterar
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={onDelete}
          >
            Excluir
          </Button>
        </Box>
      )}
    </Box>
  );
}
