import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import SvgPlus from "@/components/common/Loader/svg/plus";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

const productData: Product[] = [
    {
      image: "/images/product/product-01.png",
      name: "Project Bantayan",
      category: "Near Bantayan Islands",
      price: 5000000,
      sold: 22,
      profit: 5,
    },
    // {
    //   image: "/images/product/product-02.png",
    //   name: "Macbook Pro M1",
    //   category: "Electronics",
    //   price: 546,
    //   sold: 12,
    //   profit: 125,
    // },
    // {
    //   image: "/images/product/product-03.png",
    //   name: "Dell Inspiron 15",
    //   category: "Electronics",
    //   price: 443,
    //   sold: 64,
    //   profit: 247,
    // },
    // {
    //   image: "/images/product/product-04.png",
    //   name: "HP Probook 450",
    //   category: "Electronics",
    //   price: 499,
    //   sold: 72,
    //   profit: 103,
    // },
  ];


const ProjectTable = () => {
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
            <div className="">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Recent Projects
                </h4>
                <h4 className="pt-2">
                <Link href="/projects/add" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                    <SvgPlus/>
                </Link>
                </h4>
            </div>
        </div>
  
        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Project Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Description</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Investment Amount</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Total Lots</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Discount Scheme</p>
          </div>
        </div>
  
        {productData.map((product, key) => (
          <Link
          href={"/projects/" + key}
          >
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <Image
                    src={product.image}
                    width={60}
                    height={50}
                    alt="Product"
                  />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {product.name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.category}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                ${product.price}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.sold}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-meta-3">{product.profit}%</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    );
  };

const Projects = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Projects" />
            <ProjectTable/>
        </DefaultLayout>
    )
}

export default Projects