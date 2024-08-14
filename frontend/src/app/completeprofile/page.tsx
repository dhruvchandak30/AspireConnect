'use client';
import ProfilePicture from '@/components/Signup/ProfilePicture';
import UploadURL from '@/components/Signup/UploadUrl';
import React from 'react';

const page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
            <div>
                <ProfilePicture />
            </div>
            <div>
                <UploadURL />
            </div>
        </div>
    );
};

export default page;
