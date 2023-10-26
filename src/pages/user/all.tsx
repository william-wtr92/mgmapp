import useGetUsers from "@/services/users/getUsers"
import styles from "@/styles/pages/UserAll.module.css"
import moment from "moment"
import Image from "next/image"

const allUser = () => {
  const { userData, userError, userLoading } = useGetUsers()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Liste des utilisateurs</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Image</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Date de création</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody className={styles.card}>
            {userData &&
              userData.map((user: any, index: number) => (
                <tr key={index} className={styles.unit}>
                  <td>
                    <Image
                      src={"/images/test.jpg"}
                      alt="user"
                      className={styles.image}
                      height={50}
                      width={50}
                    />
                  </td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td className={styles.mail}>{user.email}</td>
                  <td>{moment(user?.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                  <td className={styles.role}>{user?.roleData?.right}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default allUser
