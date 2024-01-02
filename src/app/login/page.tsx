import Link from "next/link";
import Form from "./components/form";

export default async function Login() {
  return (
    <main className=" w-full min-h-screen flex items-center justify-center text-center">
      <div className=" flex flex-row rounded-2xl shadow-lg shadow-slate-500 w-2/3 max-w-4xl bg-white ">
        <section className=" md:w-3/5 w-full p-6 text-center ">
          <h2 className=" text-2xl sm:text-3xl text-slate-400 font-bold">
            Se connecter
          </h2>
          <hr className=" border-b-4  border-b-slate-400 w-9  inline-block  rounded "></hr>
          <Form />
        </section>
        <section className=" w-2/5  text-white bg-slate-400 rounded-r-2xl hidden md:flex md:flex-col md:justify-evenly md:items-center  ">
          <div>
            <h2 className=" text-2xl px-4 font-bold mt-3">
              Bienvenue sur notre platform
            </h2>
            <hr className=" border-b-4 border-b-white w-9  inline-block  rounded "></hr>
          </div>
          <h3 className=" text-xl  mx-5 font-bold ">
            Vous n'avez pas de compte! clickez pour nous rejoindre
          </h3>
          <Link
            href="/register"
            className=" inline-block bg-white border-2 rounded-xl border-slate-400  hover:opacity-90 hover:scale-110 duration-150 text-slate-600 font-bold px-3 mt-4 border-solid"
          >
            s'inscrire
          </Link>
        </section>
      </div>
    </main>
  );
}
