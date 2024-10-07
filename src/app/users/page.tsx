import { getUsers } from "@/actions/actions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "List of Users",
    description: "Users",
};

export default async function(){
  const users = await getUsers()

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Users" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="px-4 py-4 md:px-6 xl:px-7.5">
                  <div className="">
                      <h4 className="text-xl font-semibold text-black dark:text-white">
                          All Users
                      </h4>
                  </div>
              </div>
        
              <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="font-medium">Email</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Phone Number</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Type</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Created</p>
                </div>
          
              </div>
              { users ? users.map((user :any, key) => (
                <div
                  className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <p className="text-sm text-black dark:text-white">
                        #{key + 1} {user.first_name + " "+user?.middle_name + " " + user?.last_name}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {user.email}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {user.phone}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">{user.account_type}
                      </p>
                  </div>

                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      { (user.createdAt.getMonth() + 1) + "/" +  user.createdAt.getDate() + "/" + user.createdAt.getFullYear() + " " + user.createdAt.getHours() + ":" + user.createdAt.getMinutes()}
                      </p>
                  </div>
                </div>
              )) : <Loader isFormLoading={true} /> }
            </div>
        </DefaultLayout>
    )
}
