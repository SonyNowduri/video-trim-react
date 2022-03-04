import React from 'react';
// import { Button, makeStyles } from '@material-ui/core';
import uploadImg from '../images/nature.jpg'
// const useStyles = makeStyles({
//   uploadButton: {
//     background: '#FDFDFD',
//     border: '1px solid #D0D0D1',
//     boxSizing: 'border-box',
//     borderRadius: '5px',
//     width: '100%',
//     margin: '15px 0',
//     padding: '16px',
//     '& .MuiButton-label': {
//       position: 'relative',
//       '& span': {
//         position: 'absolute',
//         left: '16px'
//       }
//     }
//   },
// });
const FileUploader = (props) => {
    // const classes = useStyles(props);
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded);
    };
    return (
        <>
            <button onClick={handleClick} style={{ marginBottom: '50px', width: '640px', height: '100px', backgroundColor: 'white' }} >
                <span>Click here to upload videos</span>
                {/* <img src={uploadImg} alt={"Upload"} style={{ width: '30px', height: '30px' }} /> */}
            </button>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    );
};
export default FileUploader;