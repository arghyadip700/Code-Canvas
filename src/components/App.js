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

      <div className="banner">
        <div className="imageborder">
        <img className= "logo" src="data:image/png;base64,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" alt="Card"/>
        </div>
        <div className="title">Code Canvas</div>
      </div>
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
