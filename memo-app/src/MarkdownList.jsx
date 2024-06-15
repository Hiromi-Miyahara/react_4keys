import React from 'react';
import styled from "styled-components";

const savedMarkdown = JSON.parse(localStorage.getItem("markdown"));

const ListContainer = styled.ul`
    width: 250px;
    padding: 0;

    li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

function MarkdownList() {
    return (
        <ListContainer className="listWrapper">
                <li className="listContentTemp">{savedMarkdown.title}</li>
        </ListContainer>
    )
}

export default MarkdownList;
