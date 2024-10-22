import React, {useEffect} from 'react';

import {
    MemoListContainer,
    MemoItem
} from './ListElements'

function MemoList(props) {
    const {currentMemoKey, setCurrentMemoKey} = props;
    const memos = localStorage.getItem("memos")
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
            </>
        );
    };

    return renderMemoList();
}

export default MemoList;
