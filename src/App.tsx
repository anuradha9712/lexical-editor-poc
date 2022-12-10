import React from 'react';

import "./styles.css";
import Editor from "./Editor";
import '@innovaccer/design-system/css';

export default function App(): JSX.Element {
  return (
    <div className="App editor-shell">
      <Editor />
    </div>
  );
}
