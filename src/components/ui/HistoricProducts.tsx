import styles from "@/styles/components/HistoricProducts.module.css"
import { NavLink } from "../utils/NavLink"
import moment from "moment"

const HistoricProducts = (props: any) => {
  const { products } = props

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Historique</h1>
        <NavLink href="/all" label={"Tout voir"}>
          {" "}
          {""}
        </NavLink>
      </div>
      <div className={styles.card}>
        {products &&
          products.map((product: any, index: number) => (
            <div key={index} className={styles.unit}>
              <div className={styles.info}>
                <div className={styles.point}></div>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.date}>
                  {moment(product.createdAt).format("DD/MM/YYYY HH:mm")}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HistoricProducts
