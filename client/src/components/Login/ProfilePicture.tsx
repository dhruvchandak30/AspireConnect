import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
// import { userId as userIdAtom } from '../../store/atoms/userId';
import { userState } from '../../store/atoms/userState';
const CHUNK_SIZE = 1024 * 1024;

const ProfilePicture: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const user = useRecoilValue(userState);
    const userId = user.id;
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 1) {
                setErrorMessage('File size should not exceed 1MB.');
                setSelectedFile(null);
                setPreview(null);
                return;
            }

            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setErrorMessage('');
            setSuccessMessage('');
        }
    };

    const uploadChunk = async (
        chunk: Blob,
        chunkIndex: number,
        totalChunks: number
    ) => {
        console.log(userId);
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('userId', userId);
        formData.append('chunkIndex', chunkIndex.toString());
        formData.append('totalChunks', totalChunks.toString());
        if (userId === '') {
            setErrorMessage('Try to Sign in Again');
            throw new Error('Failed to Get User Credentials');
        }
        const response = await fetch(`http://localhost:3001/storeimage`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload chunk');
        }

        return response.json();
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedFile) {
            setIsLoading(true);
            setSuccessMessage('');
            setErrorMessage('');

            try {
                const file = selectedFile;
                const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

                for (let i = 0; i < totalChunks; i++) {
                    const chunk = file.slice(
                        i * CHUNK_SIZE,
                        (i + 1) * CHUNK_SIZE
                    );
                    const response = await uploadChunk(chunk, i, totalChunks);
                    console.log(response);
                }

                setIsLoading(false);
                setSuccessMessage('Profile picture uploaded successfully!');
                setSelectedFile(null);
                setPreview(null);
            } catch (error) {
                setIsLoading(false);
                setErrorMessage(
                    'Failed to upload profile picture. Please try again.'
                );
            }
        }
    };

    return (
        <div className="w-full max-w-md p-16 rounded-lg shadow-2xl">
            <h2 className="mb-16 text-3xl font-bold text-center">
                Upload Profile Picture
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile Preview"
                            className="w-32 h-32 mx-auto rounded-full"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-32 h-32 mx-auto bg-gray-200 rounded-full">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                {errorMessage && (
                    <div className="mb-4 text-red-600 text-center">
                        {errorMessage}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    style={{
                        background:
                            'linear-gradient(to right, #ff4b2b, #ff4160)',
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                            'linear-gradient(to right, #ff4160, #ff4b2b)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                            'linear-gradient(to right, #ff4b2b, #ff4160)')
                    }
                    disabled={isLoading}
                >
                    {isLoading ? 'Uploading...' : 'Upload'}
                </button>
                {isLoading && (
                    <div className="flex justify-center mt-4">
                        <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                )}
                {successMessage && (
                    <div className="mt-4 text-green-600 text-center">
                        {successMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfilePicture;
