import * as yup from "yup"

export const addUserInitialValues = {
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  roleId: 1,
}

export const addUserValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Veuillez remplir le champ")
    .min(3, "Veuillez remplir le champ"),
  password: yup
    .string()
    .required("Veuillez remplir le champ")
    .min(3, "Veuillez remplir le champ"),
  firstname: yup
    .string()
    .required("Veuillez remplir le champ")
    .min(3, "Veuillez remplir le champ"),
  lastname: yup
    .string()
    .required("Veuillez remplir le champ")
    .min(3, "Veuillez remplir le champ"),
  roleId: yup
    .number()
    .required("Veuillez remplir le champ")
    .min(0, "Veuillez remplir le champ correctement"),
})
