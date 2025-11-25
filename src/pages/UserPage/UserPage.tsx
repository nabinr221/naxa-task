import { useState } from "react";
import UserForm from "../../components/forms/UserForm/UserForm";
import SubmittedDataDisplay from "../../components/SubmittedDataDisplay/SubmittedDataDisplay";
import type { SubmittedUserData } from "../../types";

const UserPage = () => {
  const [submittedData, setSubmittedData] = useState<SubmittedUserData | null>(
    null
  );

  const handleFormSubmit = (data: SubmittedUserData) => {
    setSubmittedData(data);
  };

  const handleClearData = () => {
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            User Registration
          </h1>
          <p className="mt-2 text-gray-600">
            {submittedData
              ? "Form submitted successfully! ✅"
              : "Fill out the form below to register"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <UserForm onFormSubmit={handleFormSubmit} />
          </div>
          <div className="space-y-6">
            <SubmittedDataDisplay
              data={submittedData}
              onClear={handleClearData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
