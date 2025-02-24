"use client";

import { Card } from "@/components/ui/card";
import {
  useVerifyEmailMutation,
  useGetSingleUserQuery,
} from "@/lib/store/features/authApi";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { RootState } from "@/lib/store/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function VerifyEmail() {
  const params = useParams();
  const token = params?.token as string;
  const router = useRouter();

  const isLoginUser = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const { data: singleUser, refetch } = useGetSingleUserQuery(null);
  const user = singleUser?.data;

  const [verifyEmail, { isLoading, isError, isSuccess }] =
    useVerifyEmailMutation();

  useEffect(() => {
    if (!isLoginUser) {
      toast.error("You need to login to verify your email.");
      router.push("/");
      return;
    }

    if (token) {
      verifyEmail(token)
        .unwrap()
        .then(() => {
          toast.success("Email verified successfully!");
          refetch();
          setTimeout(() => {
            router.push("/");
          }, 3000);
        })
        .catch(() => {
          toast.error("Failed to verify email. Please try again.");
        });
    }
  }, [isLoginUser, token, router, verifyEmail, refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        {user?.isVerified ? (
          <div className="text-center space-y-4">
            {/* {toast.success("Your email is already verified.")} */}
            <p>Your email is already verified.</p>
            <Button onClick={() => router.push("/")}>Return to Homepage</Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {isLoading ? (
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
              ) : isSuccess ? (
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              ) : isError ? (
                <XCircle className="h-12 w-12 text-destructive" />
              ) : (
                <Mail className="h-12 w-12 text-primary" />
              )}
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              Email Verification
            </h1>

            {isLoading && (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Verifying your email address...
                </p>
                <Progress value={66} className="w-full" />
              </div>
            )}

            {isSuccess && (
              <div className="space-y-4">
                <p className="text-green-600 dark:text-green-400">
                  Your email has been verified successfully!
                </p>
                <p className="text-sm text-muted-foreground">
                  Redirecting you to the homepage...
                </p>
              </div>
            )}

            {isError && (
              <div className="space-y-4">
                <p className="text-destructive">
                  We couldn&apos;t verify your email address.
                </p>
                <p className="text-sm text-muted-foreground">
                  The verification link might be expired or invalid.
                </p>
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="w-full"
                >
                  Return to Homepage
                </Button>
              </div>
            )}

            {!isLoading && !isSuccess && !isError && (
              <p className="text-muted-foreground">
                Please wait while we verify your email address...
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
