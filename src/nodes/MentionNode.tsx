import { Chip } from "@innovaccer/design-system";
import type { Spread } from "lexical";

import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  TextNode
} from "lexical";
import { renderToStaticMarkup } from "react-dom/server";

export type SerializedMentionNode = Spread<
  {
    mentionName: string;
    type: "mention";
    version: 1;
    // customHTML: any;
  },
  SerializedTextNode
>;

function convertMentionElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const textContent = domNode.textContent;

  if (textContent !== null) {
    const node = $createMentionNode(textContent);
    return {
      node
    };
  }

  return null;
}

const mentionStyle = "background-color: rgba(24, 119, 232, 0.2)";
export class MentionNode extends TextNode {
  __mention: string;

  static getType(): string {
    return "mention";
  }

  static clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__mention, node.__text, node.__key);
  }
  static importJSON(serializedNode: SerializedMentionNode): MentionNode {
    const node = $createMentionNode(serializedNode.mentionName);
    node.setTextContent(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  constructor(mentionName: string, text?: string, key?: NodeKey) {
    super(text ?? mentionName, key);
    this.__mention = mentionName;
  }

  // const removeMutationListener = editor.registerMutationListener(
  //   MyCustomNode,
  //   (mutatedNodes) => {
  //     // mutatedNodes is a Map where each key is the NodeKey, and the value is the state of mutation.
  //     for (let [nodeKey, mutation] of mutatedNodes) {
  //       console.log(nodeKey, mutation)
  //     }
  //   },
  // );
  
  // Do not forget to unregister the listener when no longer needed!
  //removeMutationListener();

  exportJSON(): SerializedMentionNode {
    return {
      ...super.exportJSON(),
      mentionName: this.__mention,
      type: "mention",
      version: 1,
      // customHTML: `<p class="editor-paragraph"><p class="editor-paragraph"><span data-lexical-mention="true"><div tabindex="0" data-test="DesignSystem-Chip--GenericChip" class="Chip-wrapper Chip Chip--selection"><i class="material-icons material-icons-round Icon Icon--inverse Chip-icon Chip-icon--left" data-test="DesignSystem-GenericChip--Icon" style="font-size:16px;width:16px" role="button">assessment_round</i><span data-test="DesignSystem-GenericChip--Text" class="Text Text--regular color-inverse">Admiral Dodd Rancit</span><i class="material-icons material-icons-round Icon Icon--subtle Chip-icon Chip-icon--right cursor-pointer" data-test="DesignSystem-GenericChip--clearButton" style="font-size:16px;width:16px" role="button" tabindex="0">clear_round</i></div></span></p></p>`

    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const chip = <Chip label={this.__mention} name={this.__mention} type="selection" />;
    const myHtmlCode = renderToStaticMarkup(chip);

    const dom = super.createDOM(config);
    dom.innerHTML = myHtmlCode;
    // dom.style.cssText = mentionStyle;
    // dom.className = "mention";
    return dom;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span");
    element.setAttribute("data-lexical-mention", "true");
    element.textContent = this.__text;
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-lexical-mention")) {
          return null;
        }
        return {
          conversion: convertMentionElement,
          priority: 1
        };
      }
    };
  }

  isTextEntity(): true {
    return true;
  }
}

export function $createMentionNode(mentionName: string): MentionNode {
  const mentionNode = new MentionNode(mentionName);
  mentionNode.setMode("segmented").toggleDirectionless();
  return mentionNode;
}

export function $isMentionNode(
  node: LexicalNode | null | undefined
) {
  return node instanceof MentionNode;
}
