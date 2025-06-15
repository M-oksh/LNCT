import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%", // Must be 100%
};

const locations = [
  { lat: 23.251368, lng: 77.524785, label: "LNCT Main Campus" },
  { lat: 23.250108, lng:  77.522234, label: "LNCT Excellence" },
  { lat: 23.318769, lng: 77.415182, label: "LNCT World School" },
  { lat: 23.177481, lng: 77.427691, label: "LNCT University" },
  { lat: 22.738801, lng: 75.973796, label: "LNCT VU" },
  { lat: 22.738962, lng: 75.973712, label: "Indore LNMC" },
];

type Props = {
  onClose: () => void;
};

const LnctMapModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      {/* Modal container with full height */}
      <div className="w-[90%] h-[80%] bg-white rounded-xl overflow-hidden relative flex flex-col">
        
        {/* Close button floating on top */}
        <button
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded z-10"
          onClick={onClose}
        >
          Close
        </button>

        {/* Map container must take full remaining height */}
        <div className="flex-1">
            {/* {console.log("Google Maps API Key: ", import.meta.env.VITE_GOOGLE_MAPS_API_KEY)} */}
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
            //   key={Date.now()}
              mapContainerStyle={containerStyle}
              center={{ lat: 23.251368,  lng: 77.524785 }}
              zoom={12}
            >
              {locations.map((loc, idx) => (
                <Marker key={idx} position={{ lat: loc.lat, lng: loc.lng }} label={loc.label} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default LnctMapModal;
