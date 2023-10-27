import React from "react"
import styles from "@/styles/components/NavLink.module.css"

interface CustomNavLinkProps {
  Icon: any
  label?: string
  onClickAction: () => void
}

export const NavbarBtn: React.FC<CustomNavLinkProps> = ({
  Icon,
  label,
  onClickAction,
}) => {
  return (
    <div className={styles.wrapper} onClick={() => onClickAction()}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>

      <p className={styles.link}>{label}</p>
    </div>
  )
}
