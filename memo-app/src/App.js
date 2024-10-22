import MarkdownEditor from './MarkdownEditor'
import MarkdownList from "./MarkdownList.jsx";
import styled from "styled-components";
import MemoList from "./MarkdownList.jsx";
import {useState} from "react";

const MarkdownWrapper = styled.div`
display: flex;
height: max-content;
background-color: #f3f3f3;`

function App() {
    const [currentMemoKey, setCurrentMemoKey] = useState("");
    return (
        <MarkdownWrapper>
            <MemoList currentMemoKey={currentMemoKey} setCurrentMemoKey={setCurrentMemoKey}/>
            <MarkdownEditor currentMemoKey={currentMemoKey} setCurrentMemoKey={setCurrentMemoKey} />
        </MarkdownWrapper>
    );
}

export default App;
