import React from "react"
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import Menu from "../template/menu"
import Todo from "../todo/todo"
import About from "../about/about"

export default props => (
  <BrowserRouter>
    <Menu />
    <Route path="/todos" component={Todo} />
    <Route path="/about" component={About} />
    <Redirect from="*" to="/todos" />
  </BrowserRouter>
)
