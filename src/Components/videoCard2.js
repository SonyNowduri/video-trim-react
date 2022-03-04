import React, { useState, useRef } from 'react'
import './VideoCard.css';
import videoSample from '../images/sample-mp4-file-small.mp4'
import VideoHeader from './VideoHeader';
import VideoFooter from './VideoFooter';
import img from '../images/nature.jpg'

function VideoCard2({ channel, avatar, song, url, likes, shares, getVideoDuration }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [ref, setRef] = useState(null)
    const videoRef = useRef(null)
    // let videoRefre = videoRef.current.seekTo(videoRef.current.getCurrentTime())
    // console.log(videoRefre, "videoRefre")
    const [time, setTime] = useState(0)
    const onVideoPress = () => {
        if (isVideoPlaying) {
            videoRef.current.pause()
            videoRef.current.
                setIsVideoPlaying(false)
            setRef(videoRef.current.seekTo(videoRef.current.getCurrentTime()))
        } else {
            videoRef.current.play()
            setIsVideoPlaying(true)
        }
    }
    var vid = document.getElementById("glass");
    const getTime = () => {
    }
    return (
        <div className='videoCard'>
            <VideoHeader />
            <video className='video__player'
                id="glass"
                src={url}
                alt="reals"
                loop={true}
                ref={videoRef}
                onClick={onVideoPress}
                controls
                current
            />
            <button onClick={getTime} >reference
            </button>
            <p style={{ color: 'red' }}>{time} </p>
            {/* <VideoFooter
                channel={"channel"}
                avatar={"avatar"}
                song={"song"}
                likes={"likes"}
                shares={"shares"}
            /> */}
        </div>
    )
}
export default VideoCard2