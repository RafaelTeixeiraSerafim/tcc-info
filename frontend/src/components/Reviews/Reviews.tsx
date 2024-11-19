import { Box } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks";
import { IProduct, IReview } from "../../interfaces";
import {
  deleteReview,
  fetchBoughtProduct,
  fetchReviews,
} from "../../service/api";
import PageSubtitle from "../PageSubtitle";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface ReviewsProps {
  productId: number;
}

export default function Reviews({ productId }: ReviewsProps) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [userReview, setUserReview] = useState<IReview | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [boughtProduct, setBoughtProduct] = useState<IProduct | null>(null);

  const hasBoughtProduct = Boolean(boughtProduct);

  const { user } = useUserContext();

  const getBoughtProduct = async (productId: number, userId: number) => {
    try {
      const boughtProduct = await fetchBoughtProduct(productId, userId);
      setBoughtProduct(boughtProduct);
    } catch (error) {
      alert(
        `Erro ao checar se usuário já comprou o produto: ${(error as AxiosError).message}`
      );
    }
  };

  const handleDeleteUserReview = async () => {
    if (!userReview) return;

    try {
      await deleteReview(userReview.id);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== userReview.id)
      );
      setUserReview(null);
    } catch (error) {
      alert(`Erro ao excluir a análise: ${(error as AxiosError).message}`);
    }
  };

  const handleUpdateUserReview = () => setIsUpdating(true);

  const getReviews = async (productId: number) => {
    try {
      const reviews = await fetchReviews(productId);
      setReviews(reviews);
    } catch (error) {
      alert(`Erro ao pegar análises: ${(error as AxiosError).message}`);
    }
  };

  const handleFormUpdate = () => {
    setIsUpdating(false);
    getReviews(productId);
  };

  useEffect(() => {
    getReviews(productId);
  }, [productId]);

  useEffect(() => {
    const review = reviews.find((review) => review.user.id === user?.id);
    if (review) setUserReview(review);
  }, [reviews, user]);

  useEffect(() => {
    if (!user) return;
    getBoughtProduct(productId, user.id);
  }, [productId, user]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "5rem",
      }}
    >
      <PageSubtitle>Avaliações</PageSubtitle>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}>
        {hasBoughtProduct && (!userReview || isUpdating) && (
          <ReviewForm
            productId={productId}
            onUpdate={handleFormUpdate}
            origReview={userReview || undefined}
            onCancel={() => setIsUpdating(false)}
          />
        )}
        <ReviewList
          reviews={reviews}
          userReview={userReview || undefined}
          onDelete={handleDeleteUserReview}
          onUpdate={handleUpdateUserReview}
        />
      </Box>
    </Box>
  );
}
