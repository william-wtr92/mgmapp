import useGetHistoricAllProducts from "@/services/products/allHistoric"
import styles from "@/styles/pages/HistoricAll.module.css"
import moment from "moment"
import { useRouter } from "next/router"
import { useCallback } from "react"

const allHsitoric = () => {
  const {
    productHistoricAllData,
    productHistoricAllError,
    productHistoricAllLoading,
  } = useGetHistoricAllProducts()

  const router = useRouter()

  const handleRedirect = useCallback((productId: number) => {
    router.push(`/product/${productId}`)
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Historique d'ajout de produit</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Nom</th>
              <th>Stock</th>
              <th>Date d'ajout</th>
              <th>Numéro de categorie</th>
            </tr>
          </thead>
          <tbody className={styles.card}>
            {productHistoricAllData &&
              productHistoricAllData.map((product: any, index: number) => (
                <tr
                  key={index}
                  className={styles.unit}
                  onClick={() => handleRedirect(product.id)}
                >
                  <td>{product.name}</td>
                  <td className={styles.mail}>{product.stock}</td>
                  <td>
                    {moment(product?.createdAt).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td className={styles.role}>{product?.categoryId}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default allHsitoric
