/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from 'react';

import {
  Button, Dialog, DialogTitle, TextField, DialogContent, DialogActions, useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Webcam from 'react-webcam';
import styled from 'styled-components';

import SwipeableTextMobileStepper from '../Webcam/Carousel';

const StyledPhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const photos = ['/1.png', '2.png', '3.png', '4.png', '5.png'];

const StyledCanvas = styled.canvas`
  border: 1px solid #ccc;
`;

function TelCam({
  open, setOpen,

}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = photos.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const webcamRef = useRef<Webcam | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [captureStatus, setCaptureStatus] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  // State for dialog open/close
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('string');
  console.log(selectedImage);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const capturePhoto = () => {
    if (!webcamRef.current) return;

    const canvas = document.createElement('canvas');
    const maxWidth = 270; // Set your desired maximum width
    const maxHeight = 120; // Set your desired maximum height
    const { videoWidth } = webcamRef.current.video!;
    const { videoHeight } = webcamRef.current.video!;

    // Calculate the new dimensions while maintaining the aspect ratio
    let newWidth = videoWidth;
    let newHeight = videoHeight;

    if (videoWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = (videoHeight * maxWidth) / videoWidth;
    }

    if (newHeight > maxHeight) {
      newWidth = (videoWidth * maxHeight) / videoHeight;
      newHeight = maxHeight;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
    const context = canvas.getContext('2d')!;

    context.fillStyle = 'black';
    context.fillRect(0, 0, newWidth, newHeight);

    const frame = new Image();
    frame.src = selectedImage;

    frame.onload = () => {
      context.drawImage(frame, 0, 0, newWidth, newHeight);

      if (!webcamRef.current) return;

      const paddingX = 20;
      const paddingY = 20;
      const webcamWidth = newWidth - 2 * paddingX;
      const webcamHeight = newHeight - 2 * paddingY;
      context.imageSmoothingEnabled = true;
      context.drawImage(
        webcamRef.current.video!,
        paddingX,
        paddingY,
        webcamWidth,
        webcamHeight,
      );

      const capturedImage = canvas.toDataURL('image/jpeg');
      const blob = dataURItoBlob(capturedImage);
      const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
      setImageFile(file);
      setCaptureStatus('Photo captured successfully!');
    };
  };

  const handleCancel = () => {
    setOpen(false);
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
        setOpen(false);
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

      {/* Dialog */}
      <Dialog onClose={handleClose} open={open} maxWidth="lg">
        <DialogTitle>{t('capture')}</DialogTitle>
        <DialogContent>
          <Webcam audio={false} ref={webcamRef} />
        </DialogContent>
        <DialogContent sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <SwipeableTextMobileStepper setSelectedImage={setSelectedImage} />
          {
            selectedImage && (
            <div>
              {t('selectedImage')}
              {' '}
              {selectedImage}
            </div>
            )
          }
          <TextField
            sx={{
              marginBottom: '10px',
              width: '400px',
            }}
            type="email"
            placeholder={t('enterEmail')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </DialogContent>
        <DialogActions sx={{
          display: 'flex',
          justifyContent: 'center',

        }}
        >
          <Button color="primary" variant="contained" type="button" onClick={capturePhoto}>
            {t('take')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={handleCancel}
          >
            {t('cancel')}
          </Button>
          { imageFile && (
          <Button color="primary" variant="contained" type="button" onClick={handleSubmit}>
            {t('submit')}
          </Button>
          )}
          <Button
            color="primary"
            variant="contained"
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
            {t('download')}
          </Button>
        </DialogActions>
      </Dialog>
    </StyledPhotoContainer>
  );
}

export default TelCam;
