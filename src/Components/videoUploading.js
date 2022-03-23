import React, { useEffect, useRef, useState } from "react";

import "react-video-trimmer/dist/style.css";
import { IconButton, Slider } from "@material-ui/core";

import { makeStyles, withStyles } from "@material-ui/core";

import { Tooltip } from "@material-ui/core";
import FileUploader from "./FilesUploader";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
  },
  controlWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    zIndex: 1,
  },
  controllers: {
    display: "flex",
    flexBasis: "row",
    color: "#777",
    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "white",
      transform: "scale(1)",
    },
  },
});
// const handleVideoEncode = React.useCallback(result => {
//     console.log("Encoding Result:", result);
// });
function ValueLabelComponent(props) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
const PrettoSlider = withStyles({
  root: {
    // color: 'green',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover,&$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% +4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
function InstaVideoContainer() {
  const classes = useStyles();
  const [startMediaDuration, setStartMediaDuration] = useState(0);
  const [endMediaDuration, setEndMediaDuration] = useState(0);
  const sampleVideo = "https://www.youtube.com/watch?v=ysz5S6PUM-U";
  const [video, setVideo] = useState(sampleVideo);
  const [val, setVal] = useState([startMediaDuration, endMediaDuration]);
  const [base64File, setBase64file] = useState(null);
  const [duration, setDuration] = useState(null);
  const [gif, setGif] = useState();

  const handleFile = async (file) => {
    console.log(file);
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (file) {
        fileReader.readAsDataURL(file);
      }
      fileReader.onload = () => {
        const base64Res = fileReader.result;
        var media = new Audio(fileReader.result);
        media.onloadedmetadata = () => {
          setDuration(media.duration);
          console.log(media.duration, "duration");
          let vals = val;
          vals[1] = parseInt(media.duration);
          // let getSec = parseInt(media.duration )
          // vals[1]=getSec/100
          setVal(vals);
          setEndMediaDuration(media.duration);
        };
        media.ondurationchange = (dur) => {
          console.log(dur, "durationChange");
        };
        resolve(base64Res);
        setBase64file(base64Res);
        setVideo(base64Res + `#t=${val[0]},${val[1]}`);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  
  const updateChange = (e, value) => {
    console.log(value, "Value");
    setVal(value);
    setVideo(base64File + `#t=${value[0]}` , `#t=${value[1]}`);
  };

  const getVideoDuration = (videoDuration) => {
    setDuration(videoDuration);
  };

  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
  });

  const convertToGif = async () => {
    console.log(ffmpeg, "Sony");

    // await ffmpeg.load()
    // Write the file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      "2.5",
      "-ss",
      "2.0",
      "-f",
      "gif",
      "out.mp4"
    );

    // Read the result
    const data = ffmpeg.FS("readFile", "out.gif");
    console.log(data, "Data");

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    console.log(url, "URL");
    setGif(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          marginLeft: "30px",
        }}
      >
        <video src={video} controls />

        <div>
          <Slider
            max={endMediaDuration}
            value={val}
            onChange={updateChange}
            valueLabelDisplay="auto"
            marks
          />
          <h3>
            start:{val[0]} end:{val[1]}
          </h3>
        </div>
        <div style={{ marginTop: "10px" }}>
          <FileUploader handleFile={handleFile} />
        </div>

        <button onClick={convertToGif}>Convert</button>

        <img src={gif} width="250" />
        
      </div>
    </div>
  );
}
export default InstaVideoContainer;

{/* <div style={{marginTop:'10px', width:'70%', border:'1px solid black', height:'50%'}}>
                        <textarea cols={50} rows={5} /> 
                        <EmojiPicker
                            onEmojiClick={this.props.onEmojiClick}
                            pickerStyle={{
                                width: '100%',
                                overflowX: 'hidden !important'
                            }} 
                        />
                </div> */}
