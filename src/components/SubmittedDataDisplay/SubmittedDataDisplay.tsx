import type { SubmittedUserData } from "../../types";

interface SubmittedDataDisplayProps {
  data: SubmittedUserData | null;
  onClear: () => void;
}

interface SubmittedDataItemProps {
  label: string;
  value: string;
}

interface SubmittedDataListProps {
  title: string;
  children: React.ReactNode;
}
const SubmittedDataDisplay = ({ data, onClear }: SubmittedDataDisplayProps) => {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Data Submitted Yet
        </h3>
        <p className="text-gray-500">
          Fill out and submit the form to see the data here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Submitted Data</h2>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Clear Data
        </button>
      </div>

      <div className="space-y-6">
        <DataSection title="User Information">
          <DataItem label="Full Name" value={data.name} />
          <DataItem label="Email" value={data.email} />
          <DataItem label="Contact" value={data.contact} />
          <DataItem label="Address" value={data.address} />
        </DataSection>

        <DataSection title="Uploaded Files">
          <DataItem
            label="Photo"
            value={`${data.photo.name} (${(
              data.photo.size /
              1024 /
              1024
            ).toFixed(2)} MB)`}
          />
          <DataItem
            label="CV"
            value={`${data.cv.name} (${(data.cv.size / 1024 / 1024).toFixed(
              2
            )} MB)`}
          />
        </DataSection>

        <DataSection title="Submission Details">
          <DataItem
            label="Submitted At"
            value={new Date(data.submittedAt).toLocaleString()}
          />
        </DataSection>

        {/*submited data in JSON View */}
        <details className="border rounded-lg">
          <summary className="cursor-pointer p-3 font-medium bg-gray-50 rounded-lg">
            View Raw JSON Data
          </summary>
          <pre className="p-3 text-xs bg-gray-100 rounded-b-lg overflow-auto max-h-40">
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

// Helper Components
const DataSection = ({ title, children }: SubmittedDataListProps) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const DataItem = ({ label, value }: SubmittedDataItemProps) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-100">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="text-gray-800 text-right max-w-[60%]">{value}</span>
  </div>
);

export default SubmittedDataDisplay;
