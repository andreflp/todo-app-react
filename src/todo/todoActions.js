import axios from "axios"

const URL = "http://localhost:3003/api/todos"

export const changeDescription = event => ({
  type: "DESCRIPTION_CHANGED",
  payload: event.target.value
})

export const search = description => {
  return async (dispatch, getState) => {
    const description = getState().todo.description
    const search = description ? `&description__regex=/${description}/` : ""
    const request = await axios.get(`${URL}?sort=-createdAt${search}`)
    dispatch({ type: "TODO_SEARCHED", payload: request.data })
  }
}

export const add = description => {
  return async dispatch => {
    try {
      await axios.post(URL, { description })
      dispatch(clear())
      dispatch(search())
    } catch (error) {
      console.log(error)
    }
  }
}

export const markAsDone = todo => {
  return async dispatch => {
    try {
      await axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
    } catch (error) {
      console.log(error)
    }
    dispatch(search())
  }
}

export const markAsPending = todo => {
  return async dispatch => {
    try {
      await axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
      dispatch(search())
    } catch (error) {
      console.log(error)
    }
  }
}

export const remove = todo => {
  return async dispatch => {
    try {
      await axios.delete(`${URL}/${todo._id}`)
      dispatch(search())
    } catch (error) {
      console.log(error)
    }
  }
}

export const clear = () => {
  return [
    {
      type: "TODO_CLEAR"
    },
    search()
  ]
}
