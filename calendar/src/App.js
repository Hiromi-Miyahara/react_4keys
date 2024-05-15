import './App.css';
import React, {useState} from 'react';

function App() {
    const [listItems, setListItems] = useState([])

    function TodoDiv() {
        const [inputText, setInputText] = useState('')
        const resetInputText = () => {
            return setInputText('')
        }

        const addListItem = () => {
            setListItems([...listItems, inputText])
        }

        const deleteListItem = (deleteText) => {
            setListItems(listItems.filter((item) => item !== deleteText))
        }

        const renderListItems = () => {
            return listItems.map((listItem, index) => (
                <div key={index}>
                    <div className="itemText">{listItem}</div>
                    <button onClick={() => {
                        deleteListItem(listItem)
                    }}>削除
                    </button>
                </div>
            ));
        };

        const handleSubmit = (event) => {
            event.preventDefault();
        };
        return (
            <div className="todoDiv">
                <form onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <input onChange={(e) => setInputText(e.target.value)} value={inputText}/>
                    <div>"現在の入力中の文字列: {inputText}
                        "{renderListItems()}
                    </div>
                    <button onClick={resetInputText}>入力中の文字列をリセット
                    </button>
                    <button onClick={addListItem}>追加
                    </button>
                </form>
            </div>
        )
    }

    function ListDiv() {
        return (
            <tr className="listDiv">
                <td></td>
            </tr>
        )
    }


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
