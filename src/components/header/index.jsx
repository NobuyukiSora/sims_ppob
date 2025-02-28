import React, { useState } from 'react';
import { HideBalance } from "../hideBalance"

export const Header = ({userProfile, userBalance}) => {
    const [profileImage, setProfileImage] = useState(userProfile?.data?.profile_image)


    const handleImageError = () => {
        setProfileImage('/assets/Profile_Photo.png')
      }

    return (
        <div className="flex direction-row">
            <div className="flex-1 p-5">
                <img
                    src={profileImage}
                    alt="profile"
                    className="w-12 h-12 mb-1"
                    onError={handleImageError}
                />
                <h5>{'Selamat datang,'}</h5>
                <h3 className="font-bold">{`${userProfile?.data?.first_name} ${userProfile?.data?.last_name}`}</h3>
            </div>
            <div className="flex-1 p-5">
                <div className="bg-red-500 p-5 rounded-xl">
                    <h5 className='text-white'>{'Saldo anda'}</h5>
                    <HideBalance balance={userBalance?.balance} />
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}