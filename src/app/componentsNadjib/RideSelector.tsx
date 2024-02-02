"use client"
import React, { useState, useEffect } from 'react'
import tw from 'tailwind-styled-components'
import { types } from '../data/data'
import Link from 'next/link'

const RideSelector = (props:any) => {
console.log(props)
  const [duration, setDuration] = useState()
  useEffect(() => {
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickup[0]},${props.pickup[1]};${props.dropoff[0]},${props.dropoff[1]}?access_token=pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscWt6OTdkNTJvdnQyb21rcXJqeGs0MG0ifQ.1cc5lSnVo1lcaQdIE6TM1Q`)
    .then(response => response.json())
    .then(data => setDuration(data.routes[0].duration / 60))
  }, [props.pickup, props.dropoff])

  return (
    <Wrapper>
        <Title>
          choose your ride
        </Title>
        <CarList>
          {types.map((type) => (
            <Link href={{
              pathname: '/confirmRide',
              query: {
                pickupParam: props.pickupParam,
                dropoffParam: props.dropoffParam,
                title: type.title,
                duration: duration,
                price: (duration * type.multiplier).toFixed(2)
              }
            }}
            >
             <Car key={type.id}>
                <CarImage src={type.image}/>
                <CarDetails>
                  <Service>{type.title}</Service>
                  <CarSeats>{type.seats} seats</CarSeats>
                  <TimeLeft>{Math.ceil(duration)} minutes away</TimeLeft>
                </CarDetails>
                <Price>
                  {(duration * type.multiplier).toFixed(2)} DZD
                </Price>
              </Car>
            </Link>
          ))
          }
        </CarList>
    </Wrapper>
  )
}

export default RideSelector

const Wrapper = tw.div`
flex-1
border-b-2
border-gray-300
`
const Title = tw.div`
mt-4
text-xl
text-center
text-gray-700
font-bold
`
const CarList = tw.div`
flex
justify-center
`
const Car = tw.div`
flex
p-4
items-center
border-2
border-gray-300
rounded-md
m-2
bg-pink-200
transform
hover:scale-105
transition
`
const CarImage = tw.img`
w-16
h-16
mr-4
`
const CarDetails = tw.div`
mr-3.5
`
const Service = tw.div`
font-bold
`
const CarSeats = tw.div`
text-xs
text-red-500
`
const TimeLeft = tw.div`
text-xs
text-purple-500
`
const Price = tw.div`

`
