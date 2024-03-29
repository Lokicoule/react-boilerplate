import { Route, Routes } from "react-router-dom";

import { Login, LOGIN_PATH } from "./Login";
import { Register, REGISTER_PATH } from "./Register";
import {
  RegisterConfirmation,
  REGISTER_CONFIRMATION_PATH,
} from "./RegisterConfirmation";
import { ForgotPassword, FORGOT_PASSWORD_PATH } from "./ForgotPassword";
import {
  ForgotPasswordSubmit,
  FORGOT_PASSWORD_SUBMIT_PATH,
} from "./ForgotPasswordSubmit";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={REGISTER_PATH} element={<Register />} />
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route
        path={REGISTER_CONFIRMATION_PATH}
        element={<RegisterConfirmation />}
      />
      <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
      <Route
        path={FORGOT_PASSWORD_SUBMIT_PATH}
        element={<ForgotPasswordSubmit />}
      />
    </Routes>
  );
};
