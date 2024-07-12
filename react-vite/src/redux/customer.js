const GET_CUSTOMER_ID = '/get/customer/id'

const getCustomerId = (customer) => ({
    type: GET_CUSTOMER_ID,
    payload: customer
})

export const getCustomerIdThunk = (requesterId) => async (dispatch) => {
    const response = await fetch(`/api/customers/${requesterId}`)
    // console.log("CUSTOMER OK", response)
    if (response.ok) {
        
        const customer = await response.json()
        
        dispatch(getCustomerId(customer))
        // console.log("customer")
    } else {
        console.log("NO SUCH CUSTOMER")
    }
}

const initialState = {}


function customerReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CUSTOMER_ID:
        return {...state, customer: action.payload}
      default:
        return state;
    }
  }

export default customerReducer