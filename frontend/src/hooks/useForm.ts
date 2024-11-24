export default function useForm<T extends object>() {
  const handleTextInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setForm: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const { name, value } = e.target;
    console.log({ name }, { value });

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  return { handleTextInputChange };
}
