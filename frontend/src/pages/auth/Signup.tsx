import SignupForm from "../../components/SignupForm";
import AuthCard from "../../components/AuthCard";
import { useSearchParams } from "react-router-dom";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const callback = searchParams.get("callback") || undefined;

  return (
    <AuthCard>
      <SignupForm callback={callback} />
    </AuthCard>
  );
}
