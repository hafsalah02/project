"use client";
import Link from "next/link";
import tw from "tailwind-styled-components";
import Map from "./componentsNadjib/Map";
import { useSession } from "next-auth/react";
export default function Home() {
  const session = useSession();
  return (
    <Wrapper>
      <Map />
      <ActionItems>
        <Header>
          <Profile>
            {session.data && (
              <Name>Bonjour {session!.data!.user!.fullName}</Name>
            )}
          </Profile>
        </Header>
        <Core>
          <Link href="/search">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              rechercher un trajet
            </ActionButton>
          </Link>
          <Link href="/createRide">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              créer un trajet
            </ActionButton>
          </Link>
        </Core>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex
  flex-col
  h-screen
`;

const ActionItems = tw.div`
  flex-1
  p-4
`;
const Header = tw.div`
  flex justify-center items-center

`;
const Profile = tw.div`
  flex
  items-center
`;
const Name = tw.div`
  text-xl
  font-bold
  mr-4
  with-20
  text-ml
  align-center

`;
const ActionButton = tw.div`
  flex
  bg-purple-400
  text-xl
  mt-5
  rounded-full
  items-center
  justify-center
  h-20
  font-bold
  cursor-pointer
  ml-20
  mr-20
  md:text-base
  lg:text-xl
  text-sm
  p-2
  text-center
`;

const ActionButtonImage = tw.img`
  w-20
  h-20
`;
const Core = tw.div`
  mt-4

`;
