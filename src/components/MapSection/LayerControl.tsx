import { LayerHeader } from "./LayerHeader";
import { LayerList } from "./LayerList";
import { LayerStatus } from "./LayerStatus";
import type { VectorLayerType } from "../../types";

interface LayerControlProps {
  activeLayer: VectorLayerType;
  onLayerChange: (layer: VectorLayerType) => void;
}

export const LayerControl = ({
  activeLayer,
  onLayerChange,
}: LayerControlProps) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <LayerHeader />
      <LayerList activeLayer={activeLayer} onLayerChange={onLayerChange} />
      <LayerStatus activeLayer={activeLayer} />
    </div>
  );
};
