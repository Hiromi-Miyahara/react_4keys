import React, {useState, useEffect, useMemo} from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {marked} from "marked";
import DOMPurify from "dompurify";
import hljs from 'highlight.js'
import "highlight.js/styles/github.css";
import EasyMDE from "easymde";
import styled from "styled-components"
import "./easyMDE.css";

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;`

// TODO: マークダウンインプットの横幅を固定したい
// TODO; h1とかの大文字が画面幅を変えると小さくなってしまう
// TODO; 新しいメモを作成した時に、即時に左側にメモができるようにしてほしい
// TODO; メモリストのCSSをいい感じにしたい
// TODO: コードハイライトが消えている
// TODO; フォーカスを当てた時に、そこより後ろの文字が消えてしまっている。
// TODO : メモの順番をソートできるように、メモの要素に作成日時的なものをつけてあげたい。
// TODO; 作成したメモを削除できるようにしたい
// TODO; 設計を考える

const Input = styled.div`
    background-color: #f3f3f3;
    width: 100%;
    height: auto;
    padding: 40px 0 40px 0;

    textarea {
        background-color: #f3f3f3;
        max-width: 1200px;
        width: 100%;
        min-width: 500px;
        height: 100%;
        font-size: 40px;
        font-weight: bold;
        border: none;
        white-space: wrap;
        field-sizing: content;
        resize: none;
        outline: none;
    }`;

const MarkDownInput = styled.div`
    div {
        background-color: #f3f3f3;
        max-width: 1200px;
        width: 100%;
        min-width: 500px;
    }`

const PreviewTitle = styled.h1`
    font-size: 40px;
    text-align: center;
    max-width: 1200px;
    width: 100%;
    min-width: 500px;
`;

const CodeBackGroundColor = styled.code`
    background-color: #f3f3f3;

    code {
        background-color: #d1d0d0
    }`;

const PreviewText = styled.div`
    max-width: 1200px;
    width: 100%;
    min-width: 500px;`

function MarkdownEditor(props) {
    const {currentMemoKey, setCurrentMemoKey} = props
    const [memos, setMemos] = useState(() => {
        const savedMemos = localStorage.getItem("memos");
        return savedMemos ? JSON.parse(savedMemos) : [];
    });

    const [currentMemo, setCurrentMemo] = useState(() => {
        const initialMemo = {title: "", text: "", key: getUniqueStr()};
        if (currentMemoKey) {
            const foundMemo = memos.find(memo => memo.key === currentMemoKey);
            return foundMemo ? foundMemo : initialMemo;
        }
        return initialMemo;
    })
    // console.log(currentMemo);

    useEffect(() => {
        localStorage.setItem("memos", JSON.stringify(memos));
    }, [memos]);

    useEffect(() => {
        hljs.highlightAll();
    }, [currentMemo.text, currentMemoKey]);

    useEffect(() => {
        setCurrentMemo(()=>{
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
        setCurrentMemo({title: "", text: "", key: getUniqueStr()})
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

    return <EditorContainer>
        <Input>
            <textarea value={currentMemo.title} onChange={changeTitle} placeholder="Title"/>
        </Input>
        <MarkDownInput>
            <SimpleMde value={currentMemo.text} onChange={changeText} options={markdownOptions}
                       className="markdownInput"/>
        </MarkDownInput>
        <div className="markdownTextArea">
            <PreviewTitle>{currentMemo.title}</PreviewTitle>
            <CodeBackGroundColor>
                <PreviewText dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(currentMemo.text))}}/>
            </CodeBackGroundColor>
        </div>
        <button onClick={createNewMemo}>新しいメモを作成</button>
    </EditorContainer>

}

export default MarkdownEditor;
