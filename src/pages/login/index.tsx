import React, { useCallback } from "react";
import styles from "@/styles/pages/Login.module.css"
import { Formik, Form, Field } from "formik"
import { LoginInitialValues } from "@/types/login/LoginInitialValues";
import * as yup from "yup"
import FormikField from "@/components/FormikField";
import Image from "next/image";
import Button from "@/components/Button";


const validationSchema = yup.object().shape({
  username: yup.string().required("Please enter your username").min(1, "Please enter a valid username"),
  password: yup.string().required("Please enter your password")
});

const initialValues: LoginInitialValues = {
  username: "",
  password: ""
}

const Login = () => {

  const handleSubmit = useCallback((values: LoginInitialValues): void => {
    console.log(values);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.backgroundLeft}></div>
        <div className={styles.backgroundRight}></div>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formLeft}>
          <div className={styles.logo}>
            <Image
              className={styles.logoImage}
              src={"/images/logo-roland-site.png"}
              alt="logo"
              fill={true}
            />
          </div>
        </div>

        <div className={styles.formRight}>
          <p className={styles.formRightTitle}>Log into Roland</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(({ dirty, errors, values }) => {
              console.log(errors);

              return (
                <Form className={styles.form}>

                  <div className={styles.formErrors}>
                    {errors && Object.entries(errors).map(([_, value], index) => (
                      <span key={index}>{value}</span>
                    ))}
                  </div>
            
                  <FormikField
                    type={"text"}
                    placeholder="Username"
                    name={"username"}
                    label={"Username"}
                  />

                  <FormikField
                    type={"password"}
                    placeholder="Password"
                    name={"password"}
                    label={"Password"}
                  />

                  <Button
                    label={"Login"}
                    onClickAction={() => console.log("test")}
                  />
                </Form>
              )
            })}
          </Formik>
        </div>
      </div>
    </main>
  )
}

export default Login;