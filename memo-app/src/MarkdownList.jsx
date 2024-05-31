import React from 'react';
import styled from "styled-components";

// TODO:
//      localStorageに保存したデータ(メモのタイトル)がリストに表示されるようにする
//      全体の

function MarkdownList() {
    return (
        <ListContainer>
            <p>こんにちは!</p>
        </ListContainer>
    )
}

const ListContainer = styled.p`
    min-width: 200px;`
export default MarkdownList;
