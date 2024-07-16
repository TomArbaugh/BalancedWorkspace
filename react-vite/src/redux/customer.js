const GET_CUSTOMER_ID = '/get/customer/id'
const GET_ALL_CUSTOMERS = '/get/all/customers'
const CREATE_CUSTOMER = '/create/customer'

const getCustomerId = (customer) => ({
    type: GET_CUSTOMER_ID,
    payload: customer
})

const getAllCustomers = (customers) => ({
  type: GET_ALL_CUSTOMERS,
  payload: customers
})

const createCustomer = (customer) => ({
  type: CREATE_CUSTOMER,
  payload: customer
})

export const getCustomerIdThunk = (requesterId) => async (dispatch) => {
    const response = await fetch(`/api/customers/${requesterId}`)
    // console.log("CUSTOMER OK", requesterId)
    if (response.ok) {
      // console.log("customer")
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
    
    dispatch(getAllCustomers(customers))
    // console.log("IM OK", customers)
  }
}

export const createCustomerThunk = (customer) => async (dispatch) => {
  const response =  await fetch('/api/customers/create', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(customer)
  })
  if (response.ok) {
    const customer = await response.json()
    dispatch(createCustomer(customer))
  } else {
    console.log("There was an error making your Customer")
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