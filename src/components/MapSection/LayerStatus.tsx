import type { VectorLayerType } from "../../types";

interface LayerStatusProps {
  activeLayer: VectorLayerType;
}

export const LayerStatus = ({ activeLayer }: LayerStatusProps) => {
  const getActiveLayerName = () => {
    switch (activeLayer) {
      case "provinces":
        return "Provinces";
      case "districts":
        return "Districts";
      case "municipalities":
        return "Municipalities";
      default:
        return "Base Map";
    }
  };

  return (
    <div className="mt-4 pt-3 border-t border-gray-200">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-gray-600">Active Layer:</span>
        <span className="font-medium text-blue-600">
          {getActiveLayerName()}
        </span>
      </div>
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
        <span className="font-medium">Tip:</span> Click on layers to toggle
        visibility
      </div>
    </div>
  );
};
