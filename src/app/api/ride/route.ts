import { NextResponse } from "next/server";
import { _db } from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    const ride = await request.json();
    console.log(ride);
    const newRide = await _db.trajet.create({
      data: {
        date: ride.Date,
        depart: ride.pickUpPlaceName,
        departLng: ride.pickUp.at(0),
        departLat: ride.pickUp.at(1),
        destinationLng: ride.dropOff.at(0),
        destinationLat: ride.dropOff.at(0),
        destination: ride.dropoff,
        heure: ride.hour,
        nbrePlace: Number(ride.NbSeats),
        nbrePlaceDispo: Number(ride.NbSeats),
        //@ts-ignore
        chauffeurId: session.user!.id,
      },
    });
    return NextResponse.json(
      {
        message: `un nouveau trajet (num ${newRide.id}) a ete ajouté avec success`,
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
