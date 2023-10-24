// Dans NavLink.tsx
import { useRouter } from "next/router"
import React from "react"
import classNames from "classnames"
import Link from "./Link"
import { Props as LinkProps } from "./Link"

interface NavLinkProps extends LinkProps {}

export const NavLink: React.FC<NavLinkProps> = ({
  className,
  ...otherProps
}) => {
  const { asPath } = useRouter()

  const combinedClassName = classNames("text-sm", className, {
    underline: asPath === otherProps.href,
  })

  return <Link {...otherProps} className={combinedClassName} />
}
