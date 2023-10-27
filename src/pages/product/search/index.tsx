import useGetSearchProduct from "@/services/products/searchProduct"
import React, { useCallback, useEffect, useState } from "react"
import styles from "@/styles/pages/SearchProductPage.module.css"
import SearchBar from "@/components/ui/SearchBar"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import Button from "@/components/Button"
import { useRouter } from "next/router"

export const getServerSideProps = (context: any) => {
  const { search } = context.query

  return {
    props: {
      search,
    },
  }
}

type Props = {
  search: string
}

const SearchProductPage = (props: Props) => {
  const { search } = props
  const router = useRouter()

  const [activeSearchValue, setActiveSearchValue] = useState<string>(search)

  const {
    productsSearchData,
    productsSearchError,
    productsSearchLoading,
    updateProductsSearch,
  } = useGetSearchProduct(activeSearchValue)
  const productsSearched =
    !productsSearchLoading && !productsSearchError ? productsSearchData : []

  const redirectToProductPage = useCallback(
    (id: number) => {
      router.push(`/product/${id}`)
    },
    [router],
  )

  useEffect(() => {
    updateProductsSearch()
  }, [activeSearchValue, updateProductsSearch])

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Produits contenant la recherche : "{activeSearchValue}"
      </h1>

      <div className={styles.searchBarWrapper}>
        <SearchBar
          defaultValue={search}
          setActiveSearch={setActiveSearchValue}
        />
      </div>

      <div className={styles.productCardContainer}>
        {productsSearched && productsSearched.length > 0 ? (
          productsSearched.map((product: any, index: number) => {
            return (
              <div className={styles.productCard} key={index}>
                <div className={styles.iconWrapper}>
                  <ShoppingBagIcon className={styles.icon} />
                </div>

                <div className={styles.productInfo}>
                  <p>
                    <span>Nom : </span> {product.name}
                  </p>
                  <p>
                    <span>Description : </span> {product.desc}
                  </p>
                  <p>
                    <span>Catégorie : </span> {product.category.name}
                  </p>
                </div>

                <Button
                  label={"Plus de détails"}
                  onClickAction={() => redirectToProductPage(product.id)}
                />
              </div>
            )
          })
        ) : (
          <p className={styles.noProductsText}>
            Aucun produit ne correspond à cette recherche
          </p>
        )}
      </div>
    </main>
  )
}

export default SearchProductPage
