// import Curso from "@/components/courses/page";
// import { Header } from "./header";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { useEffect, useState } from 'react';
//import { db } from "../../../~db";
//import { courses } from "../../../~db/schema";

import dotenv from "dotenv";
import { db } from "@/server/db";
import { courses } from "@/server/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { withProviders } from "./account/hocs";
// import { App } from "@/components/shared/conf";

//dotenv.config();

export default async function StudentDashboard() {
  const cursos = await db.select().from(courses);

  return (
    <div>

      <main className="flex-1 py-12 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {
            cursos.map(curso => (
              <Card key={curso.id}>
                <img src="/placeholder.svg" alt="Course_Image" className="rounded-t-lg object-cover w-full h-48" />
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
