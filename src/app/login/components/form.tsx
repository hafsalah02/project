"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
function Form() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [see_password, setSee_password] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((prevs) => ({ ...prevs, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const response = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });
    setLoading(false);
    if (response?.error) {
      return setError("email ou mot de passe invalide");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className=" flex  flex-col p-4 ">
        {!!error && (
          <span className=" rounded-lg bg-red-500 text-white text-center p-2 mx-auto max-w-fit  mb-5 text-sm">
            {error}
          </span>
        )}

        <TextField
          required
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          variant="standard"
          label="email"
          autoComplete="off"
        />
        <TextField
          required
          id="mot de passe"
          name="password"
          value={user.password}
          onChange={handleChange}
          variant="standard"
          label="mot de passe"
          type={see_password ? "text" : "password"}
          className="mt-2"
        />

        <div className=" self-start pb-4 flex justify-center items-center mt-2">
          <input
            type="checkbox"
            checked={see_password}
            onChange={() => {
              setSee_password(!see_password);
            }}
            id="voir_mdp"
            className=" m-1"
          ></input>
          <label htmlFor="voir_mdp" className="text-xs font-semibold">
            voir mot de passe
          </label>
        </div>
        <button
          type="submit"
          className=" w-2/3 bg-slate-400 self-center text-white flex items-start justify-center rounded-xl  text-3xl text-center py-2"
          disabled={loading}
        >
          {loading ? (
            <span className=" animate-spin">
              <CgSpinner />
            </span>
          ) : (
            <BiLogIn />
          )}
        </button>
      </form>
      <h3 className=" text-xs font-bold mx-auto text-center block md:hidden">
        Vous n'avez pas de compte ?
        <Link href="/register" className=" text-slate-400 ml-1">
          Inscrivez-vous
        </Link>
      </h3>
    </>
  );
}

export default Form;
