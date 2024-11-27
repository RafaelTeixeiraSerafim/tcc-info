import { Avatar, Box, Button, Rating, Stack, Typography } from "@mui/material";
import { IReview } from "../../interfaces";
import { formatDate } from "../../utils/helpers";

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
      <Stack gap={"0.5rem"}>
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
          <Typography>{review.user.username}</Typography>
        </Box>
        <Stack direction={"row"} gap={"0.25rem"}>
          <Rating
            value={review.rating}
            readOnly
            size="small"
            sx={{
              marginTop: "0.17rem",
            }}
          />
          <Typography fontWeight={"bold"}>{review.title}</Typography>
        </Stack>
      </Stack>
      <Typography whiteSpace={"pre-wrap"}>{review.comment}</Typography>
      <Box>
        <Typography
          variant="caption"
          sx={{
            display: "block",
          }}
        >
          Avaliado em {formatDate(review.createdAt)}
        </Typography>
        {review.updatedAt && (
          <Typography variant="caption">
            Editado em {formatDate(review.updatedAt)}
          </Typography>
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
