import {
  Avatar,
  Box,
  Rating,
  TextField,
  Typography
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../hooks";
import { IFormReview, IReview } from "../../interfaces";
import { createReview, updateReview } from "../../service/api";
import CloseButton from "../CloseButton";
import Form from "../Form";

interface ReviewFormProps {
  productId: number;
  origReview?: IReview;
  onUpdate: () => void;
  onCancel: () => void;
}

export default function ReviewForm({
  productId,
  origReview,
  onUpdate,
  onCancel,
}: ReviewFormProps) {
  const [formReview, setFormReview] = useState<IFormReview>({
    userId: 0,
    title: "",
    comment: "",
    rating: 1,
  });
  const { user } = useUserContext();
  const isUpdating = Boolean(origReview);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    userId: number
  ) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        if (!origReview) return;

        await updateReview(origReview.id, {
          ...formReview,
          userId,
        });
      } else {
        await createReview(
          {
            ...formReview,
            userId,
          },
          productId
        );
      }
      onUpdate();
    } catch (error) {
      alert(`Erro ao criar análise: ${(error as AxiosError).message}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormReview((prevFormReview) => {
      return {
        ...prevFormReview,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (!origReview) return;

    setFormReview({
      userId: origReview.user.id,
      title: origReview.title,
      comment: origReview.comment,
      rating: origReview.rating,
    });
  }, [origReview]);

  return (
    <>
      {user && (
        <Box
          sx={{
            paddingBlock: "1rem",
          }}
        >
          <Form
            onSubmit={(e) => handleSubmit(e, user.id)}
            style={{
              alignItems: "left",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  width: "fit-content",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Avatar
                  src={user.profilePic}
                  alt=""
                  slotProps={{ img: { loading: "lazy" } }}
                />
                <Typography sx={{ fontWeight: "bold" }}>
                  {user.username}
                </Typography>
              </Box>
              {isUpdating && <CloseButton onClick={onCancel} />}
            </Box>
            <Rating
              value={formReview.rating}
              name="rating"
              size="small"
              onChange={(_, value) =>
                setFormReview({ ...formReview, rating: value || 0 })
              }
            />
            <TextField
              label="Título"
              name="title"
              value={formReview.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Comentário"
              name="comment"
              value={formReview.comment}
              onChange={handleChange}
              multiline
              rows={5}
              required
            />
            <Form.Actions>
              <Form.SubmitButton>
                {isUpdating ? "Alterar" : "Publicar"}
              </Form.SubmitButton>
            </Form.Actions>
          </Form>
        </Box>
      )}
    </>
  );
}
