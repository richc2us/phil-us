import { Metadata } from "next";
import Projects from "./projects/page";

export const metadata: Metadata = {
  title:
    "Metaland",
  description: "Metaland",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout> */}
        <Projects />
      {/* </DefaultLayout> */}
    </>
  );
}
