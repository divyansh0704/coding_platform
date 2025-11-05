import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { FaFile, FaFolder,FaFolderOpen } from 'react-icons/fa';
import axios from 'axios';
import "./filesbox.css"

const Filesbox = ({ projectId, onFileSelect }) => {
  const { token } = useAuth();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [files, setFiles] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  useEffect(() => {
    if (projectId) {
      fetchFiles();
      // console.log("this is token: ",token);
    }
    // fetchFiles();
  }, [projectId]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/${projectId}`, config);
      setFiles(res.data.project.files);

    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }
  const handleFileClick = (file) => {
    if (file.type === 'folder') {
      setExpandedFolders(prev => {
        const newSet = new Set(prev);
        if (newSet.has(file._id)) {
          newSet.delete(file._id);
        } else {
          newSet.add(file._id);
        }
        return newSet;
      });
    } else {
      onFileSelect(file);
    }


  }
  const createFile = async (name, type, parent = null) => {
    try {
      await axios.post(`http://localhost:5000/api/projects/${projectId}/files`, { name, type, parent }, config);
      fetchFiles();
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  const deleteFile = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}/files/${fileId}`, config);
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const renderFileTree = (files, parentId = null) => {
    return files
      .filter(file => file.parent === parentId)
      .map((file, index) => (
        <div key={file.id || index} className='file-item'>
          <div onClick={() => handleFileClick(file)} className='file-name'>
            
            {file.type === 'file' ? <FaFile /> : expandedFolders.has(file._id) ? <FaFolderOpen /> : <FaFolder />} 


            {file.name}
            
            <button onClick={() => deleteFile(file._id)} className="delete-btn">Delete</button>
           
            {file.type === "folder" && (
              <button onClick={() => createFile(prompt('File name:'), 'file', file._id) } className='file-in-folder'>add File</button>
            )}
            {file.type === "folder" && expandedFolders.has(file._id) && (
              <div className="file-children">
                {renderFileTree(files, file._id)}
              </div>
            )}
          </div>
        </div>
      ))
  }
  return (
    <div className='file-container'>
      <div className="file-header">
        {/* <button>New File</button>
        <button>New Folder</button> */}
        <button onClick={() => createFile(prompt('File name:'), 'file')}>New File</button>
        <button onClick={() => createFile(prompt('Folder name:'), 'folder')}>New Folder</button>
      </div>
      <div className="file-tree">
        {renderFileTree(files)}

      </div>
    </div>
  )
}

export default Filesbox
