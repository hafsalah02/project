"use client";
import { FormInputText } from "@/app/components/controlledTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CgSpinner } from "react-icons/cg";
import { userSchema } from "../schema/user";
import axios from "@/app/axios";
import { useState } from "react";
function Form() {
  const { control, handleSubmit, reset, setError } = useForm<
    z.infer<typeof userSchema>
  >({
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      matricule: "",
      numero: "",
      password: "",
      passwordVerfication: "",
    },
    resolver: zodResolver(userSchema),
  });
  const [success, setSeccess] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const onsubmit = async (data: z.infer<typeof userSchema>) => {
    delete data.passwordVerfication;
    setSeccess(undefined);
    setLoading(true);
    axios
      .post("/api/register", data)
      .then((response) => {
        reset();
        setSeccess(response.data.message);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const errors: {
            source: "email" | "matricule" | "numero";
            message: string;
          }[] = error.response.data.Errors;

          errors.map((error) => {
            setError(
              error.source,
              { message: error.message },
              { shouldFocus: true }
            );
          });
        }
      });
    setLoading(false);
  };
  return (
    <>
      {success && (
        <h3 className="text-sm text-center mx-5 mt-1 bg-green-400 text-white py-1 rounded-lg">
          {success}
        </h3>
      )}
      <form
        onSubmit={handleSubmit(onsubmit)}
        className=" flex  flex-col p-4  items-center justify-center gap-3"
      >
        <FormInputText
          control={control}
          label="nom"
          name="nom"
          type="text"
          className="w-full"
        />
        <FormInputText
          control={control}
          label="prenom"
          name="prenom"
          type="text"
          className="w-full"
        />
        <FormInputText
          control={control}
          label="email"
          name="email"
          type="text"
          className="w-full"
        />
        <FormInputText
          control={control}
          label="matricule"
          name="matricule"
          type="text"
          className="w-full"
        />
        <FormInputText
          control={control}
          label="numero du telephone"
          name="numero"
          type="text"
          className="w-full"
        />
        <FormInputText
          control={control}
          label="mot de passe"
          name="password"
          type="password"
          className="w-full"
        />
        <FormInputText
          control={control}
          label="valider le mot de passe"
          name="passwordVerfication"
          type="password"
          className="w-full"
        />
        <button
          type="submit"
          className="self-end m-1 text-sm font-bold text-white bg-slate-500 p-1 rounded-lg hover:bg-slate-600 hover:scale-110 duration-150"
        >
          {loading ? (
            <span className=" animate-spin">
              <CgSpinner />
            </span>
          ) : (
            "S'inscrire"
          )}
        </button>
      </form>
    </>
  );
}

export default Form;
