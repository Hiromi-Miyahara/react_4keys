import React, {useState, useEffect} from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {marked} from "marked";
import DOMPurify from "dompurify";
import hljs from 'highlight.js'
import "highlight.js/styles/github.css";
import EasyMDE from "easymde";
import styled from "styled-components"

function MarkdownEditor() {
    const [markdownValues, setMarkdownValues] = useState(() => {
        const savedMarkdown = localStorage.getItem("markdownValues");
        return savedMarkdown ? JSON.parse(savedMarkdown) : "";
    });
    const [titleText, setTitleText] = useState(() => {
        const savedTitle = localStorage.getItem("titleText");
        return savedTitle ? JSON.parse(savedTitle) : "";
    });

    // const easyMDE = new EasyMDE({
    //     toolbar: false,
    //     toolbarTips: false
    // })

    marked.setOptions({
        toolbar: false,
        highlight: (code, lang) => {
            const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language: validLanguage}).value;
        },
        toolbarTips: false
        // TODO: toolbarとかを非表示にするためには、new MDEでやる必要がありそうなので、後回しにする
    });

    useEffect(() => {
        localStorage.setItem("markdownValues", JSON.stringify(markdownValues));
    }, [markdownValues]);

    useEffect(() => {
        localStorage.setItem("titleText", JSON.stringify(titleText));
    }, [titleText]);

    // highlightjsを初期化
    useEffect(()=>{
        hljs.initHighlighting();
    },[]);

    const onChange = (value) => {
        setMarkdownValues(value);
    }
    const Title = styled.h1`
        font-size: 40px;
        text-align: center;
        `;

    return <>
        <input value={titleText} onChange={(e)=> {setTitleText(e.target.value)}} placeholder="Title" />
        <SimpleMde value={markdownValues} onChange={onChange}/>
        <div>
            <Title >{titleText}</Title>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(markdownValues))}} />
        </div>
    </>
}

export default MarkdownEditor;
