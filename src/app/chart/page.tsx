import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Metaland Chart",
  description:
    "Charts",
};

const BasicChartPage: React.FC = () => {
  return (
    <>
      <Chart />
    </>
  );
};

export default BasicChartPage;
