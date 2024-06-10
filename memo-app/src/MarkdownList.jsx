import React from 'react';
import styled from "styled-components";

// TODO:
//      localStorageに保存したデータ(メモのタイトル)がリストに表示されるようにする
//      全体の

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
