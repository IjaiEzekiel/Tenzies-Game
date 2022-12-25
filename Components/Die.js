import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Die(props) {
    const styles = {
        // backgroundColor: props.held ? "#59E391" : "white",
        color: props.held ? "#59E391" : "black"
    }
    return (
        <div className="die-face" onClick={props.hold} style={styles}>
            <div className="die-num"><i className={`fa-solid fa-dice-${props.value}`}></i></div>
        </div>
    )
}
