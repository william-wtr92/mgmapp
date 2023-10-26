import styles from "@/styles/components/NavBar.module.css"
import Image from "next/image"
import { NavLink } from "../utils/NavLink"
import {
  HomeIcon,
  FolderPlusIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { useCallback, useEffect, useState } from "react"
import classNames from "classnames"
import getFormValues from "@/services/getForm"
import {
  ModalType,
  addProductType,
  updateProductType,
} from "@/types/modal/ModalType"
import FormikForm from "../utils/FormikForm"
import Modal from "./Modal"
import { NavbarBtn } from "../utils/NavbarBtn"
import addProduct from "@/services/products/addProduct"
import { useRouter } from "next/router"
import {
  addProductInitialValues,
  addProductValidationSchema,
} from "@/types/product/InitialValues"
import { parseCookies } from "nookies"
import parseSession from "@/services/helper/parseSession"

const NavBar = () => {
  const [modalType, setModalType] = useState<ModalType>("")
  const [initialValues, setInitialValues] = useState<any>("")
  const [validationSchema, setValidationSchema] = useState<any>("")
  const [onSubmitFunc, setOnSubmitFunc] = useState<any>()
  const [submitBtnText, setSubmitBtnText] = useState<any>("")
  const [open, setOpen] = useState<boolean>(true)
  const router = useRouter()

  const cookies = parseCookies()
  const jwtToken = cookies["token"]
  const session = parseSession(jwtToken)
  const userId = session ? session.user.id : null

  useEffect(() => {
    setInitialValues(getFormValues(modalType)?.initialValues)
    setValidationSchema(getFormValues(modalType)?.validationSchema)
    setSubmitBtnText(getFormValues(modalType)?.submitBtnText)
  }, [modalType])

  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  const setProductModalType = useCallback(() => {
    setModalType(modalType !== addProductType ? addProductType : "")
    setOnSubmitFunc(addProduct)
  }, [modalType])

  const handleClearCookies = useCallback(() => {
    document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    router.push("/login")
  }, [])

  return (
    <>
      <div
        className={classNames(
          styles.container,
          open ? styles.open : styles.closed
        )}
      >
        {open ? (
          <ChevronLeftIcon
            className={styles.chevronButton}
            onClick={handleOpen}
          />
        ) : (
          <ChevronRightIcon
            className={styles.chevronButton}
            onClick={handleOpen}
          />
        )}

        <div className={styles.userInfos}>
          <div className={styles.imageWrapper}>
            <Image
              src={"/images/test.jpg"}
              alt="user"
              className={styles.image}
              fill
            />
          </div>

          <div className={styles.infos}>
            <p className={styles.text}>Hello 👋</p>
            <p className={styles.text}>William Lim</p>
          </div>
        </div>

        <div className={styles.groupLinks}>
          <h1 className={styles.groupTitle}>Menu</h1>

          <div className={styles.links}>
            <NavLink Icon={HomeIcon} href="/" label={"Home"}>
              {""}
            </NavLink>

            <NavbarBtn
              Icon={FolderPlusIcon}
              label={"Ajouter"}
              onClickAction={() => setProductModalType()}
            />
          </div>
        </div>

        <div className={styles.groupLinks}>
          <h1 className={styles.groupTitle}>Settings</h1>

          <div className={styles.links}>
            <NavLink Icon={UserIcon} href={`/user/${userId}`} label={"Profile"}>
              {""}
            </NavLink>

            <NavbarBtn
              Icon={ArrowLeftOnRectangleIcon}
              label={"Logout"}
              onClickAction={() => handleClearCookies()}
            />
          </div>
        </div>
      </div>

      <Modal opened={modalType === addProductType} size={"medium"}>
        <div className={styles.formContainer}>
          <FormikForm
            formTitle={"Ajouter un produit"}
            initialValues={addProductInitialValues}
            validationSchema={addProductValidationSchema}
            handleSubmit={addProduct}
            submitBtnText={submitBtnText}
            setModalType={setModalType}
          />
        </div>
      </Modal>
    </>
  )
}

export default NavBar
