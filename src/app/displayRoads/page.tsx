"use client";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import axios from "../axios";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

function page() {
  const [allRds, setAllRds] = useState<
    | {
        id: number;
        depart: string;
        destination: string;
        chauffeur: {
          nom: string;
          prenom: string;
        };
        nbrePlaceDispo: number;
        date: string;
        heure: string;
      }[]
    | undefined
  >(undefined);
  console.log(allRds);

  const fetchRoads = async (
    coor:
      | {
          lat: string;
          long: string;
        }
      | undefined
  ) => {
    try {
      const response = await axios.get("/api/roads", {
        params: { long: coor?.long, lat: coor?.lat },
      });
      setAllRds(response.data);
    } catch (error) {
      //you sould handle server error here
    }
  };
  useEffect(() => {
    fetchRoads(undefined);
  }, []);

  const handleActivatePosition = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigator.geolocation.getCurrentPosition(successCallback);
    function successCallback(position: any) {
      // Handle the successful retrieval of the user's location
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      fetchRoads({ long: longitude, lat: latitude });
    }
  };
  if (!allRds) {
    return <span>...loading</span>;
  }
  return (
    <main className="min-h-screen w-full relative">
      <ButtonContainer>
        <Link href="/">
          <BackButton src="/arrow.png" />
        </Link>
      </ButtonContainer>
      <button
        className="text-2xl mx-auto absolute top-7 left-1/2 hover:scale-125"
        onClick={handleActivatePosition}
      >
        <FaLocationDot />
      </button>
      <CarList>
        {allRds.map((road) => (
          <Car key={road.id}>
            <CarImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
            <CarDetails>
              <Service>de :{road.depart}</Service>
              <Service>vers :{road.destination}</Service>
              <Service>{road.date}</Service>
              <Service>{road.heure}</Service>

              <Service>
                chaufeur : {road.chauffeur.nom + " " + road.chauffeur.prenom}
              </Service>
              <CarSeats>{road.nbrePlaceDispo} places disponibles</CarSeats>
              <CarSeats>distance : {}Km</CarSeats>
            </CarDetails>
          </Car>
        ))}
      </CarList>
    </main>
  );
}
const CarList = tw.div`
flex
justify-center
flex-wrap
`;
const Car = tw.div`
flex
p-4
items-center
border-2
border-gray-300
rounded-md
m-2
bg-purple-200
transform
hover:scale-105
transition
`;
const ButtonContainer = tw.div`
flex
left-0
bg-white
p-2
`;
const BackButton = tw.img`
h-10
bg-gray-200
p-2
rounded-full
`;
const CarImage = tw.img`
w-16
h-16
mr-4
`;
const CarDetails = tw.div`
mr-3.5
`;
const Service = tw.div`
font-bold
max-w-30
text-center
`;
const CarSeats = tw.div`
text-xs
text-red-500
text-center

`;

export default page;
