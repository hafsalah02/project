import { z } from "zod";
import validator from "validator";
export const userSchema = z
  .object({
    nom: z.string().trim().min(1, { message: "ce champs est obligatoire" }),
    prenom: z.string().trim().min(1, { message: "ce champs est obligatoire" }),
    email: z
      .string()
      .email({ message: "boite email invalide" })
      .trim()
      .min(1, { message: "ce champs est obligatoire" }),
    numero: z
      .string({ required_error: "obligatoire" })
      .refine((value) => /^(\+213|0)[567]\d{8}$/.test(value), {
        message: "numero de telephone invalide",
      }),
    matricule: z.string().refine((value) => /^\d{12}$/.test(value), {
      message: "matricule invalide",
    }),
    password: z.string().min(8, {
      message: "la taille de mot de passe doit deppasser 8 caracteres",
    }),
    passwordVerfication: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordVerfication, {
    message: "mot de passe invalide",
    path: ["passwordVerfication"],
  });
