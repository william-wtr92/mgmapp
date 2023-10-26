import useGetDetailProduct from "@/services/products/getProductDetail"
import styles from "@/styles/pages/ProductDetail.module.css"
import moment from "moment"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import deleteProduct from "@/services/products/deleteProduct"
import FormikForm from "@/components/utils/FormikForm"
import Modal from "@/components/ui/Modal"
import { ModalType, updateProductType } from "@/types/modal/ModalType"
import { addProductInitialValues, addProductValidationSchema } from "@/types/product/InitialValues"
import addProduct from "@/services/products/addProduct"
import updateProduct from "@/services/products/updateProduct"

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
  const router = useRouter()

  const [modalType, setModalType] = useState<ModalType>("");
  const [initialValues, setInitialValues] = useState<any>({});
  const [submitBtnText, setSubmitBtnText] = useState<any>("");
  const [open, setOpen] = useState<boolean>(true);

  const {
    productDetailData,
    productDetailError,
    productDetailLoading,
    refreshProductDetail
  } = useGetDetailProduct(productId);
  const productDetail = (!productDetailError && !productDetailLoading) && productDetailData;

  const handleDelete = useCallback((productId: number) => {
    deleteProduct(productId)
    router.push("/")
  }, [])

  useEffect(() => {
    if (!productDetail) return;

    setInitialValues({
      name: productDetail.name,
      desc: productDetail.desc,
      stock: productDetail.stock,
      categoryId: productDetail.categoryId
    })
  }, [productDetail, productDetailLoading]);

  const handleUpdateProduct = useCallback((values: any) => {
    updateProduct(productDetail.id, values)
  }, [productDetail]);

  return (
    <main className={styles.container}>

      <div className={styles.leftContainer}>
        <h1 className={styles.title}>Détail du produit</h1>

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

        <div className={styles.details}>
          <label className={styles.labels}>Category Id</label>
          <p className={styles.data}>{productDetailData?.categoryId}</p>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <h2 className={styles.title}>Actions</h2>

        <div className={styles.iconsContainer}>
          <div className={styles.iconsUnit} onClick={() => setModalType(updateProductType)}>
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

      {productDetail && (
        <Modal
          opened={modalType === updateProductType}
          size={"medium"}
          setModalType={setModalType}
        >
          <div className={styles.formContainer}>
            <FormikForm
              formTitle={"Ajouter un produit"}
              initialValues={{
                name: productDetail.name,
                desc: productDetail.desc,
                stock: productDetail.stock,
                categoryId: productDetail.categoryId
              }}
              validationSchema={addProductValidationSchema}
              handleSubmit={handleUpdateProduct}
              submitBtnText={"Mettre à jour"}
              setModalType={setModalType}
              updateData={refreshProductDetail}
            />
          </div>
        </Modal>
      )}


    </main>
  )
}

export default ProductDetail
