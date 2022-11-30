import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LinkRouter } from "../../../components";
import { FormInputSecret } from "../../../components/Form/FormInputSecret";
import { FormInputText } from "../../../components/Form/FormInputText";
import { useYupValidationResolver } from "../../../hooks/useYupValidationResolver";
import { PASSWORD_RULES } from "../constants/password.constants";
import { useFacadeSubmitPasswordReset } from "../hooks/useFacadeSubmitPasswordReset";

type ResetPasswordForm = {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  code: yup.string().required("Le code de vérification est requis."),
  password: yup
    .string()
    .min(
      PASSWORD_RULES.MIN_LENGTH,
      `Le mot de passe doit comporter au moins ${PASSWORD_RULES.MIN_LENGTH} charactères.`
    )
    .max(
      PASSWORD_RULES.MAX_LENGTH,
      `Le mot de passe doit contenir ${PASSWORD_RULES.MAX_LENGTH} charactères maximum.`
    )
    .required("Le mot de passe est requis."),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passes ne correspondent pas."
    ),
});

const useResetPasswordResolver = () =>
  useYupValidationResolver(validationSchema);

export const ResetPasswordContent = () => {
  const theme = useTheme();
  const { onSubmitPasswordReset, error } = useFacadeSubmitPasswordReset();

  const resolver = useResetPasswordResolver();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ResetPasswordForm>({
    resolver,
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    await onSubmitPasswordReset(data.email, data.code, data.password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        New password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInputText
              name="email"
              control={control}
              label="Email"
              required
              fullWidth
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInputText
              name="code"
              control={control}
              label="Code de confirmation"
              required
              fullWidth
              autoComplete="current-password"
              error={!!errors.code}
              helperText={errors.code?.message}
            ></FormInputText>
          </Grid>
          <Grid item xs={12}>
            <FormInputSecret
              name="password"
              control={control}
              label="Mot de passe"
              required
              fullWidth
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
            ></FormInputSecret>
          </Grid>
          <Grid item xs={12}>
            <FormInputSecret
              name="confirmPassword"
              control={control}
              label="Confirmation de mot de passe"
              required
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            ></FormInputSecret>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          New password
        </Button>
        {error && (
          <Typography color={theme.palette.error.main}>
            {error.message}
          </Typography>
        )}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <LinkRouter to="/auth/sign-in" variant="body2">
              Already have an account? Sign in
            </LinkRouter>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResetPasswordContent;