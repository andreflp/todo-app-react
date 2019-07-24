import React, { Component } from "react"
import PageHeader from "../template/pageHeader"
import TodoForm from "./todoForm"
import TodoList from "./todoList"
import axios from "axios"

const url = "http://localhost:3003/api/todos"

export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: "",
      list: []
    }

    this.refresh()
  }

  refresh = async (description = "") => {
    try {
      const search = description ? `&description__regex=/${description}/` : ""
      let list = await axios.get(`${url}?sort=-createdAt${search}`)
      this.setState({ ...this.state, description, list: list.data })
    } catch (error) {
      console.log(error)
    }
  }

  handleAdd = async () => {
    const description = this.state.description
    try {
      await axios.post(url, { description })
      this.refresh()
      console.log("DEU LIGA FEI")
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = e => {
    this.setState({ ...this.state, description: e.target.value })
  }

  handleRemove = async todo => {
    try {
      await axios.delete(`${url}/${todo._id}`)
      this.refresh(this.state.description)
    } catch (error) {
      console.log(error)
    }
  }

  handleMarkAsDone = async todo => {
    try {
      await axios.put(`${url}/${todo._id}`, { ...todo, done: true })
      this.refresh(this.state.description)
    } catch (error) {
      console.log(error)
    }
  }

  handleMarkAsPending = async todo => {
    try {
      await axios.put(`${url}/${todo._id}`, { ...todo, done: false })
      this.refresh(this.state.description)
    } catch (error) {
      console.log(error)
    }
  }

  handleSearch = () => {
    this.refresh(this.state.description)
  }

  handleClear = () => {
    this.refresh()
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm
          handleAdd={this.handleAdd}
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear}
          description={this.state.description}
        />
        <TodoList
          list={this.state.list}
          handleRemove={this.handleRemove}
          handleMarkAsDone={this.handleMarkAsDone}
          handleMarkAsPending={this.handleMarkAsPending}
        />
      </div>
    )
  }
}
