const AnnouncementCard = ({
  contact,
  email,
  text,
}: {
  contact: number;
  email: string;
  text: string;
}) => {
  return (
    <div className="border border-red-500  mx-4 my-2 p-4 rounded-lg bg-red-400 hover:bg-white hover:text-black">
      <div className="font-extrabold text-2xl">{text}</div>
      <div className="font-bold">{"Phone " + contact}</div>
      <div>{"Email " + email}</div>
    </div>
  );
};

export default AnnouncementCard;
