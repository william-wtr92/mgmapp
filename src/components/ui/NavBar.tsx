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

const NavBar = () => {
  const [open, setOpen] = useState<Boolean>(true)

  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <>
      {open ? (
        <div className={styles.container}>
          <ChevronLeftIcon className={styles.open} onClick={handleOpen} />

          <div className={styles.user}>
            <Image
              src={"/images/test.jpg"}
              width={50}
              height={20}
              alt="user"
              className={styles.image}
            />
            <div className={styles.info}>
              <p>Hello 👋</p>
              <p className={styles.text}>William Lim</p>
            </div>
          </div>
          <div className={styles.group}>
            <h1 className={styles.navtitle}>Menu</h1>
            <div className={styles.link}>
              <div className={styles.grouplinks}>
                <HomeIcon className={styles.icons} />
                <NavLink href="/">Home</NavLink>
              </div>
              <div className={styles.grouplinks}>
                <FolderPlusIcon className={styles.icons} />
                <NavLink href="/">Ajouter</NavLink>
              </div>
            </div>
          </div>
          <div className={styles.group}>
            <h1 className={styles.navtitle}>Settings</h1>
            <div className={styles.link}>
              <div className={styles.grouplinks}>
                <UserIcon className={styles.icons} />
                <NavLink href="/">Profile</NavLink>
              </div>
              <div className={styles.grouplinks}>
                <ArrowLeftOnRectangleIcon className={styles.icons} />
                <NavLink href="/">Logout</NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.containerbis}>
          <ChevronRightIcon className={styles.open} onClick={handleOpen} />
          <div className={styles.userbis}>
            <Image
              src={"/images/test.jpg"}
              width={50}
              height={20}
              alt="user"
              className={styles.imagebis}
            />
          </div>
          <div className={styles.groupbis}>
            <h1 className={styles.navtitlebis}>Menu</h1>
            <div className={styles.linkbis}>
              <div className={styles.grouplinksbis}>
                <HomeIcon className={styles.icons} />
              </div>
              <div className={styles.grouplinksbis}>
                <FolderPlusIcon className={styles.icons} />
              </div>
            </div>
          </div>
          <div className={styles.groupbis}>
            <h1 className={styles.navtitlebis}>Settings</h1>
            <div className={styles.linkbis}>
              <div className={styles.grouplinksbis}>
                <UserIcon className={styles.icons} />
              </div>
              <div className={styles.grouplinksbis}>
                <ArrowLeftOnRectangleIcon className={styles.icons} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NavBar
