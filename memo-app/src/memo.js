import React, { useState, useEffect } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function MarkdownEditor() {
    const [markdownValues, setMarkdownValues] = useState(()=>{
        const savedMarkdown = localStorage.getItem("markdownValues");
        return savedMarkdown ? JSON.parse(savedMarkdown) : "";
    });

    useEffect(() => {
        localStorage.setItem("markdownValues", JSON.stringify(markdownValues));
    }, [markdownValues]);

    const onChange = (value) => {
        setMarkdownValues(value);
    }

    return <SimpleMde value={markdownValues} onChange={onChange} />;
}

export default MarkdownEditor;
