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
  handleSubmit: (values: any) => void
  submitBtnText: string
  setModalType: Dispatch<SetStateAction<ModalType>>,
  updateData?: KeyedMutator<any>;
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


  const handleSubmitActions = (values: any) => {
    handleSubmit(values)
    setModalType("")
    updateData && updateData();
  }

  return (
    <>
      <p className={styles.formTitle}>{formTitle}</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => console.log("datas submitted")}
      >
        {({ dirty, errors, values }) => {
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
                onClickAction={() => {
                  handleSubmitActions(values)
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
