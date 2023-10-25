import HistoricProducts from "@/components/ui/HistoricProducts"
import UsersCard from "@/components/ui/UsersCard"
import useGetHistoricProducts from "@/services/products/getLastProducts"
import useGetUsers from "@/services/users/getUsers"
import styles from "@/styles/pages/Index.module.css"

const Home = () => {
  const { userData, userError, userLoading } = useGetUsers()
  const { productHistoricData, productHistoricError, productHistoricLoading } =
    useGetHistoricProducts()

  return (
    <main className={styles.container}>
      <div className={styles.mainContainer}></div>

      <div className={styles.rightContainer}>
        <div className={styles.topContainer}>
          <UsersCard users={!userLoading ? userData : []} />
        </div>

        <div className={styles.bottomContainer}>
          <HistoricProducts
            products={!productHistoricLoading ? productHistoricData : []}
          />
        </div>
      </div>
    </main>
  )
}

export default Home
