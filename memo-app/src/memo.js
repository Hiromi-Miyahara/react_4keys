import React, { useState } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function MarkdownEditor() {
    const [markdownValues, setMarkdownValues] = useState("");

    const onChange = (value) => {
        setMarkdownValues(value);
    }

    return <SimpleMde value={markdownValues} onChange={onChange} />;
}

export default MarkdownEditor;
