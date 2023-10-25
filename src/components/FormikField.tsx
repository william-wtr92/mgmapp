import React from 'react'
import { Field } from "formik"
import styles from "@/styles/components/FormikField.module.css"

type Props = {
  type: string;
  placeholder?: string;
  label?: string;
  value?: string;
  name?: string;
}

const FormikField = (props: Props) => {
  const { type, placeholder, value, label, name } = props;

  return (
    <Field name={name}> 
      {(({ field } : {field: any}) => {
        return (
          <label className={styles.wrapper}>
            <span>{label}</span>

            <input
              {...field}
              className={styles.input}
              type={type}
              placeholder={placeholder}
              value={value}
              name={name}
            />
          </label>
        )
      })}


    </Field>
  )
}

export default FormikField