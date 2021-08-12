import * as yup from "yup";

export async function validateLogin(form) {
  let loginSchema = yup.object({
    email: yup
      .string()
      .email("El campo debe ser un correo válido")
      .required("El campo correo es obligatorio"),

    password: yup
      .string()
      .min(6, "Mínimo 6 carácteres para la contraseña")
      .required("El campo contraseña es obligatorio"),
  });

  return await loginSchema.validate({
    email: form.email.value,
    password: form.password.value,
  });
}

export async function validateSignup(form) {
  if (form.password.value !== form.passwordConfirm.value) {
    throw new Error("Las contraseñas no coinciden");
  }
  let signupSchema = yup.object({
    name: yup
      .string()
      .min(4, "Mínimo 4 carácteres para el nombre")
      .required("El campo contraseña es obligatorio"),
    email: yup
      .string()
      .email("El campo debe ser un correo válido")
      .required("El campo correo es obligatorio"),

    password: yup
      .string()
      .min(6, "Mínimo 6 carácteres para la contraseña")
      .required("El campo contraseña es obligatorio"),
  });

  return await signupSchema.validate({
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
  });
}
