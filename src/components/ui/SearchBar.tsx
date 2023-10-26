import useGetSearchProduct from "@/services/products/searchProduct"
import styles from "@/styles/components/SearchBar.module.css"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

const SearchBar = () => {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [search, setSearch] = useState("")
  const { productsSearchData, productsSearchError, productsSearchLoading } =
    useGetSearchProduct(search)

  const handleChange = useCallback((e: any) => {
    setValue(e.target.value)
  }, [value])

  const handleSubmit = useCallback(() => {
    setSearch(value)
    router.push(`/product/search?search=${value}`)
  }, [value]);

  useEffect(() => {
    const searchBar = document.querySelector("#productSearchBar")

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    }

    if (searchBar === null) return;

    searchBar.addEventListener("keydown", handleKeyDown)

    return () => {
      searchBar.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  console.log(value)
  console.log(productsSearchData)

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <MagnifyingGlassIcon className={styles.icon} />
      <input
        id="productSearchBar"
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
