import React, { useState, useRef } from 'react'
import './VideoCard.css';
import videoSample from '../images/sample-mp4-file-small.mp4'
import VideoHeader from './VideoHeader';
import VideoFooter from './VideoFooter';

import img from '../images/nature.jpg'

function VideoCard({ channel, avatar, song, url, likes, shares }) {


    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef(null)


    const onVideoPress = () => {
        if (isVideoPlaying) {
            videoRef.current.pause()
            setIsVideoPlaying(false)
        } else {
            videoRef.current.play()
            setIsVideoPlaying(true)
        }
    }
    return (
        <div className='videoCard'>
            <VideoHeader />
            <div>
                <video className='video__player' src={url} alt="reals" loop={true} ref={videoRef} onClick={onVideoPress} />

            </div>

            <VideoFooter
                channel={"channel"}
                avatar={"avatar"}
                song={"song"}

                likes={"likes"}
                shares={"shares"}
            />
        </div>
    )
}

export default VideoCard