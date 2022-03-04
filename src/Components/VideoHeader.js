import React from 'react'
import './VideoHeader.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';


function VideoHeader() {
    return (
        <div className='videoHeader'  >
            <ArrowBackIosIcon onClick={() => alert('Move Back')} fontSize='large' />
            <h1>Reels</h1>
            <CameraAltOutlinedIcon fontSize='large' />



        </div>
    )
}

export default VideoHeader