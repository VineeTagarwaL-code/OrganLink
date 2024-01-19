import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RootState } from "@/utils/store";
import { OrganDonationFormSchema } from "@/schema/OrganDonationFormSchema";
import { apiConnector } from "@/services/apiconnector";
import { userEndpoints } from "@/services/apis";

export function OrganDonationForm() {
  const [files, setFiles] = useState<File[]>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();

  const organDonationForm = useForm<z.infer<typeof OrganDonationFormSchema>>({
    resolver: zodResolver(OrganDonationFormSchema),
  })

  const onSubmit = async(values: z.infer<typeof OrganDonationFormSchema>) => {
    const certification: string[] = []
    const lat = user.lat;
    const lng = user.lng;
    const data = {...values, lat: lat, lng: lng}

    if(files){
      const formData = new FormData();

        [...files].forEach((file) => {
            formData.append(`file`, file, file.name)
        })
    }

   await apiConnector("POST", userEndpoints.DONATE_API, {data, certification}, {
      Authorization: `Bearer ${token}`
    });
    navigate("/myorgans");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any)=>{
    if(e.target && e.target.files && e.target.files.length){
      setFiles(e.target.files)
    }
  }

  return (
    <div>
      <Form {...organDonationForm}>
        <form onSubmit={organDonationForm.handleSubmit(onSubmit)} className="space-y-5">
          {/* organ type */}
          <FormField
            control={organDonationForm.control}
            name="organType"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start text-[#D4D4D4] w-full">
                  <FormLabel>Organ type</FormLabel>
                    <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              )
            }}
          />

          {/* blood group */}
          <FormField
            control={organDonationForm.control}
            name="bloodGroup"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start text-[#D4D4D4] w-full">
                  <FormLabel>Blood group</FormLabel>
                    <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Blood group</SelectLabel>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    </FormControl>
                </FormItem>
              )
            }}
          />

          {/* condition */}
          <FormField
            control={organDonationForm.control}
            name="condition"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start text-[#D4D4D4] w-full">
                  <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Enter condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Condition</SelectLabel>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="bad">Bad</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                </FormItem>
              )
            }}
          />

          <input type="file" onChange={handleChange} multiple />

          <Button type="submit" className="bg-[#ed5757] font-bold w-full text-lg hover:bg-[#D4D4D4] hover:text-[#ed5757]">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
