import { NextRequest, NextResponse } from "next/server";
import { _db } from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
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
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    const long = req.nextUrl.searchParams.get("long");
    const lat = req.nextUrl.searchParams.get("lat");

    const toDayDate = new Date();
    //here you should schedule a job or something similar to delete all old roads evry 10mins or less
    const AllRds = await _db.trajet.findMany({
      where: {
        nbrePlaceDispo: { gte: 1 },
      },
      select: {
        chauffeur: { select: { nom: true, prenom: true } },
        date: true,
        depart: true,
        destination: true,
        heure: true,
        departLat: true,
        departLng: true,
        nbrePlaceDispo: true,
        id: true,
        //@ts-ignore
      },
    });
    if (!lat || !long) {
      return NextResponse.json(AllRds, { status: 200 });
    }
    const roads = AllRds.map((element) => ({
      ...element,
      distance: calculateDistance(
        Number(lat),
        Number(long),
        element.departLat,
        element.departLng
      ),
    }));
    roads.sort((a, b) => a.distance - b.distance);

    return NextResponse.json(
      roads.filter((Element) => Element.distance <= 2),
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
