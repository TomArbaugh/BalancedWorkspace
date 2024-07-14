const GET_CUSTOMER_ID = '/get/customer/id'
const GET_ALL_CUSTOMERS = '/get/all/customers'

const getCustomerId = (customer) => ({
    type: GET_CUSTOMER_ID,
    payload: customer
})

const getAllCustomers = (customers) => ({
  type: GET_ALL_CUSTOMERS,
  payload: customers
})

export const getCustomerIdThunk = (requesterId) => async (dispatch) => {
    const response = await fetch(`/api/customers/${requesterId}`)
    console.log("CUSTOMER OK", requesterId)
    if (response.ok) {
      console.log("customer")
        const customer = await response.json()
        
        dispatch(getCustomerId(customer))
        
    } else {
        console.log("NO SUCH CUSTOMER")
    }
}

export const getAllCustomersThunk =  () => async (dispatch) => {
  const response = await fetch('/api/customers/')
  if (response.ok) {
    
    const customers = await response.json()
    // console.log("IM OK", customers)
    getAllCustomers(customers)
  }
}

const initialState = {}


function customerReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CUSTOMER_ID:
        return {...state, customer: action.payload}
      case GET_ALL_CUSTOMERS:
        return {...state, allCustomers: action.payload}
      default:
        return state;
    }
  }

export default customerReducer