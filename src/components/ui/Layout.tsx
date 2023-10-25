import NavBar from "./NavBar"
import styles from "@/styles/components/Layout.module.css"

const Layout = (props: any) => {
  const { children } = props

  return (
    <div className={styles.layout}>
      <NavBar />

      {children}
    </div>
  )
}
export default Layout
