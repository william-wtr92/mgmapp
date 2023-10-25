import React from "react"
import Link from "./Link"
import { Props as LinkProps } from "./Link"
import styles from "@/styles/components/NavLink.module.css"
import { useRouter } from "next/router"
import classNames from "classnames"

interface NavLinkProps extends LinkProps {}

interface CustomNavLinkProps extends NavLinkProps {
  Icon?: any
  label?: string
  opened?: boolean
}

export const NavLink: React.FC<CustomNavLinkProps> = ({
  Icon,
  href,
  children,
  label,
  opened,
}) => {
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      {Icon ? (
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} onClick={() => router.push(href)} />
        </div>
      ) : null}

      <Link href={href} className={styles.link}>
        {label}
      </Link>
    </div>
  )
}
