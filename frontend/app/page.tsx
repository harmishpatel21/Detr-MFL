"use client"
import React, { useState } from 'react';
import axios from './axiosConfig';



const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<File | null>(null); 

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // const formData = new FormData();
            // formData.append('file', file);

            // axios.post('/upload/', formData)
            //   .then(response => {
            //       console.log(response.data);
            //   })
            //   .catch(error => {
            //       console.error('Error uploading the image:', error);
            //   });

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('/upload/', formData)
            .then(response => {
                console.log(response.data);
                setProcessedImage(`data:image/png;base64,${response.data.processed_image}`);
            })
            .catch(error => {
                console.error('Error uploading the image:', error);
            });
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <br />
            {selectedFile && (
                <button 
                    onClick={handleUpload}
                    style={{ marginTop: '10px' }}
                >
                    Upload Image
                </button>
            )}

            {selectedImage && (
                <div>
                    <br />
                    <h2>Preview:</h2>
                    <img src={selectedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                </div>
            )}

            <br/>

            {processedImage && (
                <div>
                    <h2>Processed Image:</h2>
                    <img 
                        src={processedImage}
                        alt='Processed'
                        style={{ maxWidth: '100%', maxHeight: '400px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;

// const ImageUpload = () => {
//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setSelectedImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {selectedImage && (
//                 <div>
//                     <h2>Uploaded Image:</h2>
//                     <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '400px' }} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ImageUpload;
