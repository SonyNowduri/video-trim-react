import './App.css';
import Thumbnail from '../src/Components/Thumbnail';
import VideoCard from '../src/Components/VideoCard';
import InstaVideoContainer from '../src/Components/videoUploading';
import img from './images/nature.jpg'
import videoSample from './images/sample-mp4-file-small.mp4'

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { useEffect, useState } from 'react';
const ffmpeg = createFFmpeg({ log: false });

function App() {

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();

  const load = async () => {
    const res = await ffmpeg.load();
    console.log("SOny", res)
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])

  const convertToGif = async () => {
    console.log(ffmpeg)
    // Write the file to memory 
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');

    // Read the result
    const data = ffmpeg.FS('readFile', 'out.gif');

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url)
  }

console.log(ready)
  
  return (
    <div className="app">

      <div className='app__top' >
        <h3>Reels</h3>
      </div>
      <InstaVideoContainer />

      {/* {ready ? ( */}
      <div style={{margin:'100px'}} >

        { video && <video
            controls
            width="250"
            src={URL.createObjectURL(video)}>

        </video>}

        <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />

        <h3>Result</h3>

<button onClick={convertToGif}>Convert</button>

{ gif && <img src={gif} width="250" />}

        
      </div>

  {/* ) : ( <p>Loading...</p> )} */}


      

      {/* <Thumbnail /> */}

       {/* <div className='app_videos'>
        <VideoCard
          channel={"Shoaib"}
          avatar={img}
          song={"Test song"}
          url={videoSample}
          likes={"likes"}
          shares={"shares"}
        />
        <VideoCard
          channel={"Ahmed"}
          avatar={img}
          song={"Testsong"}
          url={videoSample}
          likes={"1009K"}
          shares={"667K"}
        />
        <VideoCard
          channel={"Stella"}
          avatar={img}
          song={"song"}
          url={videoSample}
          likes={"998K"}
          shares={"556K"}
        />
        <VideoCard
          channel={"Stella"}
          avatar={img}
          song={"song"}
          url={videoSample}
          likes={"998K"}
          shares={"556K"}
        />



      </div>  */}

    </div>
  );
}

export default App;
