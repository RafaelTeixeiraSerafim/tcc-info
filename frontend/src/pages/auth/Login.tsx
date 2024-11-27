import LoginForm from "../../components/LoginForm";
import AuthCard from "../../components/AuthCard";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const [searchParams] = useSearchParams();
  const callback = searchParams.get("callback") || undefined;

  return (
    <AuthCard>
      <LoginForm callback={callback} />
    </AuthCard>
  );
}
