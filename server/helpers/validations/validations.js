const yup = require("yup");
const passwordScheme = yup
  .string()
  .min(6, "Mínimo 6 carácteres para la contraseña")
  .max(50, "Máximo 50 carácteres para la contraseña")
  .required("La contraseña es obligatoria");

const idSchema = yup
  .string()
  .typeError("El indenficador debe ser un ObjectId")
  .required("El identificador es requerido");

const loginSchemaValidation = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email("El correo debe ser válido, ejemplo: example@domain.es")
      .required("El correo es obligatorio"),
    password: yup
      .string()
      .min(6, "Mínimo 6 carácteres para la contraseña")
      .required("La contraseña es obligatoria"),
  }),
});

const signupSchemaValidation = yup.object({
  body: yup.object({
    name: yup
      .string()
      .min(4, "Mínimo 6 carácteres para el nombre")
      .max(20, "Máximo 20 carácteres para el nombre")
      .required("El nombre es obligatorio"),
    email: yup
      .string()
      .email("El correo debe ser válido, ejemplo: example@domain.es")
      .required("El correo es obligatorio"),
    password: yup
      .string()
      .min(6, "Mínimo 6 carácteres para la contraseña")
      .required("La contraseña es obligatoria"),
    passwordConfirm: passwordScheme.test(
      "passwordChangeValidation",
      "Las contraseñas no coinciden",
      function (value) {
        return this.parent.password === value;
      }
    ),
  }),
});

const perfilPhotoSchemaValidation = yup.object({
  files: yup.object({
    perfil_photo: yup
      .object({
        data: yup.string().required(),
      })
      .required("La imágen debe ser obligatoria"),
    // .test("fileSize", (file) => isFileTooLarge(file.size))
    // .test("fileType", (file) => isValidFileType(file.type)),
  }),
});

const passwordChangeValidation = yup.object({
  body: yup.object({
    password: passwordScheme,
    passwordConfirm: passwordScheme.test(
      "passwordChangeValidation",
      "Las contraseñas no coinciden",
      function (value) {
        return this.parent.password === value;
      }
    ),
  }),
});

const uploadImageValidation = yup.object({
  body: yup.object({
    title: yup.string(),
    "tags[]": yup.lazy((value) =>
      typeof value === "string" ? yup.string() : yup.array()
    ),
  }),
  files: yup.object({
    images: yup
      .object({
        data: yup.string().required(),
      })
      .required("Las imagenes deben ser obligatoria"),
  }),
});

const requireIdValidation = yup.object({
  params: yup.object({
    id: idSchema,
  }),
});

const updateImageValidation = yup.object({
  body: yup.object({
    title: yup.string(),
    "tags[]": yup.lazy((value) =>
      typeof value === "string" ? yup.string() : yup.array()
    ),
  }),
});

const favoriteImageValidation = yup.object({
  body: yup.object({
    imageId: idSchema,
  }),
});

const addCommentValidation = yup.object({
  body: yup.object({
    content: yup
      .string()
      .max(500, "Máximo 500 carácteres para los comentarios")
      .required("El campo comentario es obligatorio"),
  }),
});

module.exports = {
  loginSchemaValidation,
  signupSchemaValidation,
  perfilPhotoSchemaValidation,
  passwordChangeValidation,
  uploadImageValidation,
  requireIdValidation,
  updateImageValidation,
  favoriteImageValidation,
  addCommentValidation,
};
