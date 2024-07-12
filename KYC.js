import React, { useState, useRef } from 'react';
import './KYC.css'; // Import CSS for styling

const KYC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idType: 'Select ID Type',
    idNumber: '',
    dob: '',
    expiryDate: '',
    frontImage: null,
    backImage: null
  });

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [captureStage, setCaptureStage] = useState(0); // 0: Initial, 1: ID photos capture, 2: Face capture
  const [submissionStatus, setSubmissionStatus] = useState(''); // '', 'pending', 'submitted'

  const videoRef = useRef(null);

  const handleEnableCamera = () => {
    // Check for camera support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Camera not supported on this device.');
      return;
    }

    // Enable camera access
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setCameraEnabled(true);
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        alert('Error accessing camera. Please try again.');
      });
  };

  const handleDisableCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    setCameraEnabled(false);
    setCameraStream(null);
  };

  const handleCaptureFace = () => {
    // Implement face verification logic (e.g., using face detection libraries)
    // For demonstration purposes, assume face verification is successful
    setSubmissionStatus('pending');
    setTimeout(() => {
      setSubmissionStatus('submitted');
    }, 3000); // Simulate pending status for 3 seconds

    // Automatically proceed to the next capture stage after verification
    setCaptureStage(0); // Reset to initial stage after face capture
  };

  const handleCaptureIDPhoto = (side, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      if (side === 'front') {
        setFormData({ ...formData, frontImage: imageData });
      } else if (side === 'back') {
        setFormData({ ...formData, backImage: imageData });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitKYC = () => {
    // Validate form data (e.g., required fields)
    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.idType === 'Select ID Type' ||
      formData.idNumber === '' ||
      formData.dob === '' ||
      formData.expiryDate === '' ||
      formData.frontImage === null ||
      formData.backImage === null
    ) {
      alert('Please fill in all required fields and complete verification.');
      return;
    }

    // Implement submission logic (e.g., API call to submit KYC data)
    console.log('KYC Form Data:', formData);
    setSubmissionStatus('pending'); // Set status to pending after submission
    // Simulate API call to save KYC data
    setTimeout(() => {
      setSubmissionStatus('submitted');
    }, 3000); // Simulate pending status for 3 seconds
  };

  return (
    <div className="kyc-container">
      <h2>KYC Verification</h2>
      {submissionStatus === '' && (
        <div className="kyc-form">
          <label>First Name:</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          <label>ID Type:</label>
          <select
            value={formData.idType}
            onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
          >
            <option value="Select ID Type">Select ID Type</option>
            <option value="Driving License">Driving License</option>
            <option value="Passport">Passport</option>
            <option value="National ID Card">National ID Card</option>
            {/* Add more options as needed */}
          </select>
          <label>ID Number:</label>
          <input
            type="text"
            value={formData.idNumber}
            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
          />
          <label>Date of Birth:</label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
          <label>Expiry Date:</label>
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          />
          <label>Upload Front of ID:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleCaptureIDPhoto('front', e)}
          />
          <label>Upload Back of ID:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleCaptureIDPhoto('back', e)}
          />
          <button type="button" onClick={handleSubmitKYC}>Submit KYC</button>
        </div>
      )}
      {submissionStatus === 'pending' && (
        <div className="kyc-status">
          <p>Your KYC is pending. Please wait for verification.</p>
        </div>
      )}
      {submissionStatus === 'submitted' && (
        <div className="kyc-status">
          <p>Your KYC has been submitted successfully.</p>
        </div>
      )}
      <div className="kyc-id-photos">
        <img src={formData.frontImage} alt="Front of ID" />
        <img src={formData.backImage} alt="Back of ID" />
      </div>
      {captureStage === 2 && (
        <div className="kyc-camera">
          <h3>Face Verification</h3>
          {!cameraEnabled ? (
            <button type="button" onClick={handleEnableCamera}>Enable Camera for Face Verification</button>
          ) : (
            <div>
              <p>Camera enabled for face verification.</p>
              <div className="camera-preview">
                <video ref={videoRef} autoPlay muted />
                <button type="button" onClick={handleCaptureFace}>Capture Face</button>
              </div>
              <button type="button" onClick={() => setCaptureStage(0)}>Back: Upload ID</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KYC;
