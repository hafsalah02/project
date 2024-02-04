"use client";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import Map from "../componentsNadjib/Map";
import mapboxgl from "mapbox-gl";
import axios from "../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgSpinner } from "react-icons/cg";
const Search = () => {
  const [Error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${ride.dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscnhuMHh1cTFhcjcyaW1yYnJvcXRveHMifQ.iprDwx-orVgs3c1ITocVbw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.features[0]) {
          return setError("lieu de destination invalide!");
        }
        const [destLng, destLat] = data.features.at(0).center;

        setRide((prevs) => ({
          ...prevs,
          dropOff: [Number(destLng), Number(destLat)],
          dropoff: data.features.at(0).place_name,
        }));
        setLoading(false);
        const toDayDate: Date | string = new Date();
        const minutes =
          toDayDate.getMinutes() < 10
            ? "0".concat(toDayDate.getMinutes().toString())
            : toDayDate.getMinutes();
        const hours =
          toDayDate.getHours() < 10
            ? "0".concat(toDayDate.getHours().toString())
            : toDayDate.getHours();
        const toDayHour = `${hours}:${minutes}`;

        const toDayDateString = toDayDate
          .toISOString()
          .split("T")
          .at(0) as string;
        if (toDayDateString > ride.Date) {
          return setError("Date du trajet Invalide!");
        } //you should check hour also
        if (toDayDateString === ride.Date && ride.hour <= toDayHour) {
          return setError("heure de trajet invalide!");
        }
        if (ride.NbSeats <= 0 || ride.NbSeats > 4) {
          return setError(
            "nombre de places doit etre superieure a 0 et inferieure a 4"
          );
        }
        if (!ride.dropOff) {
          return;
        }
        axios
          .post("/api/ride", ride)
          .then((response) => {
            setRide((prevs) => ({
              ...prevs,
              dropOff: undefined,
              dropoff: "",
              NbSeats: 0,
            }));
            toast(response.data.message, { type: "success" });
          })
          .catch((error) => {
            toast(error.response.data.message, { type: "error" });
          });
      });
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setRide((prevs) => ({
      ...prevs,
      [name]: value,
    }));
  };

  const [ride, setRide] = useState<{
    pickUpPlaceName: string;
    pickUp: number[] | undefined;
    dropOff: number[] | undefined;
    dropoff: string;
    hour: string;
    Date: string;
    NbSeats: number;
  }>({
    pickUpPlaceName: "",
    pickUp: undefined,
    dropOff: undefined,
    dropoff: "",
    hour: "",
    Date: "",
    NbSeats: 0,
  });
  const [geolocate, setGeolocate] = useState<mapboxgl.GeolocateControl>();
  useEffect(() => {
    const date = new Date();
    const minutes =
      date.getMinutes() < 10
        ? "0".concat(date.getMinutes().toString())
        : date.getMinutes();
    const hours =
      date.getHours() < 10
        ? "0".concat(date.getHours().toString())
        : date.getHours();
    setRide((prevs) => ({
      ...prevs,
      hour: `${hours}:${minutes}`,
      Date: date.toISOString().split("T").at(0) as string,
    }));
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.182612267970402, 36.731771559548974],
      zoom: 20,
    });
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(geolocate);

    geolocate.on("geolocate", locateUser);
    function locateUser(e) {
      const lng = e.coords.longitude;
      const lat = e.coords.latitude;
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?` +
          new URLSearchParams({
            access_token:
              "pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscnhuMHh1cTFhcjcyaW1yYnJvcXRveHMifQ.iprDwx-orVgs3c1ITocVbw",
            limit: 1,
          })
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.features[0]) {
            return setError(
              "lieu de depart invalide!verifiez votre connection internet"
            );
          }
          setRide((prevs) => ({
            ...prevs,
            pickUpPlaceName: data.features[0].place_name,
            pickUp: [Number(lng), Number(lat)],
          }));
        });
    }
    setGeolocate(geolocate);
  }, []);
  useEffect(() => {
    if (geolocate) {
      geolocate.trigger();
    }
  }, [geolocate]);
  const getCurrentLocation = (e) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.currentTarget.value}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibmFkamlibmVzc2FoIiwiYSI6ImNscnhuMHh1cTFhcjcyaW1yYnJvcXRveHMifQ.iprDwx-orVgs3c1ITocVbw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.features[0]) {
          return setError("lieu de depart invalide!");
        }
        console.log(data.features[0]);
        setRide((prevs) => ({
          ...prevs,
          pickUpPlaceName: data.features[0].place_name,
          pickUp: data.features.at(0).center,
        }));
      });
  };
  return (
    <Wrapper>
      {ride.pickUp && ride.dropOff ? (
        <Map pickup={ride.pickUp} dropoff={ride.dropOff} />
      ) : (
        <Map />
      )}
      <ButtonContainer>
        <Link href="/">
          <BackButton src="/arrow.png" />
        </Link>
      </ButtonContainer>
      <InputContainer>
        {!ride.pickUp ? (
          <span className="text-xl px-6 text-center w-full">
            recuperation de votre position actuelle..
          </span>
        ) : (
          <form
            className="flex
flex-col
flex-1
"
          >
            {Error && (
              <span className="bg-red-500 text-white font-semibold text-center max-w-fit mx-auto p-3 m-2 rounded-lg shadow-black shadow-sm">
                {Error}
              </span>
            )}
            <Input
              placeholder="lieu de depart"
              value={ride.pickUpPlaceName}
              required
              name="pickUpPlaceName"
              onChange={onChange}
              onBlur={getCurrentLocation}
            />
            <Input
              placeholder="Quelle est votre destination?"
              value={ride.dropoff}
              required
              name="dropoff"
              onChange={onChange}
            />
            <Input
              type="date"
              required
              value={ride.Date}
              onChange={onChange}
              name="Date"
            />
            <Input
              type="time"
              required
              value={ride.hour}
              onChange={onChange}
              name="hour"
            />
            <Input
              type="number"
              required
              placeholder="Entrer le nombre de places que vous voudriez réserver"
              value={ride.NbSeats}
              name="NbSeats"
              onChange={onChange}
            />
            <button
              onClick={handleSubmit}
              className="  bg-purple-500 text-lg p-2 font-bold
            rounded-lg h-10 text-white shadow-sm shadow-black"
            >
              <>Confirmer le trajet</>
            </button>
          </form>
        )}
      </InputContainer>
      <ToastContainer />
    </Wrapper>
  );
};

export default Search;

const Wrapper = tw.div`
bg-gray-200
h-screen
flex
flex-col
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
const InputContainer = tw.div`
flex
bg-white
p-2
px-4
`;
const FromToIcons = tw.div`
w-10
flex-col
`;
const Circle = tw.img`
ml-3
flex-1
h-5
`;
const Line = tw.img`
flex-1
h-12
`;
const Square = tw.img`
ml-3
flex-1
h-5
`;
const InputBoxes = tw.div`
flex
flex-col
flex-1
`;
const Input = tw.input`
h-12
text-lg
bg-gray-200
mb-2
p-2
outline-none
border-none
mr-6
w-full
`;
const ConfirmButton = tw.div`
bg-purple-400
text-white
font-bold
rounded-md
p-4
text-center
m-4
cursor-pointer
`;
const Button = tw.button`
h-12
text-lg
bg-gray-200
mb-2
p-2
outline-none
border-none
mr-6
`;
