import FileUploader from './components/FileUploader'
import ImageProcessor from './components/ImageProcessor'

import './App.css'
import { useState } from 'react';

function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <FileUploader file={file} setFile={setFile} />
      <ImageProcessor file={file} />
    </>
  )
}

export default App
