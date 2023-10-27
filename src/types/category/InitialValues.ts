import * as yup from "yup"

export const addCategoryInitialValues = {
  name: "",
}

export const addCategoryValidationSchema = yup.object().shape({
  name: yup.string().required("Veuillez remplir le champ").min(3, "Veuillez remplir le champ"),
})