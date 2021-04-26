import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentWillMount() {
        if (this.props.editMode && this.props.contentToEdit) {
            const blocksFromHtml = htmlToDraft(this.props.contentToEdit);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState
            });
        }
    }

    onEditorStateChange(editorState) { //this function is passed to the Editor as a prop and when someone types, the prop is called and the function is run
        this.setState({ editorState }, this.props.handleRichTextEditorChange(  //ensure that the next process of calling blog form that its not run until the local state is updated
            draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        ));
    }

    getBase64(file, callback) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = error => {};
    }

    uploadFile(file) {
        return new Promise((resolve, reject) => {
            this.getBase64(file, data => resolve({data: { link: data } })); //handles the process of what happens when an image is picked
        });
    }
    render() {
        return (
            <div>
                <Editor editorState={this.state.editorState} 
                wrapperClassname="demo-wrapper" editorClassname="demo-editor" 
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { 
                        uploadCallback: this.uploadFile, //the uploadcallback is calling a function whenever an image is dropped inside of it
                        alt: { present: true, mandatory: false },
                        previewImage: true,
                        inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    }
                }} />
            </div>
        );
    }
}