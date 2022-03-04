import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import VideoThumbnail from 'react-video-thumbnail';
import videoMP4 from '../images/sample-mp4-file-small.mp4'
import { convertBase64 } from "./Base64";
import "react-video-trimmer/dist/style.css";
import img from '../images/nature.jpg';
import VideoCard from './VideoCard'
import ReactVideoTrimmer from "react-video-trimmer";
import "react-video-trimmer/dist/style.css";
import { IconButton, Slider } from '@material-ui/core'
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import { Bookmark } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import FileUploader from "./FilesUploader";
import VideoCard2 from "./videoCard2";

const useStyles = makeStyles({
    playerWrapper: {
        width: '100%',
        position: 'relative'
    },
    controlWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        zIndex: 1
    },
    controllers: {
        display: 'flex',
        flexBasis: 'row',
        color: '#777',
        fontSize: 50,
        transform: "scale(0.9)",
        "&:hover": {
            color: 'white',
            transform: "scale(1)"
        }
    }
})
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
        height: 8
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover,&$active': {
            boxShadow: 'inherit'
        }
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% +4px)'
    },
    track: {
        height: 8,
        borderRadius: 4
    },
    rail: {
        height: 8,
        borderRadius: 4
    }
})(Slider)
function InstaVideoContainer() {
    const classes = useStyles()
    const [startMediaDuration, setStartMediaDuration] = useState(0)
    const [endMediaDuration, setEndMediaDuration] = useState(0)
    const sampleVideo = 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
    const [video, setVideo] = useState(sampleVideo)
    const [val, setVal] = useState([startMediaDuration, endMediaDuration])
    const [base64File, setBase64file] = useState(null)
    const [duration, setDuration] = useState(null)
    const handleFile = async (file) => {
        new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            if (file) {
                fileReader.readAsDataURL(file)
            }
            fileReader.onload = () => {
                const base64Res = fileReader.result
                var media = new Audio(fileReader.result);
                media.onloadedmetadata = () => {
                    setDuration(media.duration)
                    console.log(media.duration, "duration")
                    let vals = val
                    vals[1] = parseInt(media.duration)
                    // let getSec = parseInt(media.duration )
                    // vals[1]=getSec/100
                    setVal(vals)
                    setEndMediaDuration(media.duration)
                }
                media.ondurationchange = (dur) => {
                    console.log(dur, "durationChange")
                }
                resolve(base64Res)
                setBase64file(base64Res)
                setVideo(base64Res + `#t=${val[0]},${val[1]}`)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    const updateChange = (e, value) => {
        setVal(value)
        let trimmedDuration = parseInt(duration) - val[1]
        setVideo(base64File + `#t=${val[0]},${parseInt(duration) - trimmedDuration}`)
    }
    const MP4_VIDEO_URL = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4'
    const getVideoDuration = (videoDuration) => {
        setDuration(videoDuration)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', marginLeft: '30px' }}>
              <video src={video} controls  />

              {/* <VideoCard2
                    channel={"channel"}
                    avatar={img}
                    song={"song"}
                    url={video}
                    likes={"likes"}
                    shares={"shares"}
                    getVideoDuration={getVideoDuration}
                /> */}
               

                <div>
                    <Slider
                        max={endMediaDuration}
                        value={val} onChange={updateChange} aria-label="large"
                        valueLabelDisplay="auto" marks
                    />
                    <h3>start:{val[0]}  end:{val[1]}</h3>
                </div>
                <div style={{ marginTop: '10px' }} >
                    <FileUploader handleFile={handleFile} />
                </div>
            </div>
            {/* <div style={{ marginTop: '100px', marginLeft: '50px' }} >
               
              
              
                <div><ReactVideoTrimmer src={MP4_VIDEO_URL} /></div>
            </div> */}
        
      
        </div>
    );
}
export default InstaVideoContainer;
