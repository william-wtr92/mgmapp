import React from "react"
import Link from "./Link"
import { Props as LinkProps } from "./Link"
import styles from "@/styles/components/NavLink.module.css"
import { useRouter } from "next/router"
import classNames from "classnames"

interface CustomNavLinkProps { 
  Icon: any;
  label?: string;
  onClickAction: () => void;
}

export const NavbarBtn: React.FC<CustomNavLinkProps> = ({
  Icon,
  label,
  onClickAction,
}) => {

  const router = useRouter();

  return (
    <div
      className={styles.wrapper}
      onClick={() => onClickAction()} 
    >
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>

        <p className={styles.link}>
        {label}
      </p>
    </div>
  )
}
