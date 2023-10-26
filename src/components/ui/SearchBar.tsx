import useGetSearchProduct from "@/services/products/searchProduct"
import styles from "@/styles/components/SearchBar.module.css"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

type Props = {
  defaultValue?: string;
  setActiveSearch?: (str: string) => void;
}

const SearchBar = (props: Props) => {
  const { defaultValue, setActiveSearch } = props
  const router = useRouter()
  const [value, setValue] = useState<string>(defaultValue ? defaultValue : "")

  const handleChange = useCallback((e: any) => {
    setValue(e.target.value)
  }, [value])

  const handleSubmit = useCallback(() => {
    setActiveSearch ? setActiveSearch(value) : router.push(`/product/search?search=${value}`)
  }, [value]);

  useEffect(() => {
    const searchBar = document.querySelector("#productSearchBar")

    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    }

    if (searchBar === null) return;

    searchBar.addEventListener("keydown", handleKeyDown)

    return () => {
      searchBar.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleSubmit])

  return (
    <div className={styles.container}>
      <MagnifyingGlassIcon className={styles.icon} />
      
      <input
        id="productSearchBar"
        type="search"
        value={value}
        onChange={handleChange}
        className={styles.search}
        placeholder="Rechercher ..."
      />
    </div>
  )
}

export default SearchBar
