import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import MVT from "ol/format/MVT";
import { Style, Fill, Stroke, Text } from "ol/style";
import Zoom from "ol/control/Zoom";
import Rotate from "ol/control/Rotate";
import Attribution from "ol/control/Attribution";
import "ol/ol.css";
import type { VectorLayerType } from "../../types";

const NEPAL_CENTER = fromLonLat([84.124, 28.3949]);

interface NepalMapProps {
  className?: string;
  activeLayer: VectorLayerType;
  onLayerChange: (layer: VectorLayerType) => void;
}

export const NepalMap = ({
  className = "w-full h-full",
  activeLayer,
}: NepalMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  const vectorLayersRef = useRef<{
    provinces: VectorTileLayer;
    districts: VectorTileLayer;
    municipalities: VectorTileLayer;
  } | null>(null);

  const createVectorStyle = (layerType: VectorLayerType) => {
    return function (feature: any, resolution: number) {
      const properties = feature.getProperties();
      const name =
        properties.name || properties.NAME || properties.NAME_EN || "";

      let fillColor = "rgba(59, 130, 246, 0.1)";
      let strokeColor = "rgba(59, 130, 246, 0.8)";
      let strokeWidth = 1;
      let textSize = 12;

      switch (layerType) {
        case "provinces":
          fillColor = "rgba(239, 68, 68, 0.1)";
          strokeColor = "rgba(239, 68, 68, 0.8)";
          strokeWidth = 2;
          textSize = 14;
          break;
        case "districts":
          fillColor = "rgba(34, 197, 94, 0.1)";
          strokeColor = "rgba(34, 197, 94, 0.8)";
          strokeWidth = 1.5;
          textSize = 10;
          break;
        case "municipalities":
          fillColor = "rgba(168, 85, 247, 0.1)";
          strokeColor = "rgba(168, 85, 247, 0.8)";
          strokeWidth = 1;
          textSize = 8;
          break;
        default:
          break;
      }

      return new Style({
        fill: new Fill({
          color: fillColor,
        }),
        stroke: new Stroke({
          color: strokeColor,
          width: strokeWidth,
        }),
        text:
          resolution < 10
            ? new Text({
                text: name,
                font: `bold ${textSize}px sans-serif`,
                fill: new Fill({
                  color: strokeColor,
                }),
                stroke: new Stroke({
                  color: "white",
                  width: 2,
                }),
              })
            : undefined,
      });
    };
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    const provinceLayer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        url: "https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}",
      }),
      visible: false,
      style: createVectorStyle("provinces"),
    });

    const districtLayer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        url: "https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}",
      }),
      visible: false,
      style: createVectorStyle("districts"),
    });

    const municipalityLayer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        url: "https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}",
      }),
      visible: false,
      style: createVectorStyle("municipalities"),
    });

    vectorLayersRef.current = {
      provinces: provinceLayer,
      districts: districtLayer,
      municipalities: municipalityLayer,
    };

    const mapInstance = new Map({
      target: mapRef.current,
      layers: [baseLayer, provinceLayer, districtLayer, municipalityLayer],
      view: new View({
        center: NEPAL_CENTER,
        zoom: 7.2,
        maxZoom: 18,
        minZoom: 6,
      }),
      controls: [new Zoom(), new Rotate(), new Attribution()],
    });

    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (!map || !vectorLayersRef.current) return;

    const vectorLayers = vectorLayersRef.current;

    Object.values(vectorLayers).forEach((layer) => {
      layer.setVisible(false);
    });

    if (activeLayer && vectorLayers[activeLayer]) {
      vectorLayers[activeLayer].setVisible(true);
    }
  }, [activeLayer, map]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg"
        data-testid="nepal-map-container"
      />

      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600 shadow-sm">
        © OpenStreetMap contributors | NAXA Vector Tiles
      </div>
    </div>
  );
};
