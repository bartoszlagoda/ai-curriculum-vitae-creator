import React, { useState } from "react";

function ImageUploader({ onImageUpload }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        if (onImageUpload) onImageUpload(reader.result); // Przekaż dane obrazu do nadrzędnego komponentu
      };
      reader.readAsDataURL(file);
    }
  }; 

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-24 h-24 border rounded-full overflow-hidden">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Upload Image
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm text-gray-500"
      />
    </div>
  );
}

export default ImageUploader;
