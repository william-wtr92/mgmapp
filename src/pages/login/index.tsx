import React from "react"
import styles from "@/styles/pages/Login.module.css"
import { Formik, Form } from "formik"
import { LoginInitialValues } from "@/types/login/LoginInitialValues"
import * as yup from "yup"
import FormikField from "@/components/FormikField"
import Image from "next/image"
import Button from "@/components/Button"
import signIn from "@/services/users/signIn"
import { useRouter } from "next/router"
import LoginLayout from "@/components/ui/LoginLayout"

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Please enter your email")
    .min(1, "Please enter a valid email"),
  password: yup.string().required("Please enter your password"),
})

const initialValues: LoginInitialValues = {
  email: "",
  password: "",
}

const Login = () => {
  const router = useRouter()

  const handleSubmit = async (values: LoginInitialValues) => {
    const [error] = await signIn(values)

    if (!error) {
      router.push("/")
    }
  }

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
          <p className={styles.formRightTitle}>Se connecter à Roland</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors }) => {
              return (
                <Form className={styles.form}>
                  <div className={styles.formErrors}>
                    {errors &&
                      // eslint-disable-next-line no-unused-vars
                      Object.entries(errors).map(([_, value], index) => (
                        <span key={index}>{value}</span>
                      ))}
                  </div>

                  <FormikField
                    type={"text"}
                    placeholder="E-mail"
                    name={"email"}
                    label={"E-mail"}
                  />

                  <FormikField
                    type={"password"}
                    placeholder="Password"
                    name={"password"}
                    label={"Password"}
                  />

                  <Button
                    label={"Login"}
                    // eslint-disable-next-line no-console
                    onClickAction={() => console.log("datas sent !")}
                  />
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </main>
  )
}

Login.getLayout = function (page: any) {
  return <LoginLayout>{page}</LoginLayout>
}

export default Login
