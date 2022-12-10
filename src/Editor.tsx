import React from "react";
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $getSelection } from "lexical";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ConvertToHTMLPlugin from "./plugins/ConvertToHTMLPlugin";
import HTMLToEditorPlugin from "./plugins/HTMLToEditorPlugin";
import ConvertToJSONPlugin from "./plugins/ConvertToJSONPlugin";
import JSONToEditorPlugin from "./plugins/JSONToEditorPlugin";
import MentionsPlugin from "./plugins/MentionsPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";

import { MentionNode } from "./nodes/MentionNode";
// import { createHeadlessEditor } from "@lexical/headless";
import "@innovaccer/design-system/css";
import { ImageNode } from "./nodes/ImageNode";
import { Card } from "@innovaccer/design-system";
// import './index.css';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: "MyEditor",
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  editable: true, // set as false to enable read-only mode
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    MentionNode,
    ImageNode,
  ],
};

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editor: any) {
  editor.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

const exportedHTML = `<p class="editor-paragraph" dir="ltr"><code class="editor-code" spellcheck="false" data-highlight-language="javascript"><span class="editor-tokenAttr">let</span><span> testVar </span><span class="editor-tokenOperator">=</span><span> </span><span class="editor-tokenProperty">0</span><span class="editor-tokenPunctuation">;</span></code><p class="editor-paragraph" dir="ltr"><code><span class="editor-text-code">sample</span></code></p><p class="editor-paragraph" dir="ltr"><a href="https://test.com" rel="noopener" class="editor-link"><span>test link</span></a></p><h1 class="editor-heading-h1"><span>Heading</span></h1><h2 class="editor-heading-h2"><span>small heading</span></h2><p class="editor-paragraph"><span data-lexical-mention="true">Bo-Katan Kryze</span><span> </span><span data-lexical-mention="true">Bo-Katan Kryze</span><span> </span><span data-lexical-mention="true">Faro Argyus</span></p><p class="editor-paragraph" dir="ltr"><br></p><ul class="editor-list-ul"><li value="1" class="editor-listitem"><span>one</span></li><li value="2" class="editor-listitem editor-nested-listitem"><ul class="editor-list-ul"><li value="1" class="editor-listitem"><span>two</span></li><li value="2" class="editor-listitem editor-nested-listitem"><ul class="editor-list-ul"><li value="1" class="editor-listitem"><span>three</span></li><li value="2" class="editor-listitem editor-nested-listitem"><ul class="editor-list-ul"><li value="1" class="editor-listitem"><span>four</span></li></ul></li></ul></li></ul></li></ul></p>`;

export default function Editor() {
  return (
    <>
      <div>
        <LexicalComposer initialConfig={editorConfig}>
          <div className="editor-container">
            <ToolbarPlugin />
            <div className="editor-inner" id="main-container">
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input ContentEditable__root" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <ClearEditorPlugin />

              <OnChangePlugin onChange={onChange} />
              <HistoryPlugin />
              <TreeViewPlugin />
              <AutoFocusPlugin />
              <CodeHighlightPlugin />
              <ListPlugin />
              <LinkPlugin />
              <AutoLinkPlugin />
              <MentionsPlugin />
              <ImagesPlugin captionsEnabled={false} />
              <ListMaxIndentLevelPlugin maxDepth={7} />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
              <JSONToEditorPlugin />
              {/* <HTMLToEditorPlugin /> */}
            </div>
            <div className="d-flex">
              <ConvertToHTMLPlugin />
              <ConvertToJSONPlugin />
            </div>
            <div className="mt-10">
              <h3>Display Exported HTML</h3>
              <Card className="p-5">
                <div dangerouslySetInnerHTML={{ __html: exportedHTML }}></div>
              </Card>
            </div>
          </div>
        </LexicalComposer>
      </div>
    </>
  );
}
