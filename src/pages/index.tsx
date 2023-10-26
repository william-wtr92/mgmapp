import HistoricProducts from "@/components/ui/HistoricProducts"
import SearchBar from "@/components/ui/SearchBar"
import UsersCard from "@/components/ui/UsersCard"
import useGetLowerStockProducts from "@/services/hooks/useGetLowerStockProducts"
import useGetHistoricProducts from "@/services/products/getLastProducts"
import useGetSearchProduct from "@/services/products/searchProduct"
import useGetUsers from "@/services/users/getUsers"
import styles from "@/styles/pages/Home.module.css"
import { CheckBadgeIcon, ExclamationCircleIcon, ExclamationTriangleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { useCallback, useState } from "react"

const Home = () => {
  const { userData, userError, userLoading } = useGetUsers()
  const { productHistoricData, productHistoricError, productHistoricLoading } =
    useGetHistoricProducts()
  
  const { lowerStockProductsData, lowerStockProductsError, lowerStockProductsIsLoading } = useGetLowerStockProducts();
  const lowerStockProducts = !lowerStockProductsIsLoading && lowerStockProductsData;

  console.log(lowerStockProducts);

  const mock = new Array(4).fill("").map((_, i ) => i +1)

  return (
    <main className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.group}>
          <div className={styles.groupHeadWrapper}>
            <p className={styles.groupTitle}>Produits</p>
            <SearchBar />
          </div>
          
          <div className={styles.categoriesContainer}>
            {!lowerStockProductsIsLoading && lowerStockProducts.map((product: any, i: number) => {
              return (
                <div
                  key={i}
                  className={styles.categoryBlock}
                >
                  {product.stock <= 50 && (
                    <ExclamationTriangleIcon className={classNames(
                      styles.priorityIcon,
                      styles.highPriority
                    )} />
                  )}

                  {(product.stock > 50 && product.stock <= 100) && (
                    <ExclamationCircleIcon className={classNames(
                      styles.priorityIcon,
                      styles.mediumPriority
                    )} />
                  )}

                  {(product.stock > 100) && (
                    <CheckBadgeIcon className={classNames(
                      styles.priorityIcon,
                      styles.lowPriority
                    )} />
                  )}

                  {/* icon */}
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
