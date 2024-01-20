import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/store";
import { OrganDonationFormSchema } from "@/schema/OrganDonationFormSchema";
import { apiConnector } from "@/services/apiconnector";
import { userEndpoints } from "@/services/apis";

export function OrganDonationForm() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();

  const organDonationForm = useForm<z.infer<typeof OrganDonationFormSchema>>({
    resolver: zodResolver(OrganDonationFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof OrganDonationFormSchema>) => {
    const lat = user.lat;
    const lng = user.lng;
    const data = { ...values, lat: lat, lng: lng };
    console.log("post request ", data);
    await apiConnector("POST", userEndpoints.DONATE_API, data, {
      "x-access-token": `Bearer ${token}`,
    });
    navigate("/myorgans");
  };

  return (
    <div>
      <Form {...organDonationForm}>
        <form
          onSubmit={organDonationForm.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* organ type */}
          <FormField
            control={organDonationForm.control}
            name="organType"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start text-[#D4D4D4] w-full">
                  <FormLabel>Organ type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select organ type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Organ type</SelectLabel>
                          <SelectItem value="heart">Heart</SelectItem>
                          <SelectItem value="lung">Lung</SelectItem>
                          <SelectItem value="kidney">Kidney</SelectItem>
                          <SelectItem value="liver">Liver</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button
            type="submit"
            className="bg-[#ed5757] font-bold w-full text-lg hover:bg-[#D4D4D4] hover:text-[#ed5757]"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
