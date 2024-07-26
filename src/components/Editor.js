import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import { Controlled as ControlledEditor} from 'react-codemirror2'

export default function Editor(props) {
    const {
        language,
        displayName,
        value,
        onChange
    } = props

    const [open, setOpen] = useState(true)

    function handleChange(editor, data, value) {
        onChange(value)
    }

    return (
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
            <div className='editor-title'>
                {displayName}
                <button
                    type="button"
                    className="expand-collapse-btn"
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                >
                    {open? "Compress" : "Expand"}
                </button>
            </div>
            <ControlledEditor 
            className='code-mirror-wrapper'
    
            onBeforeChange={handleChange}
            value={value}
            options={{
                lineWrapping: true,
                lint: true,
                mode: language,
                lineNumbers: true,
                theme: 'material'
            }}  
            
            />
        </div>
    )
}
