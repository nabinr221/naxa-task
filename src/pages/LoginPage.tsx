/**
 * Login Page Component
 * User authentication page
 */

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Validators } from "../utils/validators";
import { logger } from "../utils/logger";
import { ROUTES } from "../constants";
import { useForm } from "react-hook-form";
import InputField from "../components/ui/InputField/InputField";

interface FormState {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
  isLoading: boolean;
}

/**
 * LoginPage component
 * Handles user login with email and password
 */

interface LoginForm {
  email: string;
  password: string;
  description: string;
}
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
      description: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen  from-blue-500 to-blue-600 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Naxa Task
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Sign in to your account
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6"
          >
            <InputField<LoginForm>
              name="email"
              control={control}
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
            />

            <InputField<LoginForm>
              name="password"
              control={control}
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
            />

            <InputField<LoginForm>
              name="description"
              control={control}
              label="Description"
              type="textarea"
              placeholder="Tell us about yourself..."
              rows={4}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Submit
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>Demo credentials:</strong>
              <br />
              Email: demo@example.com
              <br />
              Password: password123
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
          <a href={ROUTES.HOME} className="text-white hover:underline">
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
