import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoute } from "~/enums/app-route";
import { authService } from "~/services/auth-service";
import { handleError } from "~/utils/error-handler";

import {
  SignInForm,
  type SignInData,
} from "./components/sign-in-form/sign-in-form";
import {
  SignUpForm,
  type SignUpData,
} from "./components/sign-up-form/sign-up-form";
import { Loader } from "~/components/loader/loader";

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSignInSubmit = async (data: SignInData) => {
    setLoading(true);
    try {
      await authService.login(data.email, data.password);
      navigate(AppRoute.DASHBOARD);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (data: SignUpData) => {
    setLoading(true);
    try {
      await authService.register(data.email, data.password, data.name);
      navigate(AppRoute.DASHBOARD);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getScreen = (screen: string): React.JSX.Element => {
    if (screen === AppRoute.SIGN_UP) {
      return <SignUpForm onSubmit={handleSignUpSubmit} />;
    }

    return <SignInForm onSubmit={handleSignInSubmit} />;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1e56ff 0%, #88c5f3 100%)",
      }} // TODO: styles
    >
      {loading && <Loader />}

      {getScreen(location.pathname)}
    </div>
  );
};
