import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@innovaccer/design-system";

export default function ConvertToJSONPlugin() {
  const [editor] = useLexicalComposerContext();

  const onButtonClick = () => {
    editor.update(() => {
      const editorState = editor.getEditorState();
      const jsonString = JSON.stringify(editorState);
      const json = editorState.toJSON();

      console.log("jsonString", jsonString);
      console.log("json", json);
    });
  };

  return <Button appearance="primary" onClick={onButtonClick}>Convert To JSON</Button>;
}
