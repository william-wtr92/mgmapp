import styles from "@/styles/components/UsersCard.module.css"
import Image from "next/image"
import { NavLink } from "../utils/NavLink"
import Button from "../Button"
import { parseCookies } from "nookies"
import parseSession from "@/services/helper/parseSession"
import useGetUserDetail from "@/services/users/getUserById"
import Modal from "./Modal"
import { useCallback, useEffect, useState } from "react"
import { ModalType, addUserType, updateProductType } from "@/types/modal/ModalType"
import FormikForm from "../utils/FormikForm"
import { addUserInitialValues, addUserValidationSchema } from "@/types/user/InitialValues"
import addUser from "@/services/users/addUser"
import useGetUsers from "@/services/users/getUsers"

const UsersCard = (props: any) => {
  const cookies = parseCookies()
  const jwtToken = cookies["token"]
  const session = parseSession(jwtToken)
  const userId = session ? session.user.id : null

  const [modalType, setModalType] = useState<ModalType>("")

  const {
    userData,
    userError,
    userLoading,
    updateUsers
  } = useGetUsers(null)
  const users = !userLoading ? userData : []

  const {
    userDetailData,
    userDetailError,
    userDetailLoading
  } = useGetUserDetail(userId);
  const user = (!userDetailError && !userDetailLoading) ? userDetailData : {};

  const refreshData = () => {
    updateUsers();
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Membres</h1>
        <NavLink href="/user/all" label={"Tout voir"}>
          {" "}
          {""}
        </NavLink>
      </div>
      <div className={styles.card}>
        {users &&
          users.map((user: any, index: number) => (
            <div key={index} className={styles.unit}>
              <Image
                src={"/images/test.jpg"}
                alt="user"
                className={styles.image}
                height={50}
                width={50}
              />
              <div className={styles.info}>
                <p className={styles.name}>{user.firstname}</p>
                <p className={styles.role}>{user?.roleData?.right}</p>
              </div>
            </div>
          ))}

        <div className={styles.add}>
          {user?.roleData?.right === "manager" && (
            <Button
              label={"Ajouter un membre"}
              onClickAction={() => setModalType(addUserType)}
            />
          )}
        </div>
      </div>

      <Modal
        opened={modalType === addUserType}
        size={"medium"}
        setModalType={setModalType}
      >
        <div className={styles.formContainer}>
          <FormikForm
            formTitle={"Ajouter un membre"}
            initialValues={addUserInitialValues}
            validationSchema={addUserValidationSchema}
            handleSubmit={addUser}
            submitBtnText={"Ajouter"}
            setModalType={setModalType}
            updateData={refreshData}
          />
        </div>
      </Modal>
    </div>
  )
}

export default UsersCard
