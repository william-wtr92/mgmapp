import useGetSearchProduct from "@/services/products/searchProduct"
import styles from "@/styles/components/SearchBar.module.css"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const SearchBar = () => {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [search, setSearch] = useState("")
  const { productsSearchData, productsSearchError, productsSearchLoading } =
    useGetSearchProduct(search)

  const handleChange = useCallback((e: any) => {
    setValue(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault()
      setSearch(value)
      router.push(`/product/search?search=${value}`)
    },
    [value]
  )

  console.log(productsSearchData)

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <MagnifyingGlassIcon className={styles.icon} />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        className={styles.search}
        placeholder="Rechercher ..."
      />
    </form>
  )
}

export default SearchBar
