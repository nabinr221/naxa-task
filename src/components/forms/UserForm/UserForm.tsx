import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, type UserFormData } from "../../../schemas";
import InputField, { Button } from "../../ui";
import FileUpload from "../../ui/FileUpload/FileUpload";
import type { SubmittedUserData } from "../../../types";

interface UserFormProps {
  onFormSubmit: (data: SubmittedUserData) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onFormSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    reset,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("contact", data.contact);
      formData.append("address", data.address);

      // Handle photo file
      if (data.photo && data.photo.length > 0) {
        formData.append("photo", data.photo[0]);
      }

      // Handle CV file
      if (data.cv && data.cv.length > 0) {
        formData.append("cv", data.cv[0]);
      }

      // Prepare data for parent component display
      const submittedData: SubmittedUserData = {
        name: data.name,
        email: data.email,
        contact: data.contact,
        address: data.address,
        photo: {
          name: data.photo?.[0]?.name || "No file selected",
          size: data.photo?.[0]?.size || 0,
          type: data.photo?.[0]?.type || "Unknown",
        },
        cv: {
          name: data.cv?.[0]?.name || "No file selected",
          size: data.cv?.[0]?.size || 0,
          type: data.cv?.[0]?.type || "Unknown",
        },
        submittedAt: new Date().toISOString(),
      };
      // Send data to parent component for display
      onFormSubmit(submittedData);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      setError("root", {
        message: "Failed to submit form. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField<UserFormData>
          name="name"
          control={control}
          label="Full Name"
          placeholder="Enter your full name"
          required
        />
        <InputField<UserFormData>
          name="email"
          control={control}
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />

        <InputField<UserFormData>
          name="contact"
          control={control}
          label="Contact Number"
          placeholder="Enter your contact number"
          type="tel"
          required
        />

        <InputField<UserFormData>
          name="address"
          control={control}
          label="Address"
          placeholder="Enter your address"
          required
        />

        <FileUpload<UserFormData>
          name="photo"
          control={control}
          label="Upload Photo"
          accept="image/jpeg,image/jpg,image/png,image/gif"
          required="Photo is required"
          helperText="Supported formats: JPEG, PNG, GIF | Max size: 5MB"
        />

        <FileUpload<UserFormData>
          name="cv"
          control={control}
          label="Upload CV/Document"
          accept=".pdf,.doc,.docx,application/pdf,application/msword"
          required="CV file is required"
          helperText="Supported formats: PDF, DOC, DOCX | Max size: 10MB"
        />

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
