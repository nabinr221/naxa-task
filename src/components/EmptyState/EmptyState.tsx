import React, { type ReactNode } from "react";

/**
 * Props for the EmptyState component
 */
interface EmptyStateProps {
  /** Title displayed in the empty state */
  title: string;
  /** Description text displayed below the title */
  description: string;
  /** Optional action element (usually a button) */
  action?: ReactNode;
  /** Optional icon name (for future icon system integration) */
  icon?: string;
  /** Optional custom styles */
  className?: string;
  /** Optional icon component to override default */
  iconComponent?: ReactNode;
}

/**
 * EmptyState Component
 *
 * A reusable empty state component for displaying when no data is available.
 * Uses Tailwind CSS for consistent styling and theming.
 *
 * @component
 * @param {EmptyStateProps} props - Component props
 * @param {string} props.title - Title displayed in the empty state
 * @param {string} props.description - Description text
 * @param {ReactNode} [props.action] - Optional action element
 * @param {string} [props.icon] - Optional icon name
 * @param {string} [props.className] - Optional custom styles
 * @param {ReactNode} [props.iconComponent] - Optional custom icon component
 *
 * @example
 * // Basic usage
 * <EmptyState
 *   title="No projects found"
 *   description="Get started by creating your first project"
 * />
 *
 * @example
 * // With action button
 * <EmptyState
 *   title="No technicians"
 *   description="Add your first technician to get started"
 *   action={<Button variant="contained">Add Technician</Button>}
 * />
 *
 * @example
 * // With custom icon
 * <EmptyState
 *   title="No data"
 *   description="There is no data to display"
 *   iconComponent={<InboxIcon fontSize="large" />}
 * />
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center w-full ${className}`}
    >
      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>

      {/* Action */}
      {action && (
        <div className="flex items-center justify-center gap-2 w-full">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
