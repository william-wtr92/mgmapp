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
import { ModalType, addProductType } from "@/types/modal/ModalType"
import FormikForm from "../utils/FormikForm"
import Modal from "./Modal"
import { NavbarBtn } from "../utils/NavbarBtn"
import addProduct from "@/services/products/addProduct"

const NavBar = () => {
  const [modalType, setModalType] = useState<ModalType>("");
  const [initialValues, setInitialValues] = useState<any>("")
  const [validationSchema, setValidationSchema] = useState<any>("");
  const [onSubmitFunc, setOnSubmitFunc] = useState<any>();
  const [submitBtnText, setSubmitBtnText] = useState<any>("");
  const [open, setOpen] = useState<boolean>(true)


  useEffect(() => {
    setInitialValues(getFormValues(modalType)?.initialValues);
    setValidationSchema(getFormValues(modalType)?.validationSchema);
    setSubmitBtnText(getFormValues(modalType)?.submitBtnText);
  }, [modalType])


  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  const setProductModalType = useCallback(() => {
    setModalType(modalType !== addProductType ? addProductType : "")
    setOnSubmitFunc(addProduct)
  }, [modalType]);
  
  return (
    <>
      <div className={classNames(
        styles.container, 
        open ? styles.open : styles.closed
      )}>
        {open ? (
          <ChevronLeftIcon className={styles.chevronButton} onClick={handleOpen} />
        ) : (
          <ChevronRightIcon className={styles.chevronButton} onClick={handleOpen} />
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
              <NavLink
                Icon={HomeIcon}
                href="/"
                label={"Home"}
              >
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
              <NavLink
                Icon={UserIcon}
                href="/"
                label={"Profile"}
              >
                {""}
              </NavLink>
                
              <NavLink
                Icon={ArrowLeftOnRectangleIcon}
                href="/"
                label={"Logout"}
              >
                {""}
              </NavLink>
            </div>
          </div>

      </div>
      
      <Modal
        opened={modalType.length > 0}
        size={"medium"}
      >
        <div className={styles.formContainer}>
          {initialValues && (
            <FormikForm
              formTitle={"Ajouter un produit"}
              initialValues={initialValues}
              validationSchema={validationSchema}
              handleSubmit={addProduct}
              submitBtnText={submitBtnText}
              setModalType={setModalType}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default NavBar
