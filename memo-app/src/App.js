import './App.css';

import MarkdownEditor from './MarkdownEditor'
import MarkdownList from "./MarkdownList.jsx";
import styled from "styled-components";

const MarkdownWrapper = styled.div`
display: flex;`

function App() {
    return (
        <MarkdownWrapper>
            <MarkdownList/>
            <MarkdownEditor/>
        </MarkdownWrapper>
    );
}

export default App;
