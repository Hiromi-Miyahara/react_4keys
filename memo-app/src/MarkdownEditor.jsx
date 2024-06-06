import React, {useState, useEffect, useMemo} from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {marked} from "marked";
import DOMPurify from "dompurify";
import hljs from 'highlight.js'
import "highlight.js/styles/github.css";
import EasyMDE from "easymde";
import styled from "styled-components"

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;`

function MarkdownEditor() {
    const [markdown, setMarkdown] = useState(() => {
        const savedMarkdown = localStorage.getItem("markdown");
        const parsedMarkdown = JSON.parse(savedMarkdown);
        const title = parsedMarkdown.title ? parsedMarkdown.title : "";
        const text = parsedMarkdown.text ? parsedMarkdown.text : "";
        return {title: title, text: text, key: getUniqueStr()}
    });

    useEffect(() => {
        localStorage.setItem("markdown", JSON.stringify({title: markdown.title, text: markdown.text, key: markdown.key}));
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

    const Title = styled.h1`
        font-size: 40px;
        text-align: center;
        min-width: 200px;
    `;

    const markdownOptions = useMemo(() => ({
        toolbar: false,
        highlight: (code, lang) => {
            const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language: validLanguage}).value;
        },
    }), []);

    return <EditorContainer>
        <input value={markdown.title} onChange={changeTitle} placeholder="Title"/>
        <SimpleMde value={markdown.text} onChange={changeText} options={markdownOptions}/>
        <div className="markdownTextArea">
            <Title>{markdown.title}</Title>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(markdown.text))}}/>
        </div>
    </EditorContainer>
}

export default MarkdownEditor;
