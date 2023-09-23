/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from 'react';


import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  Button, Dialog, DialogTitle, TextField, DialogContent, DialogActions,
} from '@mui/material';

import { Button, TextField } from '@mui/material';

import Webcam from 'react-webcam';
import styled from 'styled-components';

const StyledPhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCanvas = styled.canvas`
  border: 1px solid #ccc;
`;
// ... (previous code)

function PhotoCapture() {
  const webcamRef = useRef<Webcam | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [captureStatus, setCaptureStatus] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const text2 = 'J E R R Y 💞';
  const text = ` Astana,  ${new Date().getFullYear()}`;

  // State for dialog open/close
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const [email, setEmail] = useState<string>(''); // State variable for user's email
  const [captureStatus, setCaptureStatus] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const text = `Astana, Kazakhstan, ${new Date().toLocaleDateString()}}`;
  const [takingPhoto, setTakingPhoto] = useState<boolean>(false);

  const capturePhoto = () => {
    if (!webcamRef.current) return;

    const canvas = document.createElement('canvas');

    canvas.width = webcamRef.current.video!.videoWidth * 2;
    canvas.height = webcamRef.current.video!.videoHeight * 2;
    canvas.width = webcamRef.current.video!.videoWidth - 100;
    canvas.height = webcamRef.current.video!.videoHeight - 70;
    const context = canvas.getContext('2d')!;

    context.fillStyle = 'black';

    context.fillRect(0, 0, canvas.width, canvas.height);

    const frame = new Image();
    frame.src = '/go.png';

    frame.onload = () => {
      context.drawImage(frame, 0, 0, canvas.width, canvas.height);
    frame.src = '/f.jpg';

    frame.onload = () => {
      // Draw the frame image first
      context.drawImage(frame, 0, 0, canvas.width + 100, canvas.height);

      if (!webcamRef.current) return;
      context.drawImage(webcamRef.current.video!, 40, 30, canvas.width + 50, canvas.height - 70);

      // Add text
      context.font = '24px Arial';
      context.fillStyle = 'white';
      context.fillText(text, 20, canvas.height - 20);

      const paddingX = 20;
      const paddingY = 20;
      const webcamWidth = canvas.width - 2 * paddingX;
      const webcamHeight = canvas.height - 2 * paddingY;
      context.imageSmoothingEnabled = true;
      context.drawImage(
        webcamRef.current.video!,
        paddingX,
        paddingY,
        webcamWidth,
        webcamHeight,
      );

      context.font = '72px Pacifico, cursive ';
      context.fillStyle = 'pink';
      context.fillText(text2, 50, canvas.height - 50);
      context.font = '36px Pacifico, cursive ';

      context.fillText(text, 50, canvas.height - 115);
      const capturedImage = canvas.toDataURL('image/jpeg');

      const blob = dataURItoBlob(capturedImage);
      const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
      setImageFile(file);


      // Convert the captured image to a Blob
      const blob = dataURItoBlob(capturedImage);
      const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });

      setImageFile(file);


      setCaptureStatus('Photo captured successfully!');
    };
  };
  const handleCancel = () => {
    setTakingPhoto(false);
    setImage(null);
    setEmail('');
    setCaptureStatus(null);
    setImageFile(null);
  };

  const handleSubmit = () => {
    if (!imageFile) {
      console.error('No image file to send.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    formData.append('email', email);

    
    fetch('your-server-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        // Handle the response from the server
        console.log('Image sent successfully');
      })
      .catch((error) => {
        console.error('Error sending image:', error);
      });
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setImage(null);
    setEmail('');
    setCaptureStatus(null);
    setImageFile(null);
  };

  const handleSubmit = () => {
    if (!imageFile) {
      console.error('No image file to send.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('to_email', email);

    fetch('https://78gxn3hk-8080.euw.devtunnels.ms/api/photo-shoot/send', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('Image sent successfully');
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error('Error sending image:', error);
      });
  };


  function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }


  return (
    <StyledPhotoContainer>
      <Button color="primary" variant="outlined" type="button" onClick={handleClickOpen}>
        Take a Photo
      </Button>

      
      <Dialog onClose={handleClose} open={dialogOpen} maxWidth="lg">
        <DialogTitle>Capture Photo</DialogTitle>
        <DialogContent>
          <Webcam audio={false} ref={webcamRef} />
        </DialogContent>
        <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >

          <TextField
            sx={{
              width: '400px',
              textAlign: 'center',

  console.log(imageFile);

  return (
    <StyledPhotoContainer>
      {!takingPhoto ? (
        <Button color="primary" variant="outlined" type="button" onClick={() => setTakingPhoto(true)}>Take a Photo</Button>
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
          />
          <div style={{
            display: 'flex',
            marginTop: '10px',
            marginBottom: '10px',
            justifyContent: 'space-between',
          }}
          >
            <Button
              sx={{
                marginRight: '10px',

              }}
              color="primary"
              variant="outlined"
              type="button"
              onClick={capturePhoto}
            >
              Capture Photo

            </Button>
            <Button color="primary" variant="outlined" type="button" onClick={handleCancel}>Cancel</Button>
          </div>
          {image && (
            <StyledCanvas>
              <img src={image} alt="Captured" />
            </StyledCanvas>
          )}
          <TextField
            sx={{
              marginBottom: '10px',
              width: '400px',

            }}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        >
          <Button color="primary" variant="outlined" type="button" onClick={capturePhoto} sx={{}}>

            <CameraAltIcon />
          </Button>
          <Button color="primary" variant="outlined" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          {imageFile && (
          <Button color="primary" variant="outlined" type="button" onClick={handleSubmit}>
            Submit
          </Button>
          )}
          <Button
            color="primary"
            variant="outlined"
            type="button"

          <Button
            type="button"
            color="primary"
            variant="outlined"

            onClick={() => {
              if (imageFile) {
                const blobUrl = URL.createObjectURL(imageFile);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = 'image.jpg';
                a.click();
                URL.revokeObjectURL(blobUrl);
              }
            }}
          >
            Download
          </Button>

        </DialogActions>
      </Dialog>

          {imageFile && (
            <Button color="primary" variant="outlined" type="button" onClick={handleSubmit}>Submit</Button>
          )}
        </>
      )}

    </StyledPhotoContainer>
  );
}

export default PhotoCapture;
