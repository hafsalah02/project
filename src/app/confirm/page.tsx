"use client";
import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Map from "../componentsNadjib/Map";
import { useSearchParams } from "next/navigation";
import RideSelector from "../componentsNadjib/RideSelector";
import Link from "next/link";

const Confirm = () => {
  const pickupParam = useSearchParams().get("pickupParam");
  const dropoffParam = useSearchParams().get("dropoffParam");
  const [pickup, setPickup] = useState([0, 0]);
  const [dropoff, setDropoff] = useState([0, 0]);

  const getPickupCoordinates = (pickupParam) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickupParam}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscWt6OTdkNTJvdnQyb21rcXJqeGs0MG0ifQ.1cc5lSnVo1lcaQdIE6TM1Q",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => setPickup(data.features[0].center));
  };

  const getDropoffCoordinates = (dropoffParam) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoffParam}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscWt6OTdkNTJvdnQyb21rcXJqeGs0MG0ifQ.1cc5lSnVo1lcaQdIE6TM1Q",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => setDropoff(data.features[0].center));
  };

  useEffect(() => {
    getPickupCoordinates(pickupParam);
    getDropoffCoordinates(dropoffParam);
  }, [pickupParam, dropoffParam]);

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
          pickupParam={pickupParam}
          dropoffParam={dropoffParam}
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
