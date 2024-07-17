import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllCustomersThunk } from "../../redux/customer"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteCustomer from "../DeleteCustomer/DeleteCustomer"
import EditCustomer from "../EditCustomer/EditCustomer"
import "./ViewCustomers.css"


function ViewCustomers(){

    const dispatch = useDispatch()
    const customer = useSelector((state) => state.customer)
    const newCustomer = customer.newCustomer
    const deletedCustomer = customer.CustomerDeleted
    const createdCustomer = customer.CreatedCustomer

    useEffect(() => {
        dispatch(getAllCustomersThunk())
    }, [dispatch, newCustomer, deletedCustomer, createdCustomer])
    
    


    useEffect(() => {

    }, [customer])

   if (!customer.allCustomers) return null;
    return (
        <div>
             <div className="customer-header">
            <h1>Customers</h1>
            <h4>({customer.allCustomers.length}) Customers</h4>
            </div>
            <div id="view-customer-headers">
                <h3 className="customer-labels">Id #</h3>
                <h3 className="customer-labels">Assignee #</h3>
                <h3 className="customer-labels">Name</h3>
                <h3 className="customer-labels">Email</h3>
                <h3 className="customer-labels">Options</h3>
            </div>
            {customer.allCustomers.map((customer) => (
                
                <div key={customer.id} className="customer-card">
            
                    <div className="view-customer-preview">
                    
                    
                <h4 className="customer-element">{customer.id}</h4>
                <h4 className="customer-element">{customer.user_id}</h4>
                     <h4 className="customer-element">{customer.name}</h4>
                     <h4 className="customer-element">{customer.email}</h4>
                     
                     <div className="customer-element">
                    <div className="customer-buttons">
                    <OpenModalMenuItem 
                    
                    itemText="Edit"
                     modalComponent={<EditCustomer customerId={customer.id}/>}
                    />
                    </div>
                    <div className="customer-buttons">
                     <OpenModalMenuItem 
    
                    itemText="Delete"
                     modalComponent={<DeleteCustomer customerId={customer.id}/>}
                    />
                    </div>
                    </div>
                    </div>
                     </div>
            ))}
           
        </div>
       
    )
}

export default ViewCustomers