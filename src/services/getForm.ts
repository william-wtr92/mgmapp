import {
  addProductType,
  addUserType,
  updateProductType,
  updateUserType,
} from "@/types/modal/ModalType"
import {
  addProductInitialValues,
  addProductValidationSchema,
} from "@/types/product/InitialValues"
import {
  addUserInitialValues,
  addUserValidationSchema,
} from "@/types/user/InitialValues"

const getFormValues = (type: string) => {
  switch (type) {
    case addProductType:
      return {
        initialValues: addProductInitialValues,
        validationSchema: addProductValidationSchema,
        // eslint-disable-next-line no-console
        handleSubmit: () => console.log("test"),
        submitBtnText: "Ajouter",
      }

    case updateProductType:
      return {
        initialValues: addProductInitialValues,
        validationSchema: addProductValidationSchema,
        // eslint-disable-next-line no-console
        handleSubmit: () => console.log("test"),
        submitBtnText: "Update",
      }

    case addUserType:
      return {
        initialValues: addUserInitialValues,
        validationSchema: addUserValidationSchema,
        // eslint-disable-next-line no-console
        handleSubmit: () => console.log("test"),
        submitBtnText: "Add",
      }

    case updateUserType:
      return {
        initialValues: addUserInitialValues,
        validationSchema: addUserValidationSchema,
        // eslint-disable-next-line no-console
        handleSubmit: () => console.log("test"),
        submitBtnText: "Update",
      }

    // eslint-disable-next-line no-empty
    default: {
    }
  }
}

export default getFormValues
