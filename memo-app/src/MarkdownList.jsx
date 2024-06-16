import React from 'react';
import styled from "styled-components";

const MemoListContainer = styled.div`
    background-color: #f3f3f3;
    padding: 20px;
    margin: 20px 0;
    width: 100%;
    min-width: 300px;
    max-width: 500px;
`;

const MemoItem = styled.div`
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height:20px ;

    &:hover {
        background-color: #f0f0f0;
    }
`;


function MemoList(props) {
    const {setCurrentMemoKey} = props
    const memos = JSON.parse(localStorage.getItem("memos"));
    return (
        <MemoListContainer>
            {memos.map(memo => (
                <MemoItem key={memo.key} onClick={() => setCurrentMemoKey(memo.key)}>
                    {memo.title || "無題のメモ"}
                </MemoItem>
            ))}
        </MemoListContainer>

    );
}

export default MemoList;
