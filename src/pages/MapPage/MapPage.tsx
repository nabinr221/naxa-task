import { useState } from "react";
import { NepalMap } from "../../components/MapSection/NepalMap";
import { LayerControl } from "../../components/MapSection/LayerControl";
import type { VectorLayerType } from "../../types";

const MapPage = () => {
  const [activeLayer, setActiveLayer] = useState<VectorLayerType>(null);

  const handleLayerChange = (layer: VectorLayerType) => {
    setActiveLayer(layer);
  };

  return (
    <div className="min-h-screen  from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with Layer Control */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Map Layers
              </h2>
              <p className="text-gray-600 mb-6">
                Select administrative boundaries to display on the map
              </p>

              <LayerControl
                activeLayer={activeLayer}
                onLayerChange={handleLayerChange}
              />
            </div>
          </div>

          {/* Main Map Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <NepalMap
                className="h-[600px]"
                activeLayer={activeLayer}
                onLayerChange={handleLayerChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
