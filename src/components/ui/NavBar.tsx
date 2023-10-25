import styles from "@/styles/components/NavBar.module.css"
import Image from "next/image"
import { NavLink } from "../utils/NavLink"
import {
  HomeIcon,
  FolderPlusIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { useCallback, useState } from "react"
import classNames from "classnames"

const NavBar = () => {
  const [open, setOpen] = useState<boolean>(true)

  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <>
      <div className={classNames(
        styles.container, 
        open ? styles.open : styles.closed
      )}>
        {open ? (
          <ChevronLeftIcon className={styles.chevronButton} onClick={handleOpen} />
        ) : (
          <ChevronRightIcon className={styles.chevronButton} onClick={handleOpen} />
        )}

          <div className={styles.userInfos}>
            <div className={styles.imageWrapper}>
              <Image
                src={"/images/test.jpg"}
                alt="user"
                className={styles.image}
                fill
              /> 
            </div>

            <div className={styles.infos}>
              <p className={styles.text}>Hello 👋</p>
              <p className={styles.text}>William Lim</p>
            </div>
            
          </div>

          <div className={styles.groupLinks}>
            <h1 className={styles.groupTitle}>Menu</h1>

            <div className={styles.links}>
              <NavLink
                Icon={HomeIcon}
                href="/"
                label={"Home"}
              >
                {""}
            </NavLink>
            
              <NavLink
                Icon={FolderPlusIcon}
                href="/"
                label={"Ajouter"}
              >
                {""}
              </NavLink>
            </div>
          </div>

          <div className={styles.groupLinks}>
            <h1 className={styles.groupTitle}>Settings</h1>

            <div className={styles.links}>
              <NavLink
                Icon={UserIcon}
                href="/"
                label={"Profile"}
              >
                {""}
              </NavLink>
                
              <NavLink
                Icon={ArrowLeftOnRectangleIcon}
                href="/"
                label={"Logout"}
              >
                {""}
              </NavLink>
            </div>
          </div>

        </div>
    </>
  )
}

export default NavBar
