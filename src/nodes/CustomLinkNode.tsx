import { TextNode, NodeKey, LexicalNode, EditorConfig } from "lexical";
import { AutoLinkNode, LinkNode } from "@lexical/link";

export class CustomLinkNode extends TextNode {
  __url: string;
  // return new CustomParagraphNode(linkNode.__url, linkNode.__target, linkNode.__rel, linkNode.getURL,{...});

  constructor(text: string, url: string, key?: NodeKey) {
    super(text);
    this.__url = url;
  }

  static getType(): string {
    return "custom-link";
  }

  static clone(node: CustomLinkNode): CustomLinkNode {
    return new CustomLinkNode(node.__text, node.__url, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    console.log('inside createdom')
    const element = super.createDOM(config);
    element.style.color = 'red';
    return element;
  }

  updateDOM(
    prevNode: CustomLinkNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    // const isUpdated = super.updateDOM(prevNode, dom, config);
    // if (prevNode.__color !== this.__color) {
    //   dom.style.color = this.__color;
    // }
    // return isUpdated;

    // Returning false tells Lexical that this node does not need its
    // DOM element replacing with a new copy from createDOM.
    return false;
  }
}

export function $createLinkNode(text: string, url: string): CustomLinkNode {
  console.log('my link attr-> ', text, 'url', url);
  return new CustomLinkNode(text, url);
}

export function $isLinkNode(node?: LexicalNode): boolean {
  return node instanceof CustomLinkNode;
}
