import useGetSearchProduct from '@/services/products/searchProduct'
import React, { useCallback, useState } from 'react'
import styles from "@/styles/pages/SearchProductPage.module.css"
import SearchBar from '@/components/ui/SearchBar'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

export const getServerSideProps = (context: any) => {
  const { search } = context.query

  return {
    props: {
      search
    }
  }
}

type Props = {
  search: string
}

const SearchProductPage = (props: Props) => {
  const { search } = props;
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>(search);

  const { productsSearchData, productsSearchError, productsSearchLoading, updateProductsSearch } =
    useGetSearchProduct(searchValue);
  const productsSearched = (!productsSearchLoading && !productsSearchError) ? productsSearchData : [];

  const redirectToProductPage = useCallback((id: number) => {
    router.push(`/product/${id}`)
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Produits contenant la recherche : "{searchValue}"
      </h1>

      <div className={styles.searchBarWrapper}>
        <SearchBar defaultValue={searchValue} />
      </div>

      <div className={styles.productCardContainer}>
        {productsSearched.map((product: any, index: number) => {
          return (
            <div className={styles.productCard}>
              <div className={styles.iconWrapper}>
                <ShoppingBagIcon className={styles.icon} />
              </div>

              <div className={styles.productInfo}>
                <p><span>Nom : </span> {product.name}</p>
                <p><span>Description : </span> {product.desc}</p>
                <p><span>Catégorie : </span> {product.category.name}</p>
              </div>

              <Button
                label={"Plus de détails"}
                onClickAction={() => redirectToProductPage(product.id)} />
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default SearchProductPage