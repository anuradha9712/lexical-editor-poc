import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { Button } from "@innovaccer/design-system";

export default function ConvertToHTMLPlugin() {
  const [editor] = useLexicalComposerContext();

  const onButtonClick = () => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      console.log("htmlString", htmlString);
    });
  };

  return <Button className="mr-5" appearance="primary" onClick={onButtonClick}>Convert To HTML</Button>;
}
