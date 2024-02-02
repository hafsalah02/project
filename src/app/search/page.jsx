"use client"
import { useState } from "react"
import tw from "tailwind-styled-components"
import Link from "next/link"

const Search = () => {

  const [pickup, setPickup] = useState()
  const [dropoff, setDropoff] = useState()
  
  return (
    <Wrapper>
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
          <Input
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
          <Input 
            placeholder="Where to?" 
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
        </InputBoxes>
      </InputContainer>
      <Link href={{
        pathname: "/confirm",
        query: {
          pickupParam: pickup,
          dropoffParam: dropoff
        }
      }}>
        <ConfirmButton>
          Confirm
        </ConfirmButton>
      </Link>
    </Wrapper>
  )
}

export default Search

const Wrapper = tw.div`
bg-gray-200
h-screen
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
items-center
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
