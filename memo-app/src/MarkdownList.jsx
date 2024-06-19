import React, {useEffect} from 'react';
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
    line-height: 20px;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const DeleteMemoButton = styled.button`
    width: 20px;
    height: 20px;`;

function MemoList(props) {
    const {currentMemoKey, setCurrentMemoKey} = props;
    const memos = localStorage.getItem("memos")
    console.log(memos=== "undefined");
    const parsed_memos = (memos === "undefined" || memos === null) ? [] : JSON.parse(memos);

    useEffect(() => {
        renderMemoList();
    }, [currentMemoKey]); // 依存関係配列にcurrentMemoKeyを追加

    const renderMemoList = () => {
        return (
            <>
                <MemoListContainer>
                    {parsed_memos.map(memo => {
                            return <MemoItem
                                key={memo.key}
                                onClick={() => setCurrentMemoKey(memo.key)}
                                isactive={memo.key === currentMemoKey}
                            >
                                {memo.title || "無題のメモ"}
                            </MemoItem>
                        }
                    )}
                </MemoListContainer>
                {/*<DeleteMemoButton*/}
                {/*    key={currentMemoKey}*/}
                {/*    onClick={() => console.log("このボタンを使ってメモを削除したい")}/>*/}
            </>
        );
    };

    return renderMemoList();
}

export default MemoList;
