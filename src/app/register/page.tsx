import React from "react";
import Form from "./components/form";
import Link from "next/link";

function page() {
  return (
    <main className=" w-full min-h-screen flex items-center justify-center ">
      <section className=" w-3/4 md:w-2/3  max-w-xl shadow-2xl ">
        <h2 className=" text-2xl sm:text-3xl text-slate-500 font-bold text-center p-3">
          Créer un nouveau compte
        </h2>
        <Form />
        <h3 className=" text-xs font-bold mx-auto text-center pb-5 ">
          Vous avez un compte ?
          <Link href="/login" className=" text-slate-400 ml-1">
            Connectez-vous
          </Link>
        </h3>
      </section>
    </main>
  );
}

export default page;
