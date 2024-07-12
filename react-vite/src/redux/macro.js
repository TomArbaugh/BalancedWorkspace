const GET_MACRO_ID = '/get/macro/id'

const getMacroId = (macros) => ({
    type: GET_MACRO_ID,
    payload: macros
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