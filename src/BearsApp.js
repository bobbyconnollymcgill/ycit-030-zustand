import { useState } from "react"
import create from "zustand"

const useBearStore = create((set) => {
    return {
        bears: 0,

        increasePopulation: () => {
            set((state) => {
                const newState = { bears: state.bears + 1 }
                return newState
            })
        },

        removeAllBears: () => {
            const newState = { bears: 0 }
            set(newState)
        },
    }
})

export function App() {
    const { bears, increasePopulation, removeAllBears } = useBearStore()

    return (
        <div className="App">
            <h1>{bears} bears around here ...</h1>
            <button onClick={() => increasePopulation()}>
                Increase population
            </button>
            <button onClick={() => removeAllBears()}>Meteor strike!</button>
        </div>
    )
}
