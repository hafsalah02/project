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
    const reservation = await request.json();
    console.log(reservation);
    await _db.$transaction(async (prisma) => {
      await prisma.reservation.create({
        data: {
          date: new Date(),
          nbrePlaceReserve: Number(reservation.nbSeats),
          trajetId: reservation.roadId,
          //@ts-ignore
          clientId: Number(session!.user.id),
        },
      });
      const trajet = await prisma.trajet.findUnique({
        where: {
          id: reservation.roadId,
        },
        select: { nbrePlaceDispo: true },
      });
      if (!trajet || trajet.nbrePlaceDispo < reservation.nbSeats) {
        throw new Error(
          "here the transaction will be aborted and the created reservation will be deleted "
        );
      }
      await prisma.trajet.update({
        where: { id: reservation.roadId },
        data: { nbrePlaceDispo: trajet.nbrePlaceDispo - reservation.nbSeats },
      });
    });
    return NextResponse.json(
      {
        message: `nouvelle reservation a ete ajouté avec success`,
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
