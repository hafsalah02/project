"use client"
import React from 'react'
import tw from 'tailwind-styled-components'
import { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscWt6OTdkNTJvdnQyb21rcXJqeGs0MG0ifQ.1cc5lSnVo1lcaQdIE6TM1Q'

const Map = (props:any) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [1.6666663, 28.0289837],
      zoom: 3 
    }) 
    if (props.pickup && props.dropoff) {
      addToMap(map, props.pickup)
      addToMap(map, props.dropoff)
      map.fitBounds([props.pickup, props.dropoff], {padding: 100})
    }
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

