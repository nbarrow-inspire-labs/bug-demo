"use client";
import { useEffect } from "react";
import { DemoClient } from "../../../../src/DemoClient";



export default function Home() {

  useEffect(() => {
    new DemoClient();
  }, []);

  return (
    <main>

    </main>
  );
}
