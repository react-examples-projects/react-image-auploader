const yup = require("yup");
const passwordScheme = yup
  .string()
  .min(6, "Mínimo 6 carácteres para la contraseña")
  .max(50, "Máximo 50 carácteres para la contraseña")
  .required("La contraseña es obligatoria");

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
      .required("Las imagenes debe ser obligatoria"),
  }),
});

const requireIdValidation = yup.object({
  params: yup.object({
    id: yup
      .string()
      .typeError("El indenficador debe ser un ObjectId")
      .required("El identificador es requerido"),
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
    imageId: yup
      .string()
      .required("El identificador de la imágen es obligatorio"),
  }),
});

module.exports = {
  loginSchemaValidation,
  perfilPhotoSchemaValidation,
  passwordChangeValidation,
  uploadImageValidation,
  requireIdValidation,
  updateImageValidation,
  favoriteImageValidation,
};
