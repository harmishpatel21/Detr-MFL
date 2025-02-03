"use client"
import React, { useState } from 'react';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
                <div>
                    <h2>Uploaded Image:</h2>
                    <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
