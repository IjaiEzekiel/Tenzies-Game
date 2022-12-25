import React, { useRef } from "react"
import Confetti from "react-confetti"
import Die from "./Components/Die"
import "./styles.css"

export default function App() {
    const sides = ['one', 'two', 'three', 'four', 'five', 'six'];
    const [rollCount, setRollCount] = React.useState(0)
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [bestRoll, setBestRoll] = React.useState(
    parseInt(localStorage.getItem("bestRoll")) || 0
    )
    
    React.useEffect(() => {
        const firstValue = dice[0].value
        const allHeld = dice.every(die => die.held)
        const allSameNumber = dice.every(die => die.value === firstValue)
        if(allHeld && allSameNumber) {
            setTenzies(true)
        }
    }, [dice])
    
    React.useEffect(() => {
    localStorage.setItem("bestRoll", bestRoll.toString());
    }, [bestRoll]);

    function randomDieValue() {
        let randNum = Math.floor(Math.random() * 6)
        return sides[randNum]
    }
    
    function allNewDice() {
        const newArray = []
        for(let i = 0; i < 10; i++) {
            const newDie = {
                value: randomDieValue(),
                held: false,
                id: i + 1
            }
            newArray.push(newDie)
        }
        return newArray
    }
    

    function rollUnheldDice() {
        if (!tenzies) {
            setDice((oldDice) => oldDice.map((die, i) =>
            die.held ? 
            die : 
            { value: randomDieValue(), held: false, id: i + 1 }
            ))
            setRollCount(rollCount + 1)
            
        } else {
            if (!bestRoll || rollCount < bestRoll) {
                setBestRoll(rollCount);
            }
            setDice(allNewDice())
            setTenzies(false)
            setRollCount(0)
        }
    }

    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? 
                {...die, held: !die.held} : 
                die
        }))
    }

    const diceElements = dice.map((die) => (
        <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">{diceElements}</div>
            {tenzies ? <h4>Your best roll is: {bestRoll}</h4> : <h4>Your roll is: {rollCount}</h4>}
            <button className="roll-dice" onClick={rollUnheldDice}>
                {tenzies ? "Reset Game" : "Roll"}
            </button>
            
        </main>
    )
}
