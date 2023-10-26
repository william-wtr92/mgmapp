import styles from "@/styles/pages/UserDetail.module.css"
import moment from "moment"
import {
  PencilSquareIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline"
import useGetUserDetail from "@/services/users/getUserById"
import { useCallback } from "react"
import { useRouter } from "next/router"

export const getServerSideProps = async (context: any) => {
  const { userId } = context.params

  return {
    props: {
      userId,
    },
  }
}

const UserDetail = (props: any) => {
  const { userId } = props
  const router = useRouter()

  const { userDetailData, userDetailError, userDetailLoading } =
    useGetUserDetail(userId)

  const user = !userDetailLoading && userDetailData;



  const handleReturn = useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
      <div className={styles.card}>
        <div className={styles.details}>
          <label className={styles.labels}>Mail</label>
          <p className={styles.data}>{userDetailData?.email}</p>
        </div>
        <div className={styles.details}>
          <label className={styles.labels}>Prénom</label>
          <p className={styles.data}>{userDetailData?.firstname}</p>
        </div>
        <div className={styles.details}>
          <label className={styles.labels}>Nom</label>
          <p className={styles.data}>{userDetailData?.lastname}</p>
        </div>
        <div className={styles.details}>
          <label className={styles.labels}>Date de création du compte</label>
          <p className={styles.data}>
            {moment(userDetailData?.createdAt).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>
        <div className={styles.details}>
          <label className={styles.labels}>Rôle</label>
          <p className={styles.data}>{user?.roleData?.right}</p>
        </div>
      </div>
      <h2 className={styles.title}>Actions</h2>
      <div className={styles.iconsContainer}>
        <div className={styles.iconsUnit}>
          <PencilSquareIcon className={styles.icons} />
          <label className={styles.labelsIcon}>Modifier</label>
        </div>
        <div className={styles.iconsUnit} onClick={handleReturn}>
          <ArrowUturnLeftIcon className={styles.icons} />
          <label className={styles.labelsIcon}>Retour</label>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
