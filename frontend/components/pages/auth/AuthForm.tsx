/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { fields } from "@/lib/constant/auth_constant";

type AuthType = "login" | "signup" | "forgot" | "resetPassword";

interface AuthFormProps {
  type: AuthType;
  onSubmit: SubmitHandler<any>;
  loading: boolean;
  errors: Record<string, any>;
  register: any;
}

const AuthForm = ({
  type,
  onSubmit,
  loading,
  errors,
  register,
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields[type].map((field) => {
        if (field.type === "checkbox") {
          return (
            <div key={field.name} className="flex items-center space-x-2">
              <input
                id={field.name}
                type="checkbox"
                {...register(field.name, { required: field.required })}
                className="h-4 w-4"
                disabled={loading}
              />
              <Label htmlFor={field.name} className="text-sm">
                {field.label}
              </Label>
              {errors[field.name] && (
                <p className="text-sm text-red-500">
                  You must agree to the terms
                </p>
              )}
            </div>
          );
        }
        const Icon = field.icon;
        const isPassword = field.type === "password";

        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <div className="relative">
              {Icon && (
                <Icon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
              )}
              <Input
                id={field.name}
                type={
                  isPassword ? (showPassword ? "text" : "password") : field.type
                }
                {...register(field.name, { required: field.required })}
                className={`${Icon ? "pl-10" : ""} ${
                  isPassword ? "pr-10" : ""
                } `}
                disabled={loading}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
              {errors[field.name] && (
                <p className="text-sm text-red-500">
                  {field.label} is required
                </p>
              )}
            </div>
          </div>
        );
      })}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : type === "login" ? (
          "Login"
        ) : type === "signup" ? (
          "Create Account"
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
