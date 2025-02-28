/* eslint-disable @typescript-eslint/no-unused-vars */
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

import toast from "react-hot-toast";
import { authState, setToken, toggleLoginDialog } from "@/lib/store/slice/userSlice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import Image from "next/image";
import {
  BASE_URL,
  useForgotPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
} from "@/lib/store/features/authApi";
import { useRouter } from "next/navigation";

const AuthPage: React.FC<AuthPageProps> = ({ isLoginOpen, setIsLoginOpen }) => {
  const [currentTab, setCurrentTab] = useState<"login" | "signup" | "forgot">(
    "login"
  );
  const [loading, setLoading] = useState(false);

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

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
    try {
      const response = await login(data);
      if (response.data?.success) {
        toast.success("Logged in successfully");
        // dispatch(setToken(response.data.data.accessToken));
        dispatch(toggleLoginDialog());
        window.location.reload();
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Add login logic
    try {
      router.push(`${BASE_URL}/auth/google`);
      dispatch(authState());
      setTimeout(() => {
        toast.success("Google Login Successful");
        setIsLoginOpen(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    if (!data.agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }
    // console.log(data);
    setLoading(true);
    try {
      // const { email, password, name, agreeTerms } = data;
      const response = await register(data);
      if (response.data?.success) {
        toast.success("Verification link sent to email");
        dispatch(toggleLoginDialog());
      }
    } catch (error) {
      console.error(error);
      toast.error("Email already registered");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (data: ForgotFormData) => {
    setLoading(true);
    console.log(data.email)
    try {
      const result = await forgotPassword(data.email).unwrap();
      
      if (result.success) {
        toast.success("Password reset link sent to email");
      }
    } catch (error) {
      // console.error(error);
      toast.error("Email not found");
    }
    setLoading(false);
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-5">
                      <div className="w-full border"></div>
                      <div>or</div>
                      <div className="w-full border"></div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={handleGoogleLogin}>
                        <Image
                          src={"/icons/google.png"}
                          alt="google"
                          height={30}
                          width={30}
                        />
                        <h3>Google</h3>
                      </button>
                    </div>
                  </div>
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
