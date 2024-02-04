"use client";
import React from "react";
import tw from "tailwind-styled-components";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const page = () => {
  const title = useSearchParams().get("title");
  const price = useSearchParams().get("price");
  const duration = useSearchParams().get("duration");
  const pickupParam = useSearchParams().get("pickupParam");
  const dropoffParam = useSearchParams().get("dropoffParam");

  return (
    <Wrapper>
      <ButtonContainer>
        <Link
          href={{
            pathname: "/confirm",
            query: {
              pickupParam: pickupParam ?? "",
              dropoffParam: dropoffParam ?? "",
            },
          }}
        >
          <BackButton src="/arrow.png" />
        </Link>
      </ButtonContainer>
      <ValidationImage src="ok.jpg" />
      <ValidationText>
        {title} is on the way to {dropoffParam} and will arrive in{" "}
        {Math.ceil(duration)} minutes. The total cost of the ride is {price}{" "}
        DZD.
        <br />
        <By>Have a nice trip!</By>
      </ValidationText>
    </Wrapper>
  );
};

export default page;

const Wrapper = tw.div`
flex
justify-center
items-center
h-screen
border-gray-300
`;
const ValidationImage = tw.img`
h-64
w-64
`;
const ValidationText = tw.div`
text-xl
font-bold
italic
text-purple-500

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
const By = tw.div`
text-green-500
text-xl
`;
