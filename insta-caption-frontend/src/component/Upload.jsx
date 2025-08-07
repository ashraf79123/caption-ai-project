import { useState } from 'react';
import API from '../utils/axiosConfig';
import './Upload.css'; // Optional CSS

function UploadPost() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      setError('');
      const res = await API.post('/api/post', formData);
      console.log(res);
      setCaption(res.data.post.caption);
    } catch (err) {
      setError(
  <span>
    Please <a href="/login">Login</a> or <a href="/register">Register</a> to upload.
  </span>
);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreview(previewURL);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={handleUpload}>
        <label className="file-label">
          Select Image:
          <input
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {preview && (
          <div className="preview-and-caption">
            <div className="image-preview">
              <img src={preview} alt="Selected" />
            </div>

            {caption && (
              <div className="caption-result">
                <h3>🧠 AI Generated Caption:</h3>
                <p>{caption}</p>
              </div>
            )}
          </div>
        )}

        <button className="upload-button" type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {/* ❌ Removed duplicate caption block from here */}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default UploadPost;
