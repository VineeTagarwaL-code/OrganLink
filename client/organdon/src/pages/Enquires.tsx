/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store";
import { apiConnector } from "@/services/apiconnector";
import { userEndpoints } from "@/services/apis";
import Sidebar from "@/components/Sidebar";

const Enquiries = () => {
  const { user } = useSelector((state: RootState) => state.profile);
  const { token } = useSelector((state: RootState) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await apiConnector<string[]>(
        "POST",
        userEndpoints.GET_MESSAGES_FOR_HOSPITAL,
        { organId: id, userId: user._id },
        {
          "x-access-token": `Bearer ${token}`,
        }
      );

      const users = await apiConnector<any[]>(
        "POST",
        userEndpoints.GET_ALL_USERS,
        { users: res.data },
        {
          "x-access-token": `Bearer ${token}`,
        }
      );

      setUsers(users.data.filter((u) => u._id !== user._id));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(users);

  return (
    <div className="flex">
      <div className="w-72 h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col w-screen bg-white ">
        <div className="p-4 w-full flex justify-center items-center  bg-red-600 -red-500">
          Messages
        </div>
        <div className="flex h-full  -red-500 p-3">
          {users &&
            users.map((user: any) => (
              <div
                className="w-1/4  h-1/6 rounded-xl flex   -pink-400 items-center justify-center text-xl p-4 m-2 text-black bg-blue-500 cursor-pointer"
                onClick={() =>
                  navigate({
                    pathname: `/chat/${id}`,
                    search:
                      "?destinationUser=" +
                      user._id +
                      "&" +
                      "name=" +
                      user.name,
                  })
                }
              >
                <div className=" -green-700">{user.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
