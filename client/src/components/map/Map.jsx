import { useEffect, useRef } from "react";
import "./map.scss";

function Map({ items }) {
  const mapRef = useRef(null); // Reference to the map container

  useEffect(() => {
    // Ensure the HERE Maps API is loaded
    if (!window.H) {
      console.error("HERE Maps API is not loaded");
      return;
    }

    // Initialize the HERE Maps platform
    const platform = new H.service.Platform({
      apikey: "zdn2NkVG69fWiASo3uUnWZS4s41I3wbCWy8uDnMbXjE", // Replace with your HERE Maps API key
    });

    // Get the default map layers
    const defaultLayers = platform.createDefaultLayers();

    // Center coordinates based on items or default
    const center =
      items.length === 1
        ? { lat: items[0].latitude, lng: items[0].longitude }
        : { lat: 28.7041, lng: 77.1025 };

    // Instantiate the map
    const map = new H.Map(
      mapRef.current, // Reference to the container div
      defaultLayers.vector.normal.map,
      {
        zoom: 7,
        center: center,
      }
    );

    // Enable map interaction (e.g., zoom, pan)
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Add default UI
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    // Add markers for each item
    items.forEach((item) => {
      const marker = new H.map.Marker({
        lat: item.latitude,
        lng: item.longitude,
      });
      map.addObject(marker);
    });

    // Cleanup on unmount
    return () => {
      map.dispose();
    };
  }, [items]);

  return (
    <div
      className="map"
      ref={mapRef}
      style={{ height: "500px", width: "100%" }}
    ></div>
  );
}

export default Map;
