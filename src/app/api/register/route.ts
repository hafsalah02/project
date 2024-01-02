import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { _db } from "../db";
export async function POST(request: Request) {
  try {
    const { email, password, nom, prenom, numero, matricule } =
      await request.json();
    if (!email || !password || !nom || !prenom || !numero || !matricule) {
      return NextResponse.json(
        { message: "tous les champs sont obligatoires." },
        { status: 400 }
      );
    }
    const Errors: { message: string; source: string }[] = [];
    let userExisted = await _db.utilisateur.findFirst({
      where: { OR: [{ email: email }, {}] },
    });
    if (userExisted) {
      Errors.push({ message: "email déja existé", source: "email" });
    }
    userExisted = await _db.utilisateur.findUnique({
      where: { matricule: matricule },
    });
    if (userExisted) {
      Errors.push({ message: "matricule déja existé", source: "matricule" });
    }
    userExisted = await _db.utilisateur.findUnique({
      where: { numero: numero },
    });
    if (userExisted) {
      Errors.push({ message: "numero déja existé", source: "numero" });
    }
    if (!!Errors.length) {
      return NextResponse.json({ Errors: Errors }, { status: 400 });
    }
    const hashedPassword = await hash(password, 8);
    await _db.utilisateur.create({
      data: {
        email: email,
        password: hashedPassword,
        matricule: matricule,
        nom: nom,
        numero: numero,
        prenom: prenom,
      },
    });
    return NextResponse.json(
      {
        message:
          "votre compte a été creé avec succes vous pouvez authentifier maintenant.",
      },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "une erreur est survenue." },
      { status: 500 }
    );
  }
}
