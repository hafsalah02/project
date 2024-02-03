"use client"
import { useState, useEffect } from "react"
import tw from "tailwind-styled-components"
import Link from "next/link"
import Map from "../componentsNadjib/Map"
import mapboxgl from "mapbox-gl"

const Search = () => {
  
  const [pickup, setPickup] = useState()
  const [dropoff, setDropoff] = useState()
  const [seats, setSeats] = useState()

  const date = new Date()
  const hour = date.getHours()
  const min = date.getMinutes()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [3.182612267970402, 36.731771559548974],
      zoom: 9
    })

    map.addControl(
      new mapboxgl.NavigationControl()
    )

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    map.addControl(geolocate)

    geolocate.on("geolocate", locateUser)

    function locateUser(e) {
      const lng = e.coords.longitude
      const lat = e.coords.latitude
      console.log("Found user at: ", lng, lat)
      fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + lng + ',' + lat +'.json?access_token=pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscnhuMHh1cTFhcjcyaW1yYnJvcXRveHMifQ.iprDwx-orVgs3c1ITocVbw')
      .then(response => response.json())
      .then(data => setPickup(data.features[0].place_name)) 
    }

    const button = document.getElementById('pickup')
    button.addEventListener('click', () => {
      geolocate.trigger()
    })

  }, [])

  return (
    <Wrapper>
      <Map />
      <ButtonContainer>
        <Link href="/">
          <BackButton src="/arrow.png" />
        </Link>
      </ButtonContainer>
      <InputContainer>
        <FromToIcons>
          <Circle src="/circle.png" />
          <Line src="/line.png" />
          <Square src="/square.png" />
        </FromToIcons>
        <InputBoxes>
          <Button id="pickup" type="button" value={pickup}></Button>
          <Input 
            placeholder="Quelle est votre destination?" 
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
          <Input type="date" />
          <Input type="time" value={`${hour}:${min}`} />
          <Input 
            type="number" 
            placeholder="Entrer le nombre de places que vous voudriez réserver" 
            value={seats} 
            onChange={(e) => setSeats(e.target.value)}
          />
        </InputBoxes>
      </InputContainer>
      <Link href={{
        pathname: "/confirm",
        query: {
          pickupParam: pickup,
          dropoffParam: dropoff,
          seatsParam: seats
        }
      }}>
        <ConfirmButton>
          Confirmer
        </ConfirmButton>
      </Link>
    </Wrapper>
  )
}

export default Search

const Wrapper = tw.div`
bg-gray-200
h-screen
flex
flex-col
`
const ButtonContainer = tw.div`
flex
left-0
bg-white
p-2
`
const BackButton = tw.img`
h-10
bg-gray-200
p-2
rounded-full
`
const InputContainer = tw.div`
flex
bg-white
p-2
px-4
`
const FromToIcons = tw.div`
w-10
flex-col
`
const Circle = tw.img`
ml-3
flex-1
h-5
`
const Line = tw.img`
flex-1
h-12
`
const Square = tw.img`
ml-3
flex-1
h-5
`
const InputBoxes = tw.div`
flex
flex-col
flex-1
`
const Input = tw.input`
h-12
text-lg
bg-gray-200
mb-2
p-2
outline-none
border-none
mr-6
`
const ConfirmButton = tw.div`
bg-purple-400
text-white
font-bold
rounded-md
p-4
text-center
m-4
cursor-pointer
`
const Button = tw.button`
h-12
text-lg
bg-gray-200
mb-2
p-2
outline-none
border-none
mr-6
`