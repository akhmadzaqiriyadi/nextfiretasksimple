"use client"
import { db } from "../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



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
      <div className="flex justify-center items-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Name: {userData.name}</CardTitle>
            <CardDescription>NPM: {userData.npm}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{userData.desc}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
