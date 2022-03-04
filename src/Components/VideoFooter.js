import React from 'react'
import './VideoFooter.css';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Avatar, Button } from '@material-ui/core'
import Ticker from 'react-ticker';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ShareIcon from '@material-ui/icons/Share'


function VideoFooter({ channel, avatar, song, likes, shares }) {
    return (
        <div className='video_footer'>
            <div className='video_footer_text'   >
                <Avatar src={avatar} style={{ marginTop: 15 }} />

                <h3> {'Shoaib'}. <Button>follow</Button> </h3>
            </div>
            <div className='videofooter__ticker' style={{ position: 'relative', bottom: 35 }} >
                <MusicNoteIcon className='videofooter_icon' />
                {/* <Ticker mode='smooth' >
                    {({ index }) => {
                        <>
                            <h1>  {song}</h1>
                        </>
                    }}
                </Ticker> */}
                <Ticker >
                    {({ index }) => (
                        <>
                            <h1>This is the Headline of element #{index}!</h1>
                            {/* <img src="www.my-image-source.com/" alt="" /> */}
                        </>
                    )}
                </Ticker>
            </div>
            <div className='videofooter__actions'>
                <div className='videofooter_actionleft' style={{ position: 'relative', bottom: 160 }} >
                    <FavoriteIcon fontSize="large" />
                    <ModeCommentIcon fontSize='large' />
                    <SendIcon fontSize='large' />
                    <MoreHorizIcon fontSize='large' />
                </div>

                <div className='videofooter_actionRight' style={{ position: 'relative', bottom: 80 }}>
                    <div className='videofooter_stat'>
                        <FavoriteIcon fontSize='large' />
                        <p>{likes} </p>
                    </div>
                    <div className='videofooter_stat'>
                        <ShareIcon fontSize='large' />
                        <p>{shares} </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default VideoFooter