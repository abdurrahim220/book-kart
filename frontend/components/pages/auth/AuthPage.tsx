"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AuthPageProps,
  ForgotFormData,
  LoginFormData,
  SignupFormData,
} from "@/lib/constant/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import AuthForm from "./AuthForm";

const AuthPage: React.FC<AuthPageProps> = ({ isLoginOpen, setIsLoginOpen }) => {
  const [currentTab, setCurrentTab] = useState<"login" | "signup" | "forgot">(
    "login"
  );
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>();

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupFormData>();

  const {
    register: forgotRegister,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
  } = useForm<ForgotFormData>();

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    // Add login logic
    setLoading(false);
  };

  const handleSignup = async (data: SignupFormData) => {
    setLoading(true);
    // Add signup logic
    setLoading(false);
  };

  const handleForgotPassword = async (data: ForgotFormData) => {
    setLoading(true);
    // Add forgot password logic
    setLoading(false);
    setForgotPasswordSuccess(true);
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="text-center text-2xl font-bold mb-4">
          <DialogTitle>Welcome to Book Kart</DialogTitle>
          <Tabs
            value={currentTab}
            onValueChange={(value) =>
              setCurrentTab(value as "login" | "signup" | "forgot")
            }
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
              <TabsTrigger value="forgot">Forgot</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="login" className="space-y-4">
                  <AuthForm
                    type="login"
                    onSubmit={handleLoginSubmit(handleLogin)}
                    loading={loading}
                    errors={loginErrors}
                    register={loginRegister}
                  />
                </TabsContent>
                <TabsContent value="signup" className="space-y-4">
                  <AuthForm
                    type="signup"
                    onSubmit={handleSignupSubmit(handleSignup)}
                    loading={loading}
                    errors={signupErrors}
                    register={signupRegister}
                  />
                </TabsContent>
                <TabsContent value="forgot" className="space-y-4">
                  <AuthForm
                    type="forgot"
                    onSubmit={handleForgotSubmit(handleForgotPassword)}
                    loading={loading}
                    errors={forgotErrors}
                    register={forgotRegister}
                  />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPage;
