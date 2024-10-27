'use client'
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from "xlsx-js-style";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableProducts = useRef(null)
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render


  const onGetExporProduct = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      // Check if the action result contains data and if it's an array
      if (products && Array.isArray(products)) {
        // const dataToExport = products.map((pro: any) => ({
        //   title: pro.title,
        //   price: pro.lastname,
        //   category: pro.category,
        //   description: pro.description,
        // }));
        const dataToExport = [
            [
                "Buyer's name" , "asd",
                "Project" , "Project"
            ],
            [
                "asd" , "asd",
            ]
        ]
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        let row = [
          { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
          { v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "FF0000" } } } },
          { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "E9E9E9" } } } },
          { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
        ];
        const worksheet = XLSX.utils?.aoa_to_sheet([row]);
        
        // XLSX.utils.book_append_sheet(workbook, , worksheetname);
        XLSX.utils.book_append_sheet(workbook, worksheet , worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error")
      }
    } catch (error: any) {
      setLoading(false);
      console.log("#==================Export Error", error.message);

    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24 ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" ref={tableProducts}>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr className="">
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Price
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Category
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.slice(0, 5).map((product: any) => (
                <tr className="border-b border-gray-200 dark:border-gray-700" key={product.id}>
                  <th scope="row" className="px-6 py-4">
                    {product.title}
                  </th>
                  <td className="px-6 py-4">
                    {product.price}$
                  </td>
                  <td className="px-6 py-4">
                    {product.category}$
                  </td>
                  <td className="px-6 py-4">
                    {product.description.slice(0, 20)} ...
                  </td>
                </tr>
              ),
              )
            }
          </tbody>
        </table>
      </div>
      <button onClick={() => onGetExporProduct("Product", "ProductExport")} className="group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600">
        <span className="relative">
         {loading ? "Loading..." : "Export"}
        </span>
        <div className="animate-shine-infinite absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-[12px]">
          <div className="relative h-full w-8 bg-white/30">
          </div>
        </div>
      </button>
    </main>
  );
}