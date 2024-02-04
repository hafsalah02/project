"use client"
import React from 'react'
import tw from 'tailwind-styled-components'
import { useEffect } from 'react'
import mapboxgl, { Marker } from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscnhuMHh1cTFhcjcyaW1yYnJvcXRveHMifQ.iprDwx-orVgs3c1ITocVbw'

const Map = (props) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [3.182612267970402, 36.731771559548974],
      zoom: 9
    }) 
    if (!!props.pickup && !!props.dropoff) {
      addToMap(map, props.pickup)
      addToMap(map, props.dropoff)
    }

    map.addControl(
      new mapboxgl.NavigationControl()
    )
    
    /*const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })*/

    //map.addControl(geolocate)
   map.on('load',()=>{
    //geolocate.trigger()
   })
    
  }, [props.pickup, props.dropoff])

  const addToMap = (map, coordinates) => {
    const marker = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map);
  }

  return (
    <Wrapper id='map'></Wrapper>
  )
}

export default Map;

const Wrapper = tw.div`
    flex-1
    m-2
`

