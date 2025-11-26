import { LayerItem } from "./LayerItem";
import type { VectorLayerType } from "../../types";

interface LayerListProps {
  activeLayer: VectorLayerType;
  onLayerChange: (layer: VectorLayerType) => void;
}

export const LayerList = ({ activeLayer, onLayerChange }: LayerListProps) => {
  const layers = [
    {
      id: "provinces" as VectorLayerType,
      name: "Provinces",
      description: "7 Provincial Boundaries of Nepal",
      color: "bg-red-500",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "districts" as VectorLayerType,
      name: "Districts",
      description: "77 District Boundaries of Nepal",
      color: "bg-green-500",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
    {
      id: "municipalities" as VectorLayerType,
      name: "Municipalities",
      description: "Municipality Boundaries of Nepal",
      color: "bg-purple-500",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const handleLayerToggle = (layerId: VectorLayerType) => {
    if (activeLayer === layerId) {
      onLayerChange(null);
    } else {
      onLayerChange(layerId);
    }
  };

  return (
    <div className="space-y-2">
      {layers.map((layer) => (
        <LayerItem
          key={layer.id}
          layer={layer}
          isActive={activeLayer === layer.id}
          onClick={handleLayerToggle}
        />
      ))}
    </div>
  );
};
