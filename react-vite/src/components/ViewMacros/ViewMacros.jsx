import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllMacrosThunk } from "../../redux/macro"
import { Link } from "react-router-dom"
import { useModal } from "../../context/Modal"
import EditMacro from "../EditMacro/EditMacro"
import DeleteMacro from "../DeleteMacro/DeleteMacro"
import "./ViewMacros.css"
import NavCom from "../NavComp/NavComp"

/**
 * ViewMacros component displays a list of all macros for the current user.
 * Shows macro details including ID, assignee, name, and description.
 * Provides functionality to edit and delete macros through modal interfaces.
 * 
 * @returns {JSX.Element} The macro list view with edit/delete actions
 */
function ViewMacros() {

    const dispatch = useDispatch()
    const macros = useSelector((state) => state.applyMacro)
    const { setModalContent } = useModal()
    const newMac = macros.NewMac
    const deletedMac = macros.DeleteMacro
    const createdMac = macros.CreatedMac

    useEffect(() => {
        dispatch(getAllMacrosThunk())
    }, [dispatch, newMac, deletedMac, createdMac])


    useEffect(() => {

    }, [macros])

    const handleEditClick = (macroId) => {
        setModalContent(<EditMacro macroId={macroId} />);
    };

    const handleDeleteClick = (macroId) => {
        setModalContent(<DeleteMacro macroId={macroId} />);
    };

    if (Object.keys(macros).length === 0) return null

    return (
        <div className="whole-view-macro">
            <NavCom />
            <div id="view-macro-top-head">
                <div className="macro-header">
                    <h1>Macros</h1>
                    <h4>({macros.macros.length}) Macros</h4>
                </div>

                {macros.macros.map((macro) => (
                    <div key={macro.id} id="macro-button-container">

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
                                    <div id="macro-description" className="macro-element">{macro.description}</div>
                                </Link>
                            </div>
                        </div>
                        <div id="button-inner-container">
                            <div className="macro-buttons" onClick={() => handleEditClick(macro.id)}>
                                Edit
                            </div>
                            <div className="macro-buttons" onClick={() => handleDeleteClick(macro.id)}>
                                Delete
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ViewMacros