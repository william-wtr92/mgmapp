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
  addCategoryType,
  addProductType,
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
import useGetLowerStockProducts from "@/services/hooks/useGetLowerStockProducts"
import {
  addCategoryInitialValues,
  addCategoryValidationSchema,
} from "@/types/category/InitialValues"
import addCategory from "@/services/category/addCategory"
import useGetHistoricProducts from "@/services/products/getLastProducts"
import useGetAllCategories from "@/services/category/allCategory"
import useGetProductAddByDate from "@/services/products/productAddByDate"

const NavBar = () => {
  const [modalType, setModalType] = useState<ModalType>("")
  const [submitBtnText, setSubmitBtnText] = useState<any>("")
  const [open, setOpen] = useState<boolean>(true)
  const router = useRouter()

  const cookies = parseCookies()
  const jwtToken = cookies["token"]
  const session = parseSession(jwtToken)
  const userId = session ? session.user.id : null

  const { refreshLowerStockProducts } = useGetLowerStockProducts()
  const { refreshProductHistoric } = useGetHistoricProducts()
  const { refreshCategories } = useGetAllCategories()
  const { refreshProductAddByDate } = useGetProductAddByDate()

  useEffect(() => {
    setSubmitBtnText(getFormValues(modalType)?.submitBtnText)
  }, [modalType])

  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  const handleClearCookies = useCallback(() => {
    document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    router.push("/login")
  }, [])

  const refreshDatas = useCallback(() => {
    refreshLowerStockProducts()
    refreshProductHistoric()
    refreshProductAddByDate()
  }, [])

  return (
    <>
      <div
        className={classNames(
          styles.container,
          open ? styles.open : styles.closed,
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
            <NavLink Icon={HomeIcon} href="/" label={"Accueil"}>
              {""}
            </NavLink>

            <NavbarBtn
              Icon={FolderPlusIcon}
              label={"Produit"}
              onClickAction={() => setModalType(addProductType)}
            />

            <NavbarBtn
              Icon={FolderPlusIcon}
              label={"Catégorie"}
              onClickAction={() => setModalType(addCategoryType)}
            />
          </div>
        </div>

        <div className={styles.groupLinks}>
          <h1 className={styles.groupTitle}>Paramètres</h1>

          <div className={styles.links}>
            <NavLink Icon={UserIcon} href={`/user/${userId}`} label={"Profil"}>
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

      <Modal
        opened={modalType === addProductType}
        size={"medium"}
        setModalType={setModalType}
      >
        <div className={styles.formContainer}>
          <FormikForm
            formTitle={"Ajouter un produit"}
            initialValues={addProductInitialValues}
            validationSchema={addProductValidationSchema}
            handleSubmit={addProduct}
            submitBtnText={submitBtnText}
            setModalType={setModalType}
            updateData={refreshDatas}
          />
        </div>
      </Modal>

      <Modal
        opened={modalType === addCategoryType}
        size={"medium"}
        setModalType={setModalType}
      >
        <div className={styles.formContainer}>
          <FormikForm
            formTitle={"Ajouter une catégorie"}
            initialValues={addCategoryInitialValues}
            validationSchema={addCategoryValidationSchema}
            handleSubmit={addCategory}
            submitBtnText={"Ajouter"}
            setModalType={setModalType}
            updateData={refreshCategories}
          />
        </div>
      </Modal>
    </>
  )
}

export default NavBar
