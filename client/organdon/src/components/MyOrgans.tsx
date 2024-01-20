import Sidebar from "./Sidebar";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Input } from "../components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiConnector } from "../services/apiconnector";
import { RootState } from "@/utils/store";
import { userEndpoints } from "@/services/apis";
import OrganCard from "./OrganCard";
export interface OrganTypes {
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

export default function MyOrgans() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [organs, setOrgans] = useState<OrganTypes[]>([]);

  useEffect(() => {
    fetchOrgans();
  }, []);

  const fetchOrgans = async () => {
    const response = await apiConnector(
      "GET",
      userEndpoints.GET_INSTITUTE_ORGANS,
      null,
      {
        "x-access-token": `Bearer ${token}`,
      }
    );
    console.log("response after get all institue organs: ", response);
    setOrgans(response?.data as OrganTypes[]);
  };
  console.log("chekcheckhsckhlscksklacasklsjk;kajsfkjlsa;klj");

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
            <SheetContent side={"left"}>
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
      <div className="md:ml-80">
        {organs.length > 0 ? (
          <div className="flex flex-wrap gap-y-8 mr-14 ml-8 mt-8  justify-between">
            {organs.map((organ) => (
              <OrganCard
                instituteId={organ.instituteId}
                key={organ._id}
                _id={organ._id}
                organType={organ.organType}
                createdAt={organ.createdAt}
                showEdit={true}
              />
            ))}
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
}
