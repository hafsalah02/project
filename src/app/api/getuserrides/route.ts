import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { _db } from "../db";
function calculateDistance(
  userLat: number,
  userLon: number,
  roadLat: number,
  roadLon: number
) {
  // Haversine formula
  const R = 6371; // Earth radius in kilometers
  const dLat = (roadLat - userLat) * (Math.PI / 180);
  const dLon = (roadLon - userLon) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLat * (Math.PI / 180)) *
      Math.cos(roadLat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    const ride = await request.json();
    console.log(ride);
    const Rides = await _db.trajet.findMany({
      where: {
        destination: ride.dropoff,
        date: ride.Date,
        heure: ride.hour,
        nbrePlaceDispo: { gte: Number(ride.NbSeats) },
      },
      select: {
        chauffeur: { select: { nom: true, prenom: true } },
        date: true,
        depart: true,
        departLng: true,
        departLat: true,
        destinationLng: true,
        destinationLat: true,
        destination: true,
        heure: true,
        nbrePlace: true,
        nbrePlaceDispo: true,
        id: true,
        //@ts-ignore
      },
    });
    console.log(Rides);

    if (Rides.length === 0) {
      return NextResponse.json(
        {
          message: `aucun trajet trouvé pour votre recherche`,
          empty: true,
        },
        { status: 200 }
      );
    }
    const roads = Rides.map((element) => ({
      ...element,
      distance: calculateDistance(
        ride.pickUp.at(1),
        ride.pickUp.at(0),
        element.departLat,
        element.departLng
      ),
    }));
    roads.sort((a, b) => a.distance - b.distance);
    console.log(roads);
    return NextResponse.json(
      {
        roads: roads,
        empty: false,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "une erreur est survenue." },
      { status: 500 }
    );
  }
}
