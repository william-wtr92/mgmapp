import React, { FC }  from 'react'
import styles from "@/styles/components/Modal.module.css"
import classNames from 'classnames';

export type Props = {
  children: any;
  opened: boolean;
  size: string;
}

const Modal: FC<Props> = (props) => {
  const { children, opened, size } = props

  const modalSize = () => {
    switch (size) {
      case "small": return styles.small;
      case "medium": return styles.medium;
      case "large": return styles.large;
      default: return styles.fitContent
    }
  }


  return (
    <div className={classNames(
      styles.modal,
      opened ? styles.opened : styles.closed,
      modalSize()
    )}
    >
      {children}
    </div>
  )
}

export default Modal;