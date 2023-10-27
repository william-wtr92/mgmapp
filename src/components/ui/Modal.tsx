import React, { Dispatch, FC, SetStateAction, useCallback } from "react"
import styles from "@/styles/components/Modal.module.css"
import classNames from "classnames"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { ModalType } from "@/types/modal/ModalType"

export type Props = {
  children: any
  opened: boolean
  size: string
  setModalType: Dispatch<SetStateAction<ModalType>>
}

const Modal: FC<Props> = (props) => {
  const { children, opened, size, setModalType } = props

  const modalSize = () => {
    switch (size) {
      case "small":
        return styles.small

      case "medium":
        return styles.medium

      case "large":
        return styles.large

      default:
        return styles.fitContent
    }
  }

  const closeModal = useCallback(() => {
    setModalType("")
  }, [setModalType])

  return (
    <div
      className={classNames(
        styles.overlay,
        !opened ? styles.hidden : styles.visible,
      )}
    >
      <div
        className={classNames(
          styles.modal,
          opened ? styles.opened : styles.closed,
          modalSize(),
        )}
      >
        <button className={styles.closeButton} onClick={() => closeModal()}>
          <XMarkIcon className={styles.icon} />
          <p>Fermer</p>
        </button>

        {children}
      </div>
    </div>
  )
}

export default Modal
