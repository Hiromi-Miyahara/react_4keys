import './App.css';
import React, {useState} from 'react';


// TODO: state使って入力された値がリストに残るようにする
function TodoDiv() {
    const [todos, setTodos] = useState([])

    const clickHandler = (e) => {
        console.log("hello world")
    }

    return (
        <div className="todoDiv">
            <form onSubmit={clickHandler}>
                <input/>
                <button>追加</button>
            </form>
        </div>
    )
}

function ListDiv() {
    return (
        <tr className="listDiv">
            <td>hello world</td>
        </tr>
    )
}

function App() {
    return (
        <>
            <div className="App">
                <TodoDiv/>
            </div>
            <ListDiv/>
        </>
    );
}

export default App;
