import HistoricProducts from "@/components/ui/HistoricProducts"
import LeftChart from "@/components/ui/LeftChart"
import SearchBar from "@/components/ui/SearchBar"
import UsersCard from "@/components/ui/UsersCard"
import useGetLowerStockProducts from "@/services/hooks/useGetLowerStockProducts"
import useGetHistoricProducts from "@/services/products/getLastProducts"
import useGetUsers from "@/services/users/getUsers"
import styles from "@/styles/pages/Home.module.css"
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline"
import classNames from "classnames"
import { useRouter } from "next/router"

const Home = () => {
  const router = useRouter();
    
  const {
    lowerStockProductsData,
    lowerStockProductsError,
    lowerStockProductsIsLoading,
  } = useGetLowerStockProducts();
  const lowerStockProducts = !lowerStockProductsIsLoading && lowerStockProductsData;

  const {
    productHistoricData,
    productHistoricError,
    productHistoricLoading
  } = useGetHistoricProducts()
  const productHistoric = !productHistoricLoading && !productHistoricError && productHistoricData

  return (
    <main className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.group}>
          <div className={styles.groupHeadWrapper}>
            <p className={styles.groupTitle}>Produits</p>
            <SearchBar />
          </div>

          <div className={styles.categoriesContainer}>
            {!lowerStockProductsIsLoading &&
              lowerStockProducts.map((product: any, i: number) => {
                return (
                  <div
                    key={i}
                    className={styles.categoryBlock}
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    {product.stock <= 50 && (
                      <ExclamationTriangleIcon
                        className={classNames(
                          styles.priorityIcon,
                          styles.highPriority
                        )}
                      />
                    )}

                    {product.stock > 50 && product.stock <= 100 && (
                      <ExclamationCircleIcon
                        className={classNames(
                          styles.priorityIcon,
                          styles.mediumPriority
                        )}
                      />
                    )}

                    {product.stock > 100 && (
                      <CheckBadgeIcon
                        className={classNames(
                          styles.priorityIcon,
                          styles.lowPriority
                        )}
                      />
                    )}

                    <div className={styles.iconWrapper}>
                      <ShoppingBagIcon className={styles.icon} />
                    </div>

                    <div className={styles.categoryInfo}>
                      <p>{product.name}</p>
                      <p>{product.stock} en stock</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.groupHeadWrapper}>
            <p className={styles.groupTitle}>Stats</p>
          </div>
          <LeftChart />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.topContainer}>
          <UsersCard
          />
        </div>

        <div className={styles.bottomContainer}>
          <HistoricProducts
            products={!productHistoricLoading ? productHistoric : []}
          />
        </div>
      </div>
    </main>
  )
}

export default Home
