import React, {useState, useEffect} from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {marked} from "marked";
import DOMPurify from "dompurify";
import hljs from 'highlight.js'
import "highlight.js/styles/github.css";

function MarkdownEditor() {

    const [markdownValues, setMarkdownValues] = useState(() => {
        const savedMarkdown = localStorage.getItem("markdownValues");
        return savedMarkdown ? JSON.parse(savedMarkdown) : "";
    });

    marked.setOptions({
        highlight: (code, lang) => {
            const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language: validLanguage}).value;
        }
    });

    useEffect(() => {
        localStorage.setItem("markdownValues", JSON.stringify(markdownValues));
    }, [markdownValues]);

    // highlightjsを初期化
    useEffect(()=>{
        hljs.initHighlighting();
    },[]);

    const onChange = (value) => {
        setMarkdownValues(value);
    }

    return <>
        <SimpleMde value={markdownValues} onChange={onChange}/>;
        <div>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(markdownValues))}} />
        </div>
    </>
}

export default MarkdownEditor;
