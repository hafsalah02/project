"use client";
import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { useSearchParams } from "next/navigation";
import Map from "../componentsNadjib/Map";
import RideSelector from "../componentsNadjib/RideSelector";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Confirm = () => {
  const router = useRouter();
  console.log(router);
  const pickuplongParam = Number(useSearchParams().get("pickupLongParam"));
  const pickuplatParam = Number(useSearchParams().get("pickupLatParam"));
  const dropoffParam = useSearchParams().get("dropoffParam");
  const seatsParam = useSearchParams().get("seatsParam");
  const [pickup, setPickup] = useState([pickuplongParam, pickuplatParam]);
  const [dropoff, setDropoff] = useState([0, 0]);

  /*const getPickupCoordinates = (pickupParam) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickupParam}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscnhuMHh1cTFhcjcyaW1yYnJvcXRveHMifQ.iprDwx-orVgs3c1ITocVbw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => setPickup(data.features[0].center));
  };*/

  const getDropoffCoordinates = (dropoffParam) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoffParam}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscnhuMHh1cTFhcjcyaW1yYnJvcXRveHMifQ.iprDwx-orVgs3c1ITocVbw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => setDropoff(data.features[0].center));
  };

  useEffect(() => {
    // getPickupCoordinates(pickupParam);
    getDropoffCoordinates(dropoffParam);
  }, [pickuplongParam, pickuplatParam, dropoffParam]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search">
          <BackButton src="/arrow.png" />
        </Link>
      </ButtonContainer>
      <Map pickup={pickup} dropoff={dropoff} />
      <RideContainer>
        <RideSelector
          pickup={pickup}
          dropoff={dropoff}
          pickupParam={[Number(pickuplongParam), Number(pickuplatParam)]}
          dropoffParam={dropoffParam}
          seatsParam={seatsParam}
        />
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
bg-gray-200
h-screen
flex
flex-col
`;

const RideContainer = tw.div`
flex-1 flex flex-col
`;

const ButtonContainer = tw.div`
rounded-full
absolute
top-4
left-4
z-10
`;
const BackButton = tw.img`
h-10
bg-gray-200
p-2
rounded-full
`;
