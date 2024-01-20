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
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../components/ui/menubar";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function Dashboard() {
  const [organType, setOrganType] = useState("");
  const [distance, setDistance] = useState(false);

  const organTypeOption = ["Heart", "Liver", "Kidney", "Lungs"];
  const side = "left";
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
                  onClick={() => setDistance(false)}
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
                  <MenubarItem onClick={() => setDistance(true)}>
                    Distance <MenubarShortcut>⌘D</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Organ type</MenubarSubTrigger>
                    <MenubarSubContent>
                      {organTypeOption.map((blood) => {
                        return (
                          <div className="">
                            <MenubarItem
                              key={blood}
                              onClick={() => setOrganType(blood)}
                            >
                              {blood}
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
      </div>
    </div>
  );
}
