const GET_MACRO_ID = '/get/macro/id'
const CREATE_MACRO = '/create/macro'
const GET_ALL_MACROS = '/get/all/macros'

const getMacroId = (macros) => ({
    type: GET_MACRO_ID,
    payload: macros
})

const createMacro = (macro) => ({
  type: CREATE_MACRO,
  payload: macro
})


export const getMacroIdThunk = () => async (dispatch) => {
    const response = await fetch(`/api/macro/`)
    // console.log("macros OK", response)
    if (response.ok) {
        
        const macros = await response.json()
        
        dispatch(getMacroId(macros))
        // console.log("customer")
    } else {
        console.log("NO SUCH CUSTOMER")
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
    console.log("There was an error making your Customer")
  }
}

const initialState = {}


function applyMacroReducer(state = initialState, action) {
    switch (action.type) {
      case GET_MACRO_ID:
        return {...state, macros: action.payload}
      default:
        return state;
    }
  }

export default applyMacroReducer