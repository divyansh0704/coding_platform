import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import './codeeditor.css';

const CodeEditor = ({ selectedFile, projectId }) => {
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("Console output here");
  const [unsaved, setUnsaved] = useState(false);
  const { token } = useAuth();
  const config = {
    headers:
    {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleEditorChange = (value) => {
    setCode(value);
    setUnsaved(true);
  }
  const handleSave = async () => {
    if (selectedFile) {
      await axios.put(`http://localhost:5000/api/projects/${projectId}/files/${selectedFile._id}`, { content: code }, config);
      setUnsaved(false);
      
    }
  };

  useEffect(() => {
    if (selectedFile) {
      setCode(selectedFile.content);
      setUnsaved(false);
    }
  }, [selectedFile]);

  const handleRun = async () => {
    console.log(token)
    const codeToRun = selectedFile ? selectedFile.content : code;
    console.log(codeToRun);
    try {
      const response = await axios.post('http://localhost:5000/api/projects/execute', { code: codeToRun }, config);
      setOutput(response.data.output || response.data.error);
    } catch (err) {
      setOutput('Error executing code');
    }
  };

  return (
    <div className='code-container'>
      <div className='editor-area'>
        <Editor
          height="70%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
        <button onClick={handleRun} className='run-btn'>Run Code</button>
        <button onClick={handleSave} disabled={!unsaved} className='save-btn'>Save</button>
      </div>
      <div className='console-area'>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
