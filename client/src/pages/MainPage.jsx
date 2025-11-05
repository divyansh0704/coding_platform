import React, { useState} from 'react'
import Navbar from '../components/Navbar'
import "./mainPage.css"
import Filesbox from '../components/Filesbox'
import CodeEditor from '../components/CodeEditor'


const MainPage = () => {
 const [projectId, setProjectId] = useState('some-project-id'); 
  const [selectedFile, setSelectedFile] = useState(null);



  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className='main-container'>
        <Navbar/>
        <div className="belownav">
          
           
              <Filesbox projectId={projectId} onFileSelect={handleFileSelect} />
              <CodeEditor projectId={projectId} selectedFile={selectedFile} />
           
          
        </div>
    </div>
  )
}

export default MainPage
