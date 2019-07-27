import React, { Component } from "react"
import Grid from "../template/grid"
import IconButton from "../template/iconButton"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { changeDescription, search, add, clear } from "./todoActions"

class TodoForm extends Component {
  componentWillMount() {
    this.props.search()
  }

  keyHandler = e => {
    const { add, search, description, clear } = this.props
    if (e.key === "Enter") {
      e.shiftKey ? search() : add(description)
    } else if (e.key === "Escape") {
      clear()
    }
  }

  render() {
    const { add, search, description, clear, changeDescription } = this.props
    return (
      <div className="todoForm">
        <Grid cols="12 9 10">
          <input
            id="description"
            className="form-control"
            placeholder="Adicione uma tarefa"
            type="text"
            onKeyUp={this.keyHandler}
            onChange={changeDescription}
            value={description}
          />
        </Grid>
        <Grid cols="12 3 2">
          <IconButton
            style="primary"
            icon="plus"
            onClick={() => add(description)}
          />
          <IconButton style="info" icon="search" onClick={() => search()} />
          <IconButton style="default" icon="close" onClick={clear} />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  description: state.todo.description
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeDescription,
      search,
      add,
      clear
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm)
