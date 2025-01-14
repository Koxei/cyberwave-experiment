// src/features/auth/components/AuthModal.tsx

import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { AuthModalContent } from "./AuthModalContent";

interface AuthModalProps {
  isOpen: boolean;
  onPasswordResetStart?: () => void;
  onPasswordResetComplete?: () => void;
  onGuestLogin?: () => void;
}

const AuthModal = ({
  isOpen,
  onPasswordResetStart,
  onPasswordResetComplete,
  onGuestLogin
}: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetStep, setResetStep] = useState<'email' | 'otp' | 'password'>('email');

  // Updated handler for back to login
  const handleBackToLogin = () => {
    console.log('AuthModal handleBackToLogin called');
    setShowPasswordReset(false);
    setResetStep('email');
    setIsLogin(true);
  };

  return (
    <Dialog open={isOpen || showPasswordReset} modal>
      <AuthModalContent 
        isLogin={isLogin}
        showPasswordReset={showPasswordReset}
        resetStep={resetStep}
        onToggle={() => {
          console.log('AuthModal handleToggle called');
          setIsLogin(!isLogin);
          if (showPasswordReset) {
            setShowPasswordReset(false);
            setResetStep('email');
          }
        }}
        onPasswordResetStart={() => {
          setShowPasswordReset(true);
          onPasswordResetStart?.();
        }}
        onPasswordResetComplete={() => {
          setShowPasswordReset(false);
          onPasswordResetComplete?.();
        }}
        onBackToLogin={handleBackToLogin}
        onGuestLogin={onGuestLogin}
      />
    </Dialog>
  );
};

export default AuthModal;
