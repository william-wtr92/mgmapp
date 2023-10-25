import useGetDetailProduct from "@/services/products/getProductDetail"
import styles from "@/styles/pages/ProductDetail.module.css"
import moment from "moment"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { useCallback } from "react"
import { useRouter } from "next/router"
import deleteProduct from "@/services/products/deleteProduct"

export const getServerSideProps = async (context: any) => {
  const { productId } = context.params

  return {
    props: {
      productId,
    },
  }
}

const ProductDetail = (props: any) => {
  const { productId } = props
  const { productDetailData, productDetailError, productDetailLoading } =
    useGetDetailProduct(productId)
  const router = useRouter()

  const handleDelete = useCallback((productId: number) => {
    deleteProduct(productId)
    router.push("/")
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Détail du produit</h1>
      <div className={styles.card}>
        <div className={styles.details}>
          <label className={styles.labels}>Nom du produit</label>
          <p className={styles.data}>{productDetailData?.name}</p>
        </div>
        <div className={styles.details}>
          <label className={styles.labels}>Description du produit</label>
          <textarea
            className={styles.textarea}
            value={productDetailData?.desc}
            readOnly
          />
        </div>
        <div className={styles.details}>
          <label className={styles.labels}>Date de création du produit</label>
          <p className={styles.data}>
            {moment(productDetailData?.createdAt).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>
        <div className={styles.details}>
          <label className={styles.labels}>Stock du produit</label>
          <p className={styles.data}>{productDetailData?.stock}</p>
        </div>
      </div>
      <h2 className={styles.title}>Actions</h2>
      <div className={styles.iconsContainer}>
        <div className={styles.iconsUnit}>
          <PencilSquareIcon className={styles.icons} />
          <label className={styles.labelsIcon}>Modifier</label>
        </div>
        <div
          className={styles.iconsUnit}
          onClick={() => handleDelete(productDetailData.id)}
        >
          <TrashIcon className={styles.icons} />
          <label className={styles.labelsIcon}>Supprimer</label>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
