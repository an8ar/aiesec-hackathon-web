/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from 'react';

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
  const [text, setText] = useState<string>('');
  const [captureStatus, setCaptureStatus] = useState<string | null>(null);

  const capturePhoto = () => {
    if (!webcamRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = webcamRef.current.video!.videoWidth - 30;
    canvas.height = webcamRef.current.video!.videoHeight - 30;
    const context = canvas.getContext('2d')!;

    const frame = new Image();
    frame.src = '/frame.png';

    frame.onload = () => {
      // Draw the frame image first
      context.drawImage(frame, 0, 0, canvas.width, canvas.height);

      // Capture the webcam feed on top of the frame
      if (!webcamRef.current) return;
      context.drawImage(webcamRef.current.video!, 20, 20, canvas.width + 10, canvas.height - 30);

      // Add text
      context.font = '24px Arial';
      context.fillStyle = 'white';
      context.fillText(text, 20, canvas.height - 20);

      const capturedImage = canvas.toDataURL('image/jpeg');
      setImage(capturedImage);

      setCaptureStatus('Photo captured successfully!');
    };
  };

  console.log(image);

  return (
    <StyledPhotoContainer>
      <Webcam
        audio={false}
        ref={webcamRef}
      />
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="button" onClick={capturePhoto}>Capture Photo</button>
      {image && (
        <StyledCanvas>
          <img src={image} alt="Captured" />
        </StyledCanvas>
      )}
      <button
        type="button"
        onClick={() => {
          if (image) {
            const a = document.createElement('a');
            a.href = image;
            a.download = 'image.jpg';
            a.click();
          }
        }}
      >
        download

      </button>
    </StyledPhotoContainer>
  );
}

export default PhotoCapture;
