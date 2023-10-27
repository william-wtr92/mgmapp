import { Form, Formik } from "formik"
import React, { Dispatch, SetStateAction } from "react"
import FormikField from "../FormikField"
import Button from "../Button"
import styles from "@/styles/components/FormikForm.module.css"
import { ModalType } from "@/types/modal/ModalType"
import useGetUsers from "@/services/users/getUsers"
import { KeyedMutator } from "swr"

type Props = {
  formTitle: string
  initialValues: any
  validationSchema: any
  handleSubmit: (values: any) => Promise<[null, boolean] | [any]>;
  submitBtnText: string
  setModalType: Dispatch<SetStateAction<ModalType>>,
  updateData: () => void;
}

const FormikForm = (props: Props) => {
  const {
    formTitle,
    initialValues,
    validationSchema,
    handleSubmit,
    submitBtnText,
    setModalType,
    updateData
  } = props


  const handleSubmitActions = async (values: any, handleReset: any) => {
    await handleSubmit(values)
    setModalType("")
    updateData();
    handleReset();
  }

  return (
    <>
      <p className={styles.formTitle}>{formTitle}</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => console.log("datas submitted")}
      >
        {({ dirty, isValid, values, handleReset }) => {
          return (
            <Form className={styles.form}>
              {initialValues &&
                Object.entries(initialValues).map(([key, value], index) => {
                  const type = typeof value

                  return (
                    <FormikField
                      key={index}
                      type={type}
                      placeholder={key}
                      name={key}
                      label={key}
                      value={value}
                    />
                  )
                })}

              <Button
                label={submitBtnText}
                disabled={!(isValid && dirty)}
                onClickAction={() => {
                  handleSubmitActions(values, handleReset)
                }}
              />
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default FormikForm
