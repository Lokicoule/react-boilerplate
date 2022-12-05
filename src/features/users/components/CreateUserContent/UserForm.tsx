import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import { FormInputText } from "../../../../components/Form/FormInputText";
import { useEmail } from "../../../authentication";

export type UserFormProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type UserFormContentProps = {};

export const userValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Le nom ne peut contenir que des lettres")
    .required("Le prénom est requis."),
  lastName: yup.string().required("Le nom est requis."),
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  phone: yup
    .string()
    .matches(
      /^(\+33|0)[1-9]\s?(\d{2}\s?){4}$/,
      "Le numéro de téléphone est invalide"
    )
    .required("Le numéro de téléphone est requis."),
});

export const UserFormContent: React.FC<UserFormContentProps> = (props) => {
  const email = useEmail();

  const {
    control,
    formState: { errors },
  } = useFormContext<UserFormProps>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormInputText
          name="firstName"
          control={control}
          label="Prénom"
          required
          fullWidth
          autoComplete="firstName"
          autoFocus
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <FormInputText
          name="lastName"
          control={control}
          label="Nom"
          required
          fullWidth
          autoComplete="lastName"
          autoFocus
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          disabled={Boolean(email)}
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
          name="phone"
          control={control}
          label="Phone"
          required
          fullWidth
          autoComplete="phone"
          autoFocus
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
      </Grid>
    </Grid>
  );
};
