"use client"
import { db } from "../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"






interface UserData {
  name: string;
  npm: string;
  desc: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map(doc => doc.data() as UserData);
      setUserData(data[0]);
    };
    fetchData();
  }, []);

  if (!userData) 
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2">
          <Progress value={90}/>
          <p className="text-center mt-2">Loading...</p>
        </div>
    </div>
  );
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-semibold text-2xl">Jack.</h1>
        <Separator className="lg:w-1/4 xl:w:1/4 md:w-1/2 w-3/4 mb-4"></Separator>
        <Card className="lg:w-1/4 xl:w:1/4 md:w-1/2 w-3/4">
          <CardHeader>
            <Avatar>
              <AvatarImage src="https://github.com/akhmadzaqiriyadi.png" />
              <AvatarFallback>Jack</AvatarFallback>
            </Avatar>
            <CardTitle>Name: {userData.name}</CardTitle>
            <CardDescription>NPM: {userData.npm}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{userData.desc}</p>
          </CardContent>
          <CardFooter className="gap-2">
            <a href="https://github.com/akhmadzaqiriyadi" target="_blank" rel="noopener noreferrer">
              <LinkedInLogoIcon className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/zaqtinkerer" target="_blank" rel="noopener noreferrer">
              <InstagramLogoIcon className="w-6 h-6" />
            </a>
          </CardFooter>
        </Card>
        <h1 className="font-semibold text-base mt-4">About this <span className="underline">site</span> ✐</h1>
        <Separator className="lg:w-1/4 xl:w:1/4 md:w-1/2 w-3/4 mb-1"></Separator>
        <Accordion type="single" collapsible className="lg:w-1/4 xl:w:1/4 md:w-1/2 w-3/4 mt-2">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">What technologies were used to build this website?</AccordionTrigger>
            <AccordionContent>
            This website was built using <strong>Next.js</strong>, a powerful React framework that allows for server-side rendering and static site generation. It also utilizes <strong>Firebase</strong> for the backend, enabling real-time database capabilities, authentication, and hosting. The styling is handled with <strong>Tailwind CSS</strong>, which provides utility-first CSS classes for rapid UI development.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">What is ShadCN?</AccordionTrigger>
            <AccordionContent>
              ShadCN is a UI component library built on Radix UI and Tailwind CSS.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">How was this website created?</AccordionTrigger>
            <AccordionContent>
              The website was developed by following these steps:
              <ol className="list-decimal pl-5">
                <li>
                  Set up a Next.js project using the command <code>npx create-next-app@latest</code>.
                </li>
                <li>
                  Installed necessary dependencies such as <code>firebase</code> and <code>tailwindcss</code>.
                </li>
                <li>
                  Configured Firebase by creating a project in the Firebase console and adding the necessary configuration in <code>firebaseConfig.ts</code>.
                </li>
                <li>
                  Implemented UI components using ShadCN and Tailwind CSS for a responsive design.
                </li>
                <li>
                  Utilized Firestore for managing user data and displaying it dynamically.
                </li>
                <li>
                  Deployed the application to Vercel for easy hosting and continuous deployment.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
