import styles from "@/styles/components/SearchBar.module.css"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const SearchBar = () => {
  return (
    <div className={styles.container}>
      <MagnifyingGlassIcon className={styles.icon} />
      <input
        type="search"
        className={styles.search}
        placeholder="Rechercher ..."
      />
    </div>
  )
}

export default SearchBar
