import React from "react"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <div className="global-wrapper">
      <main>{children}</main>
    </div>
  )
}

export default Layout
