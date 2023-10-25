import UsersCard from "@/components/ui/UsersCard"
import useGetUsers from "@/services/users/getUsers"
import styles from "@/styles/pages/Index.module.css"

const Home = () => {
  const { userData, userError, userLoading } = useGetUsers()

  return (
    <main className={styles.container}>
      <div className={styles.mainContainer}>Main Card</div>

      <div className={styles.rightContainer}>
        <div className={styles.topContainer}>
          <UsersCard users={!userLoading ? userData : []} />
        </div>

        <div className={styles.bottomContainer}>EZ</div>
      </div>
    </main>
  )
}

export default Home
