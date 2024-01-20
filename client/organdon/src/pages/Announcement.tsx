import Sidebar from "@/components/Sidebar";
import { apiConnector } from "@/services/apiconnector";
import { useSelector } from "react-redux";
import { announcementEndpoints } from "@/services/apis";
import { useEffect, useState } from "react";
import { RootState } from "@/utils/store";
import AnnouncementCard from "@/components/AnnouncementCard";
import { Textarea } from "@/components/ui/textarea";
interface Announcement {
  from: string;
  contact: number;
  email: string;
  text: string;
  _id: string;
}

export default function Announcement() {
  const [announcement, setAnnouncement] = useState<Announcement[]>([]);
  const [announcementText, setAnnouncementText] = useState<string>(""); 
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    const interval = setInterval(getAnnouncements, 200);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit() {
    const res = await apiConnector<Announcement[]>(
      "POST",
      announcementEndpoints.POST_ANNOUNCEMENTS,
      {
        text: announcementText,
        from: user && user._id,
        email: user && user.email,
        contact: user && user.contact,
      },
      { "x-access-token": `Bearer ${token}` }
    );

    console.log(res);

    if (res.data && res.data.length > announcement.length) {
      setAnnouncement(res.data);
    }
  }

  async function getAnnouncements() {
    const res = await apiConnector<Announcement[]>(
      "GET",
      announcementEndpoints.GET_ANNOUNCEMENTS,
      {},
      { "x-access-token": `Bearer ${token}` }
    );

    if (res.data && res.data.length > announcement.length) {
      setAnnouncement(res.data);
    }
  }

  return (
    <div className="h-screen bg-[#111827] w-screen">
      <div className="hidden border-r border-slate-700 h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-[#0e1522]">
        <Sidebar />
      </div>
      <div className="flex flex-col border border-red-600 h-full ml-72 justify-between">
        {announcement && announcement.length ? (
          <div className="flex flex-wrap">
            {announcement.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                contact={announcement.contact}
                email={announcement.email}
                text={announcement.text}
              />
            ))}
          </div>
        ) : (
          <div>No announcments yet</div>
        )}
        <div className="bg-white text-black flex items-center justify-between">
          <Textarea
            placeholder={"please enter your message here"}
            className="bg-white w-full p-4"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
          />
          <button className="w-1/12 h-full border" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
