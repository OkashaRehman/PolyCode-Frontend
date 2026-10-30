import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImageDataUrl } from "../utils/cropImage";

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProfilePictureCropper({ onCancel, onSave, saving }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [error, setError] = useState("");

  const onCropComplete = useCallback((_croppedArea, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPEG, PNG, or WebP).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be under 8 MB.");
      return;
    }

    setError("");
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setImageSrc(dataUrl);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    } catch {
      setError("Could not read that image.");
    }
  }

  async function handleSaveCrop() {
    if (!imageSrc || !croppedAreaPixels) {
      setError("Choose a photo and adjust the crop first.");
      return;
    }

    setError("");
    try {
      const cropped = await getCroppedImageDataUrl(
        imageSrc,
        croppedAreaPixels,
        256,
      );
      await onSave(cropped);
    } catch (err) {
      setError(err.message || "Could not crop image.");
    }
  }

  return (
    <div className="profile-crop-modal" role="dialog" aria-modal="true">
      <div className="profile-crop-panel">
        <div className="profile-crop-head">
          <h3>Profile picture</h3>
          <button
            type="button"
            className="profile-crop-close"
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {!imageSrc ? (
          <div className="profile-crop-upload">
            <p>Upload a photo, then drag and zoom to adjust how it appears.</p>
            <label className="profile-crop-file-btn">
              Choose image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                hidden
              />
            </label>
          </div>
        ) : (
          <>
            <div className="profile-crop-stage">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <label className="profile-crop-zoom-label">
              Zoom
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
            </label>
            <button
              type="button"
              className="profile-crop-change-file"
              onClick={() => setImageSrc(null)}
            >
              Choose a different image
            </button>
          </>
        )}

        {error && <p className="profile-crop-error">{error}</p>}

        <div className="profile-crop-actions">
          <button type="button" className="profile-edit-btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="profile-edit-btn profile-edit-btn-primary"
            onClick={handleSaveCrop}
            disabled={!imageSrc || saving}
          >
            {saving ? "Uploading…" : "Save picture"}
          </button>
        </div>
      </div>
    </div>
  );
}
