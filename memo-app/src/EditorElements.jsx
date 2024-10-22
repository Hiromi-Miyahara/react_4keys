import styled from "styled-components";

export const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    min-width: 600px;
    margin-right: 30px`

export const Input = styled.div`
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


export const MarkDownInput = styled.div`
    div {
        background-color: #f3f3f3;
        max-width: 1200px;
        width: 100%;
        min-width: 500px;
    }`

export const PreviewTitle = styled.h1`
    font-size: 40px;
    text-align: center;
    max-width: 1200px;
    width: 100%;
    min-width: 500px;
`;

export const PreviewText = styled.div`
    max-width: 1200px;
    min-width: 600px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;`

export const CodeBackGroundColor = styled.code`
    background-color: #f3f3f3;

    code {
        background-color: #d1d0d0
    }`;
