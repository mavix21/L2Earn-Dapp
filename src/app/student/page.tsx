"use server"

import Curso from "@/components/courses/page";
import { Header } from "./header";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { useEffect, useState } from 'react';

import { withProviders } from "./account/hocs";
import { App } from "@/components/shared/conf";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "../../../~db";
import { courses } from "../../../~db/schema";


// const cursos = [
//   {
//     id: 1,
//     title: 'Web Development',
//     description: 'Learn the fundamentals of web development, including HTML, CSS, and JavaScript.',
//     image: '/placeholder.svg',
//   },
//   {
//     id: 2,
//     title: 'Data Science',
//     description: 'Introduction to data science, data analysis, and machine learning.',
//     image: '/placeholder.svg',
//   },
//   {
//     id: 3,
//     title: 'Mobile Development',
//     description: 'Learn how to create mobile applications for iOS and Android.',
//     image: '/placeholder.svg',
//   },
// ];

//const cursos = db.select().from(courses);
const cursos = await db.select().from(courses);

export default async function StudentDashboard() {
  const cursos = await db.select().from(courses);

  return (
    <div>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Learn2Earn"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Learn2Earn
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <a
                href="#"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </a>
              {/* <a
              href="#"
              className="text-white bg-emerald-700-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800"
            >
              Get started
            </a> */}
              <App />
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-white rounded bg-emerald-700 lg:bg-transparent lg:text-emerald-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Cursos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-emerald-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Mis cursos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1 py-12 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {
            cursos.map(curso => (
              <Card key={curso.id}>
                <img src="/placeholder.svg" alt="Course Image" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">{curso.title}</h3>
                  <p className="text-gray-500 mb-4">
                    Learn the fundamentals of web development, including HTML, CSS, and JavaScript.
                  </p>
                  <Button size="sm">Enroll</Button>
                </CardContent>
              </Card>
            ))
          }



        </div>
      </main>
    </div>
  );
}
