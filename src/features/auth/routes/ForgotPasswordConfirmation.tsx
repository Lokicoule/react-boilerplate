import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordConfirmationForm } from "../components/ForgotPasswordConfirmationForm";
import { Layout } from "../components/Layout";
import { LOGIN_PATH } from "./Login";
import { REGISTER_PATH } from "./Register";

export const FORGOT_PASSWORD_CONFIRMATION_PATH =
  "/forgot-password-confirmation";

export const ForgotPasswordConfirmation: React.FunctionComponent = () => {
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(LOGIN_PATH);
  };

  return (
    <Layout
      title={t("auth:@forgotPasswordConfirmation.title")}
      description={t("auth:@forgotPasswordConfirmation.description")}
    >
      <ForgotPasswordConfirmationForm onSuccess={handleSuccess} />
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mt: 1, width: "100%" }}
      >
        <Button
          sx={{
            textTransform: "none",
          }}
          href={REGISTER_PATH}
          color="secondary"
        >
          {t("auth:@register.displayName")}
        </Button>
        <Button
          sx={{
            textTransform: "none",
          }}
          href={LOGIN_PATH}
        >
          {t("auth:@login.displayName")}
        </Button>
      </Stack>
    </Layout>
  );
};