import type { VectorLayerType } from "../../types";

interface LayerItemProps {
  layer: {
    id: VectorLayerType;
    name: string;
    description: string;
    color: string;
    icon: React.ReactNode;
  };
  isActive: boolean;
  onClick: (layerId: VectorLayerType) => void;
}

export const LayerItem = ({ layer, isActive, onClick }: LayerItemProps) => {
  return (
    <div
      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
        isActive
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
      onClick={() => onClick(layer.id)}
    >
      {/* Layer Icon */}
      <div
        className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center ${
          isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
        }`}
      >
        {layer.icon}
      </div>

      {/* Layer Info */}
      <div className="flex-1">
        <div className="font-medium text-gray-900 flex items-center">
          {layer.name}
          <div className={`w-2 h-2 rounded-full ml-2 ${layer.color}`} />
        </div>
        <div className="text-xs text-gray-500 mt-1">{layer.description}</div>
      </div>

      {/* Toggle Indicator */}
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          isActive ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
        }`}
      >
        {isActive && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
