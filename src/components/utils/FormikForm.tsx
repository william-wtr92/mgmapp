import { Form, Formik } from 'formik'
import React from 'react'
import FormikField from '../FormikField';
import Button from '../Button';
import styles from "@/styles/components/FormikForm.module.css"

type Props = {
  formTitle: string;
  initialValues: any;
  validationSchema: any;
  handleSubmit: (values: any) => void;
  submitBtnText: string;
  setModalType: (str: string) => void;
}

const FormikForm = (props: Props) => {
  const { formTitle, initialValues, validationSchema, handleSubmit, submitBtnText, setModalType } = props;

  return (
    <>
      <p className={styles.formTzitle}>{formTitle}</p>      
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => console.log("datas submitted")}
      >

        {(({ dirty, errors, values }) => {
          return (
            <Form className={styles.form}>
              {initialValues && Object.entries(initialValues).map(([key, value], index) => {

                const type = typeof value;
                
                return (
                  <FormikField
                    key={index}
                    type={type}
                    placeholder={key}
                    name={key}
                    label={key}
                  />
                )
              })}

              <Button
                label={submitBtnText}
                onClickAction={() => {
                  handleSubmit(values);
                  setModalType("");
                }}
              />
            </Form>
          )
        })}

      </Formik>
    </>

  )
}

export default FormikForm