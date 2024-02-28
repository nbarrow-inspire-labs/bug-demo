"use client";
import { DemoClient } from "../../../src/test";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";



export default function Home() {

  useEffect(() => {
    new DemoClient();
  }, []);

  return (
    <main>

    </main>
  );
}
