import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiconnector";
import { authEndpoints } from "@/services/apis";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
export default function Admin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [institutions, setInstitution] = useState<any>([]);
  const { token } = useSelector((state: RootState) => state.auth);
  async function getUnVerifiedInstitution() {
    const response = await apiConnector(
      "GET",
      authEndpoints.ADMINREQ_API,
      null,
      {
        "x-access-token": `Bearer ${token}`,
      }
    );
    console.log(response.data);
    setInstitution(response.data);
  }
  useEffect(() => {
    try {
      getUnVerifiedInstitution();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="max-h-screen h-screen w-screen flex justify-center items-center">
      <Toaster />
      <div className="w-[50%]">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          institutions.map((institution: any) => {
            return (
              <InstitutionCard
                name={institution.name}
                city={institution.city}
                email={institution.email}
                nabh={institution.nabh}
                id={institution._id}
                token={token || ""}
              />
            );
          })
        }
      </div>
    </div>
  );
}

type instituteProp = {
  name: string;
  city: string;
  email: string;
  nabh?: string;
  id: string;
  token: string;
};
function InstitutionCard({
  name,
  city,
  email,
  nabh,
  id,
  token,
}: instituteProp) {
  async function approveInstitute() {
    try {
      const response = await apiConnector(
        "POST",
        authEndpoints.ADMINAPPROVE_API,
        {
          ids: id,
        },
        {
          "x-access-token": `Bearer ${token}`,
        }
      );
      if (response.status == 200) {
        toast("Updated successfully", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex w-[100%] border-[#ed5757] border-2 justify-between bg-black/50 px-4 py-4 rounded-lg">
      <div>
        <h2>name: {name}</h2>
        <p>city: {city}</p>
        <p>email: {email}</p>
        <p>NABH CODE:{nabh}</p>
      </div>

      <div className="flex flex-col flex-nowrap gap-4">
        <Button className="bg-lime-700" onClick={approveInstitute}>
          Approve
        </Button>
        <Button className="bg-[#ed5757]">Decline</Button>
      </div>
    </div>
  );
}
