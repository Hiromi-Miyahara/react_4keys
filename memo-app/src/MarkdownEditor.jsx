import React, {useState, useEffect, useMemo} from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {marked} from "marked";
import DOMPurify from "dompurify";
import hljs from 'highlight.js'
import "highlight.js/styles/github.css";
import styled from "styled-components"
import "./easyMDE.css";

import {
    EditorContainer,
    Input,
    MarkDownInput,
    PreviewTitle,
    PreviewText,
    CodeBackGroundColor

} from './EditorElements'

// TODO; h1とかの大文字が画面幅を変えると小さくなってしまう
// TODO; 新しいメモを作成した時に、即時に左側にメモができるようにしてほしい
// TODO: コードハイライトが消えている
// TODO; フォーカスを当てた時に、そこより後ろの文字が消えてしまっている。
// TODO : メモの順番をソートできるように、メモの要素に作成日時的なものをつけてあげたい。
// TODO; 作成したメモを削除できるようにしたい
// TODO; 設計を考える
// TODO; 新しいメモ作成ボタンの位置、デザインを整える
// TODO; タイトルを変更した時に、リストのタイトルも動的に変わるようにしたい
// TODO; メモを削除した時に、左のメモも動的に減るようにしたい

// TODO: プレビュー側の改行が効いていない

function MarkdownEditor(props) {
    const {currentMemoKey, setCurrentMemoKey} = props
    const [memos, setMemos] = useState(() => {
        const savedMemos = localStorage.getItem("memos");
        return (savedMemos === "undefined" || savedMemos === null) ? [] : JSON.parse(savedMemos);
    });

    const [currentMemo, setCurrentMemo] = useState(() => {
        const initialMemo = {title: "", text: "", key: getUniqueStr()};
        if (currentMemoKey) {
            const foundMemo = memos.find(memo => memo.key === currentMemoKey);
            return foundMemo ? foundMemo : initialMemo;
        }
        return initialMemo;
    })

    useEffect(() => {
        localStorage.setItem("memos", JSON.stringify(memos));
    }, [memos]);

    useEffect(() => {
        hljs.highlightAll();
    }, [currentMemo.text, currentMemoKey]);

    useEffect(() => {
        setCurrentMemo(() => {
            const foundMemo = memos.find(memo => memo.key === currentMemoKey);
            return foundMemo ? foundMemo : currentMemo;
        });
    }, [currentMemoKey])

    const changeTitle = (value) => {
        const updatedMemo = {
            ...currentMemo,
            title: value.target.value,
            key: currentMemo.key || getUniqueStr()
        };
        setCurrentMemo(updatedMemo);
        updateMemos(updatedMemo);
    }

    const changeText = (value) => {
        const updatedMemo = {
            ...currentMemo,
            text: value,
            key: currentMemo.key || getUniqueStr()
        };
        setCurrentMemo(updatedMemo);
        updateMemos(updatedMemo);
    }

    function getUniqueStr(myStrong) {
        var strong = 1000;
        if (myStrong) strong = myStrong;
        return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
    }

    const markdownOptions = useMemo(() => ({
        toolbar: false,
        highlight: (code, lang) => {
            const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language: validLanguage}).value;
        },
        minHeight: "500px",
        spellChecker: false,
        initialValue: "文字を入力",
    }), []);

    const createNewMemo = () => {
        const newMemo = {title: "", text: "", key: getUniqueStr()};
        setCurrentMemo(newMemo);
        setCurrentMemoKey(newMemo.key);
        setMemos([...memos, newMemo]);
    }

    const deleteCurrentMemo = () => {
        const remainMemos = memos.filter(memo => memo.key !== currentMemoKey)
        setMemos(remainMemos)
    }

    const updateMemos = (updatedMemo) => {
        setMemos(prevMemos => {
            const memoIndex = prevMemos.findIndex(memo => memo.key === updatedMemo.key);
            if (memoIndex > -1) {
                const newMemos = [...prevMemos];
                newMemos[memoIndex] = updatedMemo;
                return newMemos;
            } else {
                return [...prevMemos, updatedMemo];
            }
        });
    };

    return <EditorContainer className="markdownWrapper">
        <Input>
            <textarea value={currentMemo.title} onChange={changeTitle} placeholder="Title"/>
        </Input>
        <MarkDownInput>
            <SimpleMde value={currentMemo.text} onChange={changeText} options={markdownOptions}
                       className="markdownInput"/>
        </MarkDownInput>
            <PreviewTitle>{currentMemo.title}</PreviewTitle>
            <CodeBackGroundColor>
                <PreviewText dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(currentMemo.text))}}/>
            </CodeBackGroundColor>
        <button onClick={createNewMemo}>新しいメモを作成</button>
        <button onClick={deleteCurrentMemo}>現在のメモを削除</button>
    </EditorContainer>

}

export default MarkdownEditor;
