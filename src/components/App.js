import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
    `)
    }, 500)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
    <div className="banner">Code Canvas</div>
      <div className="pane top-pane">
        <Editor className="htmlclass"
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor className="cssclass"
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor className="jsclass"
          language="js"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
