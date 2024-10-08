const GET_MACRO_ID = '/get/macro/id'
const CREATE_MACRO = '/create/macro'
const GET_ALL_MACROS = '/get/all/macros'
const EDIT_MACRO = '/edit/macro'
const DELETE_MACRO = '/delete/macro'


const getAllMacros = (macros) => ({
    type: GET_ALL_MACROS,
    payload: macros
})

const createMacro = (macro) => ({
  type: CREATE_MACRO,
  payload: macro
})

const getMacroById = (macro) => ({
  type: GET_MACRO_ID,
  payload: macro
})

const editMacro = (newMacro) => ({
  type: EDIT_MACRO,
  payload: newMacro
})

const deleteMacro = (deletedMacro) => ({
  type: DELETE_MACRO,
  payload: deletedMacro
})
export const getAllMacrosThunk = () => async (dispatch) => {
    const response = await fetch(`/api/macro/`)
    // console.log("macros OK", response)
    if (response.ok) {
        
        const macros = await response.json()
        
        dispatch(getAllMacros(macros))
        // console.log("customer")
    } else {
        console.log(" ")
    }
}

export const getMacroByIdThunk = (macroId) => async (dispatch) => {
  const response = await fetch(`/api/macro/${macroId}`)
  if (response.ok) {
    const macro = await response.json()
    dispatch(getMacroById(macro))
  }
}

export const createMacroThunk = (macro) => async (dispatch) => {
  const response =  await fetch('/api/macro/create', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(macro)
  })
  if (response.ok) {
    const macro = await response.json()
    dispatch(createMacro(macro))
  } else {
    console.log(" ")
  }
}

export const editMacroThunk = (newMacro, macroId) => async (dispatch) => {
  const response = await fetch(`/api/macro/edit/${macroId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newMacro)
  })
  if (response.ok){
    const newMacro = await response.json()
    dispatch(editMacro(newMacro))
  }
}

export const deleteMacroThunk = (macroId) => async (dispatch) => {
  const response = await fetch (`/api/macro/${macroId}/delete`)
  if (response.ok) {
    const deletedMacro = response.json()
    dispatch(deleteMacro(deletedMacro))
    
  }
}

const initialState = {}


function applyMacroReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_MACROS:
        return {...state, macros: action.payload}
      case GET_MACRO_ID:
        return {...state, Macro: action.payload}
      case EDIT_MACRO:
        return {...state, NewMac: action.payload}
      case DELETE_MACRO:
        return {...state, DeleteMacro: action.payload }
      case CREATE_MACRO:
        return {...state, CreatedMac: action.payload}
      default:
        return state;
    }
  }

export default applyMacroReducer