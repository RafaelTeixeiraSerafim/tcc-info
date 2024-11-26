interface MainImageProps {
  imageUrl: string;
}

export default function MainImage({ imageUrl }: MainImageProps) {
  return <img src={imageUrl} alt="" style={{width: "100%"}} />;
}
