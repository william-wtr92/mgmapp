import * as yup from "yup"


export const addProductInitialValues = {
  name: "",
  desc: "",
  stock: 0,
  categoryId: 1
}

export const addProductValidationSchema = yup.object().shape({
  name: yup.string().required("Veuillez remplir le champ").min(3, "Veuillez remplir le champ"),
  desc: yup.string().required("Veuillez remplir le champ").min(3, "Veuillez remplir le champ"),
  stock: yup.number().required("Veuillez remplir le champ").min(0, "Veuillez remplir le champ correctement"),
  categoryId: yup.number().required("Veuillez remplir le champ").min(0, "Veuillez remplir le champ correctement"),
})