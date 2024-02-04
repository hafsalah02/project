"use client";
import React from "react";
import tw from "tailwind-styled-components";
import { useEffect } from "react";
import mapboxgl, { Marker } from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscnhuMHh1cTFhcjcyaW1yYnJvcXRveHMifQ.iprDwx-orVgs3c1ITocVbw";

const Map0 = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.182612267970402, 36.731771559548974],
      zoom: 9,
    });
    map.addControl(new mapboxgl.NavigationControl());

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    map.addControl(geolocate);
    map.on("load", () => {
      geolocate.trigger();
    });
  }, []);

  return <Wrapper id="map"></Wrapper>;
};

export default Map0;

const Wrapper = tw.div`
    flex-1
    m-2
`;
