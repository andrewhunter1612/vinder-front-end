import {useState} from 'react'
import './NoButton.css'
import { ImCross } from "react-icons/im";

const NoButton = ({option, potentialMatches, selectOption}) => {

    const [notMatched, setNotMatched] = useState([])

    const handleMatchNo = (event) => {
        event.preventDefault()
        const addNotMatched = potentialMatches.filter(match => match.name == option.name)
        if (notMatched.length) {
            setNotMatched(notMatched.concat(addNotMatched[0]))
        } else {
            setNotMatched(addNotMatched)
        }
        potentialMatches.splice(potentialMatches.indexOf(addNotMatched[0]), 1)
        selectOption()
    }

return (
    <div className="button">
        <form action="">
        <button className="swipe-btn-no" value={option.name} onClick={handleMatchNo}>
            <div className="cross"> <ImCross /></div>
        </button>
        </form>
    </div>
)

}

export default NoButton