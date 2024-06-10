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


const Input = styled.div`
    background-color: #f3f3f3;
    width: 100%;
    height: auto;
    padding: 40px 0 40px 0;

    textarea {
        background-color: #f3f3f3;
        max-width: 1200px;
        width: 100%;
        min-width: 700px;
        height: 100%;
        font-size: 40px;
        font-weight: bold;
        border: none;
        white-space: wrap;
        field-sizing: content;
    }`;

const MarkDownInput = styled.div`
    div {
        background-color: #f3f3f3;
        //border: none !important
    }`

const Title = styled.h1`
    font-size: 40px;
    text-align: center;
    min-width: 200px;
`;

const CodeBackGroundColor = styled.code`
    background-color: #f3f3f3;

    code {
        background-color: #cfcfcf
    }`;

function MarkdownEditor() {
    const [markdown, setMarkdown] = useState(() => {
        const savedMarkdown = localStorage.getItem("markdown");
        const parsedMarkdown = JSON.parse(savedMarkdown);
        const title = parsedMarkdown.title ? parsedMarkdown.title : "";
        const text = parsedMarkdown.text ? parsedMarkdown.text : "";
        return {title: title, text: text, key: getUniqueStr()}
    });

    useEffect(() => {
        localStorage.setItem("markdown", JSON.stringify({
            title: markdown.title,
            text: markdown.text,
            key: markdown.key
        }));
    }, [markdown]);

    // highlightjsを初期化
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    const changeTitle = (value) => {
        setMarkdown({
            title: value.target.value,
            text: markdown.text,
            key: markdown.key ? markdown.key : getUniqueStr()
        });
    }

    const changeText = (value) => {
        setMarkdown({
            title: markdown.title,
            text: value,
            key: markdown.key ? markdown.key : getUniqueStr()
        });
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
        // timeFormat
    }), []);

    return <EditorContainer>
        <Input>
            {/*TODO: inputではなく、textareaにすること*/}
            <textarea value={markdown.title} onChange={changeTitle} placeholder="Title"/>
            {/*<input value={markdown.title} onChange={changeTitle} placeholder="Title"/>*/}
        </Input>
        <MarkDownInput>
            <SimpleMde value={markdown.text} onChange={changeText} options={markdownOptions} className="markdownInput"/>
        </MarkDownInput>
        <div className="markdownTextArea">
            <Title>{markdown.title}</Title>
            <CodeBackGroundColor>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(markdown.text))}}/>
            </CodeBackGroundColor>
        </div>
    </EditorContainer>
}

export default MarkdownEditor;
