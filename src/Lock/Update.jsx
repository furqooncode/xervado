import React, { useState } from 'react';
import Head from '../Head.jsx';
import darkColors from '../darkColors.js';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    username: 'JohnDoe',
    phone: '+234 123 456 7890',
    email: 'johndoe@example.com'
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      console.log('image picked')
    }
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      // Save logic here
      alert('Profile updated successfully!');
      console.log('user updated')
      setIsEditing(false);
    }
  };

  const EditButton = (
    <button
      className="h-[38px] w-[38px] text-xl font-bold text-white rounded-[5px]"
      style={{ backgroundColor: isEditing ? '#28a745' : darkColors.accent }}
      onClick={() => {
        if (isEditing) {
          handleSave();
        } else {
          setIsEditing(true);
        }
      }}
    >
      {isEditing ? (
        <i className="fas fa-check"></i>
      ) : (
        <i className="fas fa-edit"></i>
      )}
    </button>
  );

  return (
    <div className="min-h-screen" style={{ background: darkColors.background }}>
      <Head 
        topic="Update Profile" 
        copy={EditButton}
        handleback={() => navigate("/Home")} 
      />

      <div className="p-[20px] max-w-md mx-auto">
        {/* Profile Image Section */}
        <div className="flex justify-center mb-8 mt-6">
          <div className="relative">
            <div
              className="w-[150px] h-[150px] rounded-full overflow-hidden flex items-center justify-center"
              style={{ 
                backgroundColor: darkColors.list,
                border: `3px solid ${darkColors.accent}`
              }}
            >
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <i 
                  className="fas fa-user text-6xl"
                  style={{ color: darkColors.textSecondary }}
                ></i>
              )}
            </div>

            {/* Camera Icon Label */}
            <label
              htmlFor="profileImageInput"
              className="absolute bottom-2 right-2 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: darkColors.accent }}
            >
              <i className="fas fa-camera text-white text-lg"></i>
            </label>

            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: darkColors.textPrimary }}
            >
              Username
            </label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              readOnly={!isEditing}
              className="w-full p-3 rounded-lg outline-none font-semibold transition-all"
              style={{
                backgroundColor: isEditing ? darkColors.list : 'transparent',
                border: `2px solid ${isEditing ? darkColors.accent : darkColors.border}`,
                color: darkColors.text,
                cursor: isEditing ? 'text' : 'not-allowed'
              }}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: darkColors.textPrimary }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              readOnly={!isEditing}
              className="w-full p-3 rounded-lg outline-none font-semibold transition-all"
              style={{
                backgroundColor: isEditing ? darkColors.list : 'transparent',
                border: `2px solid ${isEditing ? darkColors.accent : darkColors.border}`,
                color: darkColors.text,
                cursor: isEditing ? 'text' : 'not-allowed'
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: darkColors.textPrimary }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              readOnly={!isEditing}
              className="w-full p-3 rounded-lg outline-none font-semibold transition-all"
              style={{
                backgroundColor: isEditing ? darkColors.list : 'transparent',
                border: `2px solid ${isEditing ? darkColors.accent : darkColors.border}`,
                color: darkColors.text,
                cursor: isEditing ? 'text' : 'not-allowed'
              }}
            />
          </div>

          {/* Submit Button */}
          {isEditing && (
            <button
              onClick={handleSave}
              className="w-full py-3 rounded-lg font-bold text-lg mt-6 transition-transform active:scale-95"
              style={{ 
                backgroundColor: darkColors.accent,
                color: darkColors.text 
              }}
            >
              SAVE CHANGES
            </button>
          )}
        </div>

        {/* Info Text */}
        <div 
          className="text-center text-sm mt-6"
          style={{ color: darkColors.textSecondary }}
        >
          {isEditing ? (
            <p>✏️ Edit mode: Make your changes and save</p>
          ) : (
            <p>👆 Tap the edit button to update your profile</p>
          )}
        </div>
      </div>
    </div>
  );
}