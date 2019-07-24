import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import "../template/custom.css"
import Routes from "../main/routes"

export default props => {
  return (
    <div className="container">
      <Routes />
    </div>
  )
}
