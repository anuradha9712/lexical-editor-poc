import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $createParagraphNode } from "lexical";
import React from "react";

export default function HTMLToEditorPlugin() {
  const [editor] = useLexicalComposerContext();
  React.useEffect(() => {
    // const htmlString = `<p class="editor-paragraph" dir="ltr"><p class="editor-paragraph" dir="ltr"><strong class="editor-text-bold">test</strong></p><p class="editor-paragraph" dir="ltr"><em class="editor-text-italic">italic</em></p><p class="editor-paragraph" dir="ltr"><span class="editor-text-underline">underline</span></p><p class="editor-paragraph" dir="ltr"><span class="editor-text-strikethrough">strike</span></p></p>`;
    const htmlString = `<p class="editor-paragraph" dir="ltr"><p class="editor-paragraph" dir="ltr"><strong class="editor-text-bold">test</strong></p><p class="editor-paragraph" dir="ltr"><strong class="editor-text-bold editor-text-italic">italic</strong></p><p class="editor-paragraph" dir="ltr"><span>underline</span></p><p class="editor-paragraph" dir="ltr"><span>strike</span></p><p class="editor-paragraph"><br></p></p><p class="editor-paragraph" dir="ltr"><p class="editor-paragraph"><br></p><p class="editor-paragraph" dir="ltr"><strong class="editor-text-bold">test</strong></p><p class="editor-paragraph" dir="ltr"><em class="editor-text-italic">italic</em></p><p class="editor-paragraph" dir="ltr"><span>underline</span></p><p class="editor-paragraph" dir="ltr"><span>strike</span></p><p class="editor-paragraph"><br></p></p>`
    editor.update(() => {
      console.log("inside update fnn");
      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser();
      // const dom = parser.parseFromString(htmlString, textHtmlMimeType);
      const dom = parser.parseFromString(htmlString, "text/html");

      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor, dom);

      // Select the root
      const root = $getRoot();
      const paragraphNode = $createParagraphNode();
      console.log("nodes-> ", nodes, "paragraphNodes", paragraphNode);
      nodes.forEach((n) => paragraphNode.append(n));
      // paragraphNode.append(nodes);
      root.append(paragraphNode);
      // to remove the blank node added on render
      root.getFirstDescendant()?.remove();

      // Select the root
      // $getRoot().select();

      // Insert them at a selection.
      // $insertNodes(nodes);
    });
  }, [editor]);

  return null;

}

// const HTMLToLexicalState = () => {
//   const [editor] = useLexicalComposerContext();
//   const htmlString = `<p class="editor-paragraph"><p class="editor-paragraph"><br></p></p><p class="editor-paragraph" dir="ltr"><p class="editor-paragraph" dir="ltr"><span>testing</span></p><p class="editor-paragraph" dir="ltr"><span>heading</span></p><code class="editor-code" spellcheck="false" data-highlight-language="javascript"><span class="editor-tokenAttr">let</span><span> test </span><span class="editor-tokenOperator">=</span><span> </span><span class="editor-tokenProperty">0</span><span class="editor-tokenPunctuation">;</span></code><p class="editor-paragraph"><br></p><p class="editor-paragraph" dir="ltr"><span>bullets</span></p><ul class="editor-list-ul"><li value="1" class="editor-listitem"><span>one</span></li><li value="2" class="editor-listitem editor-nested-listitem"><ul class="editor-list-ul"><li value="1" class="editor-listitem"><span>two</span></li><li value="2" class="editor-listitem editor-nested-listitem"><ul class="editor-list-ul"><li value="1" class="editor-listitem"><span>three</span></li></ul></li></ul></li></ul></p>`;

//   editor.update(() => {
//     // In the browser you can use the native DOMParser API to parse the HTML string.
//     const parser = new DOMParser();
//     const dom = parser.parseFromString(htmlString, "text/html");

//     // Once you have the DOM instance it's easy to generate LexicalNodes.
//     const nodes = $generateNodesFromDOM(editor, dom);

//     // Select the root
//     $getRoot().select();

//     // Insert them at a selection.
//     $insertNodes(nodes);
//   });
// };
