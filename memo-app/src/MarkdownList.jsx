import React from 'react';
import styled from "styled-components";

// TODO:
//      localStorageに保存したデータ(メモのタイトル)がリストに表示されるようにする
//      全体の

const savedMarkdown = JSON.parse(localStorage.getItem("markdown"));


function MarkdownList() {
    return (
        <ListContainer>

            <p>{savedMarkdown.title}</p>
        </ListContainer>
    )
}

const ListContainer = styled.p`
    min-width: 200px;`
export default MarkdownList;
