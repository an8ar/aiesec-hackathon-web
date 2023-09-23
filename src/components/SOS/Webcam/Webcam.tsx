/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from 'react';

import {
  Button, Dialog, DialogTitle, TextField, DialogContent, DialogActions,
} from '@mui/material';
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

  const capturePhoto = () => {
    if (!webcamRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = webcamRef.current.video!.videoWidth * 2;
    canvas.height = webcamRef.current.video!.videoHeight * 2;
    const context = canvas.getContext('2d')!;

    context.fillStyle = 'black';

    context.fillRect(0, 0, canvas.width, canvas.height);

    const frame = new Image();
    frame.src = '/go.png';

    frame.onload = () => {
      context.drawImage(frame, 0, 0, canvas.width, canvas.height);

      if (!webcamRef.current) return;

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
      setCaptureStatus('Photo captured successfully!');
    };
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

      {/* Dialog */}
      <Dialog onClose={handleClose} open={dialogOpen} maxWidth="lg">
        <DialogTitle>Capture Photo</DialogTitle>
        <DialogContent>
          <Webcam audio={false} ref={webcamRef} />
        </DialogContent>
        <DialogContent>
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
        <DialogActions>
          <Button color="primary" variant="outlined" type="button" onClick={capturePhoto}>
            Capture
          </Button>
          <Button color="primary" variant="outlined" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="primary" variant="outlined" type="button" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            color="primary"
            variant="outlined"
            type="button"
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
    </StyledPhotoContainer>
  );
}

export default PhotoCapture;