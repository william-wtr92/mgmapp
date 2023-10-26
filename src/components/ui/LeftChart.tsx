import useGetAllCategories from "@/services/category/allCategory"
import useGetStockByCat from "@/services/category/stockByCat"
import useGetHistoricAllProducts from "@/services/products/allHistoric"
import useGetProductAddByDate from "@/services/products/productAddByDate"
import styles from "@/styles/components/LeftChart.module.css"
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { useEffect, useState } from "react"
import { Bar, Doughnut } from "react-chartjs-2"

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
}

interface ProductByCatType {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
  }[]
}

const LeftChart = () => {
  const {
    productHistoricAllData,
    productHistoricAllError,
    productHistoricAllLoading,
  } = useGetHistoricAllProducts()

  const { allCategoriesData, allCategoriesError, allCategoriesLoading } =
    useGetAllCategories()

  const { stockByCatData, stockByCatError, stockByCatLoading } =
    useGetStockByCat()

  const {
    productAddByDateData,
    productAddByDateError,
    productAddByDateLoading,
  } = useGetProductAddByDate()

  const [productByCat, setProductByCat] = useState<ProductByCatType | null>(
    null
  )

  const [productsByDayOfWeek, setProductsByDayOfWeek] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0,
  ])

  useEffect(() => {
    if (stockByCatData && allCategoriesData) {
      const fetchedData = stockByCatData.map((stock: any) => stock)

      setProductByCat({
        labels: allCategoriesData.map((category: any) => category.name),
        datasets: [
          {
            label: "Stock par catégorie: ",
            data: fetchedData.map((item: any) => item.count),
            backgroundColor: [
              "rgba(22, 217, 239, 0.8)",
              "rgba(39, 80, 245, 0.8)",
              "rgba(186, 115, 244, 0.8)",
              "rgba(126, 1, 228, 0.8)",
            ],
          },
        ],
      })
    }
  }, [stockByCatData, allCategoriesData])

  useEffect(() => {
    if (productAddByDateData) {
      const newProductsByDayOfWeek = [0, 0, 0, 0, 0, 0, 0]
      productAddByDateData.forEach(({ created_day, product_count }: any) => {
        const day = new Date(created_day).getDay()
        newProductsByDayOfWeek[day] += Number(product_count)
      })
      setProductsByDayOfWeek(newProductsByDayOfWeek)
    }
  }, [productAddByDateData])

  const historicData = {
    labels: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    datasets: [
      {
        label: "Nombre de produits ajoutés",
        data: productsByDayOfWeek,
        backgroundColor: "rgba(39, 80, 245, 0.8)",
      },
    ],
  }

  return (
    <div className={styles.container}>
      {allCategoriesLoading || stockByCatLoading ? (
        <p>Loading...</p>
      ) : productByCat ? (
        <div className={styles.stats}>
          <div className={styles.graphDog}>
            <Doughnut data={productByCat as any} options={options as any} />
            </div>
            
          <div className={styles.graphBar}>
            <Bar data={historicData as any} options={options as any} />
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  )
}

export default LeftChart
