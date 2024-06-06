import MarkdownEditor from './MarkdownEditor'
import MarkdownList from "./MarkdownList.jsx";
import styled from "styled-components";

const MarkdownWrapper = styled.div`
display: flex;`

console.log(JSON.parse(localStorage.getItem("markdown")))

function App() {
    return (
        <MarkdownWrapper>
            <MarkdownList/>
            <MarkdownEditor/>
        </MarkdownWrapper>
    );
}

export default App;
