/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiconnector";
import { userEndpoints } from "@/services/apis";
import { RootState } from "@/utils/store";

type OrganCardProps = {
  organType: string;
  _id: string;
  createdAt: string;
  showEdit: boolean;
  instituteId: string;
};

const OrganCard = ({
  instituteId,
  organType,
  createdAt,
  showEdit,
  _id,
}: OrganCardProps) => {
  const [instituteDetail, setInstituteDetail] = useState<any>();
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getInstituteDetails();
  }),
    [];

  async function getInstituteDetails() {
    const res = await apiConnector(
      "GET",
      userEndpoints.GET_USER + "/" + instituteId,
      null,
      {
        "x-access-token": `Bearer ${token}`,
      }
    );
    console.log("got the instittiondetaild,", res);
    setInstituteDetail(res.data);
  }

  function handleChat() {
    navigate({
      pathname: `/chat/${_id}`,
      search: "?name=" + instituteDetail.name,
    });
  }

  function calculateDaysDifference(createdAt: string) {
    const listedDate = new Date(createdAt);
    const presentDate = new Date();

    if (!isNaN(listedDate.getTime()) && !isNaN(presentDate.getTime())) {
      // Calculate the time difference in milliseconds
      const timeDifference = presentDate.getTime() - listedDate.getTime();

      // Calculate the difference in days
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
    }

    return -1;
  }

  return (
    <div>
      <Card className="overflow-y-scroll bg-[#1F2937] text-whit rounded-xl w-96 p-5 items-center flex flex-col hover:bg-white hover:text-black font-serif">
        <div className="flex justify-between w-full">
          <div className="flex gap-x-4 items-center">
            <Avatar className="bg-red">
              <AvatarFallback className="bg-red-400">
                {instituteDetail && instituteDetail.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-4">
              <p className="text-lg">
                {organType[0].toUpperCase() +
                  organType.slice(1).toLocaleLowerCase()}
              </p>
              <p className="text-[14px] hover:text-zinc-400">
                {calculateDaysDifference(createdAt) > 0 ? (
                  <p>{calculateDaysDifference(createdAt)} days ago</p>
                ) : (
                  <p>Today</p>
                )}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {showEdit && (
              <div>
                <button
                  className="bg-green-400 mx-2 p-2 rounded-xl"
                  onClick={() => navigate("/enquiries/" + _id)}
                >
                  Enquiries
                </button>
              </div>
            )}

            {showEdit && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center justify-center rounded-xl bg-red-500  p-3">
                    <PiDotsThreeOutlineVerticalFill />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Update</DropdownMenuItem>
                  <DropdownMenuItem>Unlist</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {!showEdit && (
          <div className="flex flex-col ml-2 mt-8 w-1/2 ">
            <button
              className="w-full rounded-xl bg-blue-300 text-black p-2"
              onClick={handleChat}
            >
              Chat
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default OrganCard;
