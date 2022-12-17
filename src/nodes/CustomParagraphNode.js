import React from "react";
import ReactDOM from "react-dom";
import { Paragraph, Link } from "@innovaccer/design-system";
import { ParagraphNode, LinkNode } from "lexical";
import { renderToStaticMarkup } from "react-dom/server";

export class CustomParagraphNode extends ParagraphNode {
  // __url;
  // return new CustomParagraphNode(linkNode.__url, linkNode.__target, linkNode.__rel, linkNode.getURL,{...});

  constructor(text, url, key) {
    super(text);
    this.__url = url;
  }

  static getType() {
    return "custom-paragraph";
  }

  static clone(node) {
    console.log("node", node);
    return new CustomParagraphNode(node.__key);
  }

  createDOM(config) {
    const para = <Link />;
    const dom = super.createDOM(config);
    // dom.style = "background: green";
    // dom.innerHTML=`<div tabindex="0" data-test="DesignSystem-Chip--GenericChip" class="Chip-wrapper Chip Chip--selection"><i class="material-icons material-icons-round Icon Icon--inverse Chip-icon Chip-icon--left" data-test="DesignSystem-GenericChip--Icon" style="font-size:16px;width:16px" role="button">assessment_round</i><span data-test="DesignSystem-GenericChip--Text" class="Text Text--regular color-inverse">Chip Label</span><i class="material-icons material-icons-round Icon Icon--subtle Chip-icon Chip-icon--right cursor-pointer" data-test="DesignSystem-GenericChip--clearButton" style="font-size:16px;width:16px" role="button" tabindex="0">clear_round</i></div>`
    // return dom;

    // return React.createElement('div', [], para);;

    // ReactDOM.render(Paragraph, dom);
    const myHtmlCode = renderToStaticMarkup(para);
    console.log("myHtmlCode-> ", myHtmlCode);
    dom.innerHTML = myHtmlCode;

    console.log("CONFIG >> ", config);

    return dom;

    // return dom;
  }

  $createCustomParagraphNode() {
    return new CustomParagraphNode();
  }
}
