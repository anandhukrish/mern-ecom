import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { loginFormControls } from "../../config";
import { login } from "../../store/auth/authSlice";
import { toast } from "sonner";
import { useAppDispatch } from "../../store/hooks/hooks";
import { type Login } from "../../types/user.types";
const initialState: Login = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(login(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message);
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
