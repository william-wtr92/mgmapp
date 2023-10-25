import HistoricProducts from "@/components/ui/HistoricProducts"
import SearchBar from "@/components/ui/SearchBar"
import UsersCard from "@/components/ui/UsersCard"
import useGetHistoricProducts from "@/services/products/getLastProducts"
import useGetSearchProduct from "@/services/products/searchProduct"
import useGetUsers from "@/services/users/getUsers"
import styles from "@/styles/pages/Index.module.css"
import { useCallback, useState } from "react"

const Home = () => {
  const { userData, userError, userLoading } = useGetUsers()
  const { productHistoricData, productHistoricError, productHistoricLoading } =
    useGetHistoricProducts()
  // const [search, setSearch] = useState("")
  // const { productsSearchData, productsSearchError, productsSearchLoading } =
  //   useGetSearchProduct(search)

  // const handleSubmitSearch = useCallback(() => {
  //   setSearch(...)
  // }, [])

  return (
    <main className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.searchContainer}>
          <SearchBar />
        </div>
      </div>

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
