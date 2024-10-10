"use client"
import { db } from "../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator"
import { accordionData } from '../data/accordionData';
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

interface AccordionItem {
  id: string;
  trigger: string;
  content: string;
}


export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [data, setData] = useState<AccordionItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map(doc => doc.data() as UserData);
      setUserData(data[0]);
      setData(accordionData);
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
        <Accordion type="single" collapsible className="lg:w-1/4 xl:w-1/4 md:w-1/2 w-3/4 mt-2">
          {data.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="font-semibold">{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
