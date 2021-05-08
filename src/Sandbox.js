import React, { useReducer } from 'react';

function init(initialCount) {
    return {
        test: "",
        values: {
            count1: initialCount,
            count2: initialCount,
            count3: initialCount
        }
    }
};

function reducer(state, action) {
    let yo = { // Represents Form input values object
        values: {
            count1: 0,
            count2: 0,
            count3: 0
        }
    }
    switch (action.type) {
        case 'increment':   
            return {
                values: {
                    count1: state.values.count1 + 1,
                    count2: state.values.count2 + 2,
                    count3: state.values.count3 + 3
                }
            };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { values: yo.values } 

        default:
            throw new Error();
    }
}

function Sandbox({ initialCount }) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);

    return (
        <>
            Count 1: {state.values.count1} <br></br>
            Count 2: {state.values.count2} <br></br>
            Count 3: {state.values.count3} <br></br>
            <button
                onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
                Reset
            </button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    );
}

export default Sandbox;