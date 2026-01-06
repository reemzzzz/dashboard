import React, { useState, useRef, useEffect, useContext } from 'react';
import { Avatar, Badge, Box, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../contexts/UserContext';
import { tokens } from '../theme';

/**
 * Converts a File object to a compressed, resized Base64 data URL using Canvas.
 * This is the fix for QuotaExceededError.
 * @param {File} file The image file to convert.
 * @param {number} maxWidth Maximum width/height for the output image (e.g., 800px).
 * @param {number} quality JPEG quality (0.0 to 1.0).
 * @returns {Promise<string>} The compressed Base64 string.
 */
const convertFileToBase64Compressed = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
        if (!(file instanceof File) || !file.type.startsWith('image/')) {
            return reject(new TypeError("Parameter is not a valid image File object."));
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions for compression
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxWidth) {
                        width *= maxWidth / height;
                        height = maxWidth;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Compress and convert to Base64 (using JPEG for smaller file size)
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedBase64);
            };
            img.onerror = (error) => reject(error);
            img.src = e.target.result;
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};


const ImageUploader = ({
    editMode = false,
    initialImageURL,
    onPhotoChange,
    defaultImageURL = "../../assets/user2.png" // Ensure this path is correct
}) => {
    const [displayURL, setDisplayURL] = useState(initialImageURL || defaultImageURL);
    const fileInputRef = useRef(null);
    const user = useContext(UserContext)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        setDisplayURL(initialImageURL || defaultImageURL);
    }, [initialImageURL, defaultImageURL]);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];

        if (file) {
            try {
                // Use the new COMPRESSED conversion function
                const base64String = await convertFileToBase64Compressed(file, 800, 0.7); 
                
                setDisplayURL(base64String);

                // Pass the compressed Base64 string back to the parent
                if (onPhotoChange) {
                    onPhotoChange(base64String);
                }
            } catch (error) {
                console.error("File conversion/compression failed:", error);
                // Revert to initial/default on failure
                setDisplayURL(initialImageURL || defaultImageURL); 
            }
        }
        e.target.value = '';
    };

    const handleImageUpload = () => {
        if (editMode) {
            fileInputRef.current?.click();
        }
    };
    
    const handleImageRemove = () => {
        setDisplayURL(defaultImageURL);
        
        // Notify parent that the photo should be cleared
        if (onPhotoChange) {
            onPhotoChange(null);
        }
    }


    return (
        <Box className="flex flex-col items-center justify-center">
            <input 
                type="file"
                hidden
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {editMode ? (
              <Badge 
                badgeContent={<EditIcon sx={{ fontSize: 16 }} />} 
                color="secondary"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClick={handleImageUpload} 
                sx={{
                    cursor: "pointer",
                    "& .MuiBadge-badge":{
                        right: 0,
                        bottom: 0,
                        padding: 0,
                        transform: 'scale(1) translate(-30%,-30%)',
                        minWidth: 25, 
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                }}
                >
                <Avatar
                    alt= {user?.name || "profile-user"}
                    src={displayURL} 
                    sx={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        bgcolor: colors.primary[300],                                         
                        fontSize: "40px",                                         
                        color: colors.grey[200], 
                    }}
                />
              </Badge> 
            ) : (
                <Avatar
                    sx={{ width: "120px", height: "120px", borderRadius: "50%" }}
                    alt="profile-user"
                    src={displayURL} 
                />
            )}

            {/* Optional: Remove button when in edit mode and not displaying the default image */}
            {editMode && displayURL !== defaultImageURL && (
                <button 
                    onClick={handleImageRemove} 
                    style={{ 
                        marginTop: '10px', 
                        color: 'red', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    Remove Photo
                </button>
            )}
        </Box>
    )
}

export default ImageUploader;