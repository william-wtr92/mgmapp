import UsersCard from "@/components/ui/UsersCard"
import styles from "@/styles/pages/Index.module.css"

const Home = () => {
  return (
    <main className={styles.container}>
      <div className={styles.mainContainer}>Main Card</div>

      <div className={styles.rightContainer}>
        <div className={styles.topContainer}>
          <UsersCard />
        </div>

        <div className={styles.bottomContainer}>EZ</div>
      </div>
    </main>
  )
}

export default Home
