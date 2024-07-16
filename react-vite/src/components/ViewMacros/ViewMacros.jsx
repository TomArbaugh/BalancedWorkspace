import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getMacroIdThunk } from "../../redux/macro"
import { Link } from "react-router-dom"
import "./ViewMacros.css"


function ViewMacros(){

    const dispatch = useDispatch()

        useEffect(() => {
        dispatch(getMacroIdThunk())
    }, [dispatch])
    
    const macros = useSelector((state) => state.applyMacro)


    useEffect(() => {

    }, [macros])

    if (Object.keys(macros).length === 0) return null 
    return (
        <div>
             <div className="macro-header">
            <h1>Macros</h1>
            <h4>({macros.macros.length}) Macros</h4>
            </div>
     
            {macros.macros.map((macro) => (
                <div id="macro-card-and-headers">
                       <div id="view-macro-headers">
                       <h3 className="macro-labels">Id #</h3>
                       <h3 className="macro-labels">Assignee #</h3>
                       <h3 className="macro-labels">Name</h3>
                       <h3 className="macro-labels">Description</h3>
                   </div>
                <div key={macro.id} className="macro-card">
                    <Link
                    className="view-macro-preview"
                    >
                <h4 className="macro-element">{macro.id}</h4>
                <h4 className="macro-element">{macro.user_id}</h4>
                     <h4 className="macro-element">{macro.name}</h4>
                     <h4 className="macro-element">{macro.description}</h4>
                     </Link>
                     </div>
                     </div>
            ))}
           
        </div>
       
    )
}

export default ViewMacros