import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { RiAttachment2 } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { apiConnector } from "../services/apiconnector";
import { getAgo } from "../lib/utils";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { RootState } from "@/utils/store";
import { userEndpoints } from "@/services/apis";
import { OrganTypes } from "@/components/MyOrgans";
import Sidebar from "@/components/Sidebar";

export interface Message {
  to: string;
  from: string;
  text: string;
  organId: string;
  _id: string;
  attachment?: string;
  createdAt: string;
}

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [attachment, setAttachment] = useState<string>();
  const fileInputRef = useRef(null);

  const [organDetails, setOrganDetails] = useState<OrganTypes>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.profile);
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();
  const interactingUserName = new URLSearchParams(location.search).get("name");
  const destinationUser = new URLSearchParams(location.search).get(
    "destinationUser"
  );
  const { id } = useParams();
  console.log("desstination user", destinationUser);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessageChange = (e: any) => {
    setInputMessage(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const url = await uploadFile(file);
      setAttachment(url);
    }
  };

  const handleButtonClick = () => {
    // Trigger the file input when the button is clicked
    fileInputRef && fileInputRef.current?.click();
  };

  useEffect(() => {
    fetchOrganDetails();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await apiConnector<Message[]>(
        "POST",
        userEndpoints.GET_CONVERSATION,
        { organId: id, userId: destinationUser || user._id },
        {
          "x-access-token": `Bearer ${token}`,
        }
      );
      setMessages(response.data.reverse());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  async function fetchOrganDetails() {
    const res = await apiConnector<OrganTypes>(
      "GET",
      userEndpoints.GET_ONE_ORGAN + "/" + id,
      null,
      {
        'x-access-token': `Bearer ${token}`,
      }
    );

    setOrganDetails(res.data);
  }

  async function uploadFile(attachment: File) {
    if (attachment) {
      const formData = new FormData();
      formData.append(`file`, attachment, attachment.name);

      const fileUploadResponse = await apiConnector<{
        data: { url: string }[];
      }>("POST", userEndpoints.UPLOAD_CERTIFICATE_API, formData, {
        Authorization: "Bearer " + token,
      });
      return fileUploadResponse.data.data[0].url;
    }
  }

  const handleMessageSend = async () => {
    const toUser = destinationUser || organDetails?.instituteId;
    if (!(toUser && user._id && id)) {
      return;
    }

    const payload: {
      text?: string;
      to: string;
      from: string;
      organId: string;
      attachment?: string;
    } = {
      text: inputMessage,
      to: toUser,
      from: user._id,
      organId: id,
    };

    if (attachment) {
      payload.attachment = attachment;
    }

    await apiConnector("POST", userEndpoints.SEND_MESSAGE_API, payload, {
      "x-access-token": `Bearer ${token}`,
    });
    setInputMessage("");
    setAttachment("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyUp = (event: any) => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };

  console.log("checkchekchaklcsldkakjlkl;asfj;klsakljg;jgkas;lkgasj");

  return (
    <div className="flex">
      <div className="w-72 h-screen fixed">
        <Sidebar />
      </div>
      <div className="ml-72 flex overflow-y-auto w-screen  flex-col bg-white ">
        <div className="flex items-center fixed top-0 h-1/12  w-full p-4 bg-red-600">
          <div className="   text-black">
            <Avatar className="bg-red-600">
              <AvatarFallback className="bg-red-400">
                {interactingUserName && interactingUserName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="p-4 rounded-xl text-black">{interactingUserName}</div>
        </div>

        <div className="my-40 p-4 h-screen mb-40 flex flex-col-reverse justify-end">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`my-2 flex ${
                message.from === user._id ? "justify-end " : "justify-start"
              } `}
            >
              <div className="">
                <div
                  className={`mx-2 text-black flex  w-auto text-center ${
                    message.from === user._id ? "flex-row-reverse" : ""
                  }`}
                >
                  <div>
                    <Avatar className={`mx-1 border mt-8`}>
                      <AvatarFallback
                        className={`${
                          message.from === user._id
                            ? "bg-yellow-200"
                            : "bg-red-500"
                        }`}
                      >
                        {message.from === user._id
                          ? user.name[0]
                          : interactingUserName && interactingUserName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className={"flex flex-col"}>
                    {message.text && (
                      <div
                        className={`p-4 mb-4 ${
                          message.from === user._id
                            ? "bg-blue-500 flex-col rounded-t-xl text-white rounded-bl-xl "
                            : "bg-slate-100  rounded-t-xl rounded-br-xl"
                        }`}
                      >
                        {" "}
                        {message.text}
                      </div>
                    )}
                    {message.attachment && (
                      <div className={``}>
                        <img
                          className="cursor-pointer"
                          src={message.attachment}
                          width={100}
                          height={100}
                          onClick={() =>
                            (window.location.href = message.attachment || "")
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-4 mt-2 mx-2 text-slate-500">
                  {getAgo(message.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 flex items-center w-screen bg-gray-200 rounded-xl">
          <span className="flex w-3/4">
            <textarea
              className=" p-2 py-4 bg-gray-200 h-auto w-3/4 text-black"
              placeholder="Enter your message here"
              onChange={handleMessageChange}
              value={inputMessage}
              onKeyUpCapture={handleKeyUp}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }} // Hide the actual file input
              onChange={handleFileChange}
            />
            {attachment && (
              <img
                src={attachment}
                width={50}
                height={50}
                className="rounded-xl p-2"
              />
            )}
            <button onClick={handleButtonClick}>
              <RiAttachment2 color="black" className="" size="30px" />
            </button>
            <button className=" p-3" onClick={handleMessageSend}>
              <AiOutlineSend color="black" className="" size="30px" />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
