import React, { useEffect, useState } from "react";
import useImageInputMenu from "../../hooks/useImageInputMenu";
import { IUpdateUser } from "../../interfaces";
import ImageInputMenu from "../ImageInputMenu";
import DefaultProfileImage from "./DefaultProfileImage";
import ProfileImage from "./ProfileImage";
import ProfilePicInputContainer from "./ProfilePicInputContainer";
import ProfileImageLabel from "./ProfileImageLabel";

interface ProfilePicInputProps {
  name: string;
  setUser: React.Dispatch<React.SetStateAction<IUpdateUser>>;
  defaultImage: string;
  required?: boolean;
  label?: string;
}

export default function ProfilePicInput({
  name,
  setUser,
  defaultImage,
  required,
  label,
}: ProfilePicInputProps) {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    defaultImage || null
  );

  const { menuPosition, isOpen, handleClose, handleOpen, resetMenuPosition } =
    useImageInputMenu();

  const changeBgImage = (imageFile: File | undefined) => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const handlePhotoRemove = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setUser((prevUser) => ({
      ...prevUser!,
      [name]: {
        file: "",
      },
    }));
    resetMenuPosition();
    setPreviewImage(null);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setUser((prevUser) => ({
      ...prevUser!,
      [name]: { file: target.files[0] },
    }));
    changeBgImage(target.files[0]);
    resetMenuPosition();
  };

  useEffect(() => setPreviewImage(defaultImage), [defaultImage]);

  return (
    <ProfilePicInputContainer
      onClick={handleOpen}
      style={label ? { marginTop: "1.5rem" } : {}}
    >
      {label && <ProfileImageLabel label={label} />}
      {previewImage ? (
        <ProfileImage previewImage={previewImage} />
      ) : (
        <DefaultProfileImage />
      )}
      <ImageInputMenu
        isOpen={isOpen}
        menuPosition={menuPosition}
        onChange={handleChange}
        onClose={handleClose}
        onPhotoRemove={handlePhotoRemove}
        required={required}
      />
    </ProfilePicInputContainer>
  );
}
