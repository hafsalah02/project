import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import tw from "tailwind-styled-components";

type Props = {
  roads: {
    distance: number;
    id: number;
    depart: string;
    departLng: number;
    departLat: number;
    destination: string;
    destinationLng: number;
    destinationLat: number;
    date: string;
    heure: string;
    nbrePlace: number;
    nbrePlaceDispo: number;
    chauffeurId: number;
    chauffeur: { nom: string; prenom: string };
  }[];
  ride: {
    pickUpPlaceName: string;
    pickUp: number[] | undefined;
    dropOff: number[] | undefined;
    dropoff: string;
    hour: string;
    Date: string;
    NbSeats: number;
  };
};

function ShowRides({ roads, ride }: Props) {
  const router = useRouter();
  const reserver = (roadId: number) => {
    const reservation = { roadId: roadId, nbSeats: ride.NbSeats };
    axios
      .post("/api/reservation", reservation)
      .then((response) => {
        toast(response.data.message, { type: "success" });
        router.push("/");
      })
      .catch((error) => {
        toast(error.response.data.message, { type: "error" });
      });
  };
  return (
    <Wrapper>
      <Title>choose your ride</Title>
      <CarList>
        {roads.map((road) => (
          <Car key={road.id}>
            <CarImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
            <CarDetails>
              <Service>{road.destination}</Service>
              <Service>
                chaufeur : {road.chauffeur.nom + " " + road.chauffeur.prenom}
              </Service>

              <CarSeats>
                {road.nbrePlace - road.nbrePlaceDispo} places réservées
              </CarSeats>
              <CarSeats>{road.nbrePlaceDispo} places disponibles</CarSeats>
              <CarSeats>distance : {road.distance}Km</CarSeats>
              <button
                className=" bg-red-400 rounded-md text-white font-semibold p-2  hover:bg-red-500"
                onClick={() => {
                  reserver(road.id);
                }}
              >
                Reserver {}
              </button>
            </CarDetails>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
}

export default ShowRides;

const Wrapper = tw.div`
flex-1
border-b-2
border-gray-300
`;
const Title = tw.div`
mt-4
text-xl
text-center
text-gray-700
font-bold
`;
const CarList = tw.div`
flex
justify-center
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
`;
const CarSeats = tw.div`
text-xs
text-red-500
`;
const TimeLeft = tw.div`
text-xs
text-purple-500
`;
const Price = tw.div`
text-xl
font-bold
text-purple-500
`;
