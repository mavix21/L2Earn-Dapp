"use client";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from "next/navigation";

import loginImg from "../../public/assets/search_login.png";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
//import loginImg from "../../public/assets/search_login.svg";
import Spline from "@splinetool/react-spline/next";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    router.push('/student');
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center space-x-8 bg-teal-50">
      {/*fondo*/}
      <div className="flex flex-col items-center justify-center space-y-4 border-b ml-8 rounded-3xl border-gray-200 bg-white shadow-sm shadow-slate-400 px-4 py-9 pt-8 text-center sm:px-16">
        {/*primer card*/}
        <h1 className="text-3xl font-semibold leading-snug tracking-tight text-gray-800 lg:text-3xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
          Un gusto tenerte por aquí,
        </h1>
        <p className="py-5 text-base leading-normal text-gray-500 lg:text-base xl:text-lg dark:text-gray-300">
          Serás capaz de transformar tu curiosidad en conocimiento y tu
          conocimiento en éxito
        </p>
        <div className="flex flex-col space-y-4">
          {/* <Button className="text-lg border-slate-300 group" variant="outline" onClick={handleClick}
          //  onClick={() => router.push('/student')}
          >
             Inicia sesión como <p className="font-bold">&nbsp; Alumno</p> 
            <ChevronsRight className="ml-2 h-4 w-4 group-hover:animate-bounceX" color="#14b8a6" />
          </Button> */}
          <Button
            className="text-lg border-slate-300 group"
            variant="outline"
            onClick={handleClick}
            disabled={loading} // Deshabilitar el botón mientras carga
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              </div>
            ) : (
              <>
                Inicia sesión como <p className="font-bold">&nbsp; Alumno</p>
                <ChevronsRight className="ml-2 h-4 w-4 group-hover:animate-bounceX" color="#14b8a6" />
              </>
            )}
          </Button>
          <Button className="text-lg border-slate-300 group" variant="outline">
            Inicia sesión como <p className="font-bold">&nbsp; Instructor</p>
            <ChevronsRight className="ml-2 h-4 w-4 group-hover:animate-bounceX" color="#14b8a6" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-screen lg:w-1/2 bg-white">
        {/*img*/}
        {/* <Spline scene="https://prod.spline.design/YLS-BuibA6YQ4BAX/scene.splinecode" /> */}
        <Image
          src={loginImg}
          className={"object-cover"}
          priority={true}
          placeholder="blur"
          alt="Hero Illustration"
          loading="eager"
        />
      </div>
    </div>
  );
}
