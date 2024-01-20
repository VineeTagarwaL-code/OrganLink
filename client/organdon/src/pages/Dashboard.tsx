import Sidebar from "../components/Sidebar";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Input } from "../components/ui/input";
import { IoFilterSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../components/ui/menubar";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiconnector";
import { userEndpoints } from "@/services/apis";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store";
import { AxiosResponse } from "axios";
import OrganCard from "@/components/OrganCard";

interface OrganTypes {
  organType: string;
  instituteId: string;
  bloodGroup: string;
  condition: string;
  certification?: string[];
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export default function Dashboard() {
  const [organType, setOrganType] = useState("");
  const [distance, setDistance] = useState("");
  const [organs, setOrgans] = useState<OrganTypes[]>([]);
  const { token } = useSelector((state: RootState) => state.auth);

  const organTypeOption = ["Heart", "Liver", "Kidney", "Lungs"];
  const distanceOption = ["50 km", "100 km", "200 km", "all over India"];

  const side = "left";

  useEffect(() => {
    console.log("distance: ", distance);
    console.log("organType: ", organType);
    fetchFilterOrgans();
  }, [organType, distance]);

  useEffect(() => {
    fetchOrgans();
  }, []);

  async function fetchFilterOrgans() {
    let distanceInNumber;
    if (distance.includes("all")) {
      distanceInNumber = 20000;
    } else {
      distanceInNumber = parseInt(distance.split(" ")[0]);
      console.log("Distance: ", distanceInNumber);
    }
    const data = {
      organType: organType.toLowerCase(),
      distance: distanceInNumber,
    };
    const response: AxiosResponse<OrganTypes[]> = await apiConnector(
      "POST",
      userEndpoints.FILTER_ORGAN_API,
      data,
      {
        "x-access-token": `Bearer ${token}`,
      }
    );
    console.log("fetch organ response in dashboard page: ", response);

    setOrgans(response.data);
  }

  const fetchOrgans = async () => {
    const response: AxiosResponse<OrganTypes[]> = await apiConnector(
      "GET",
      userEndpoints.GET_ALL_ORGANS,
      null,
      {
        "x-access-token": `Bearer ${token}`,
      }
    );
    console.log("response after fetch organs: ", response);
    setOrgans(response.data);
  };

  return (
    <div className="h-screen bg-[#111827] w-screen">
      <div className="hidden border-r border-slate-700 h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-[#0e1522]">
        <Sidebar />
      </div>
      <div className="relative md:ml-[288px] w-full">
        {/* mobile sidebar */}
        <div className="absolute inset-y-0 left-4 top-8">
          <Sheet>
            <SheetTrigger>
              <GiHamburgerMenu className="text-xl text-gray-400 md:hidden" />
            </SheetTrigger>
            <SheetContent side={side}>
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
        <div className="absolute inset-y-0 left-0 pl-16 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400 text-2xl" />
        </div>
        <Input
          placeholder="Search Organs by name"
          className="block w-full h-20 pl-24 pr-4 py-2 rounded-md focus:border bg-transparent"
        />
      </div>
      {/* cards */}
      <div className="md:ml-80 mr-14">
        {/* filter functuon */}
        <div className="flex justify-between ml-8 mt-5">
          <div></div>
          <div className="flex gap-x-3 items-center justify-center">
            {distance && (
              <div className="flex gap-x-4 items-center justify-center rounded-full pt-2 pb-2 pl-4 pr-4 bg-[#BC0B66]">
                Distance {distance}
                <div
                  className="text-lg font-bold text-black hover:bg-white transition-all duration-200 p-1 rounded-full"
                  onClick={() => setDistance("")}
                >
                  <RxCross2 />
                </div>
              </div>
            )}
            {organType && (
              <div className="flex gap-x-4 items-center justify-center rounded-full pt-2 pb-2 pl-4 pr-4 bg-[#BC0B66]">
                Organ type {organType}
                <div
                  className="text-lg font-bold text-black hover:bg-white transition-all duration-200 p-1 rounded-full"
                  onClick={() => setOrganType("")}
                >
                  <RxCross2 />
                </div>
              </div>
            )}
            <Menubar className="bg-[#0e1522] rounded-full">
              <MenubarMenu>
                <MenubarTrigger className="rounded-full">
                  <div className="flex gap-x-4">
                    <div className="flex gap-x-2 items-center justify-center">
                      <IoFilterSharp />
                      <p>Filter</p>
                    </div>
                  </div>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Distance</MenubarSubTrigger>
                    <MenubarSubContent>
                      {distanceOption.map((distance) => {
                        return (
                          <div>
                            <MenubarItem
                              key={distance}
                              onClick={() => setDistance(distance)}
                            >
                              {distance}
                            </MenubarItem>
                            <MenubarSeparator />
                          </div>
                        );
                      })}
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Organ type</MenubarSubTrigger>
                    <MenubarSubContent>
                      {organTypeOption.map((organ) => {
                        return (
                          <div>
                            <MenubarItem
                              key={organ}
                              onClick={() => setOrganType(organ)}
                            >
                              {organ}
                            </MenubarItem>
                            <MenubarSeparator />
                          </div>
                        );
                      })}
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
        <div className="mt-10">
          {organs.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {organs.map((organ) => (
                <div className="flex gap-x-4">
                  <OrganCard
                    instituteId={organ.instituteId}
                    key={organ._id}
                    _id={organ._id}
                    organType={organ.organType}
                    createdAt={organ.createdAt}
                    showEdit={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
    </div>
  );
}
