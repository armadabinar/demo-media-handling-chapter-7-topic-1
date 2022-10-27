import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// Dropzone
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

// Web Video Player
import ReactPlayer from 'react-player';

// Image Viewer
import ModalImage from 'react-modal-image';

//PDF VIEWER
// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance

function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    setPlaying(!playing)
  }

  return (
    <div className="App">
      {/*DROPZONE*/}
      <Dropzone
        maxFiles={3}
        // minSizeBytes={10 * 1024 * 1024}
        // maxSizeBytes={11 * 1024 * 1024}
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*,application/*"
      />

      {/*WEB VIDEO PLAYER*/}
      <ReactPlayer url="https://www.youtube.com/watch?v=DzZ0xa_7WoE" playing={playing} controls onPlay={() => { console.log('mainkan') }} />
      <button onClick={togglePlay}>TOGGLE PLAY</button>

      {/*IMAGE VIEWER*/}
      <ModalImage
        small="https://picsum.photos/200"
        large="https://picsum.photos/400"
        alt="tes123"
        hideDownload={false}
        hideZoom={false}
        showRotate
      />

      {/*PDF VIEWER*/}
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.7.570/es5/build/pdf.worker.js'>
        <Viewer
          fileUrl='/pdf-open-parameters.pdf'
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>

    </div>
  );
}

export default App;
