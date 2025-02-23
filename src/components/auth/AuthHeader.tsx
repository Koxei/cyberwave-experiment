import React from 'react';

interface AuthHeaderProps {
  isLogin: boolean;
  showPasswordReset?: boolean;
  resetStep?: 'email' | 'otp' | 'password';
}

export const AuthHeader = ({ isLogin, showPasswordReset }: AuthHeaderProps) => {
  // Only show headers for login/signup, not for password reset
  if (!showPasswordReset) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">
          {isLogin ? "Log in to your account" : "Create your account"}
        </h2>
        <p className="text-sm text-gray-500">
          {isLogin 
            ? "Welcome back! Please enter your details." 
            : "Join us! Fill in your information below."}
        </p>
      </div>
    );
  }

  // Return null for password reset flow - no headers needed
  return null;
};