import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import "./mainPage.css"
import Filesbox from '../components/Filesbox'
import CodeEditor from '../components/CodeEditor'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'


const MainPage = () => {
  const [projectId, setProjectId] = useState('690b6de81c913eb2f575c026');
  const [selectedFile, setSelectedFile] = useState(null);

  const [project, setProject] = useState(null);
  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`, config);
        setProject(response.data.project);
      } catch (err) {
        console.error('Failed to fetch project', err);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };



  return (
    <div className='main-container'>
      <Navbar />
      <div className="belownav">


        <Filesbox projectId={projectId} onFileSelect={handleFileSelect} project={project} />
        <CodeEditor projectId={projectId} selectedFile={selectedFile}  />


      </div>
    </div>
  )
}

export default MainPage
