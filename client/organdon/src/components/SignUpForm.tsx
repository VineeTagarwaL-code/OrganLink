"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SignUpSchema } from "@/schema/SignUpSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiConnector } from "@/services/apiconnector";
import { authEndpoints } from "@/services/apis";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/utils/slices/profileSlices";
import { RootState } from "@/utils/store";
import { useEffect } from "react";
import wait from "@/utils/wait";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.profile);

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    setIsLoading(true);
    const formData = {
      ...values,
      lat: localStorage.getItem("Lat"),
      lng: localStorage.getItem("Long"),
    };
    console.log("form data: ", formData);
    const response = await apiConnector(
      "POST",
      authEndpoints.SIGNUP_API,
      formData
    );
    console.log("Response after signup: ", response);

    try {
      if (response.status == 200) {
        localStorage.setItem(
          "OrganDonation_User",
          JSON.stringify(response.data)
        );
        dispatch(setUser(response.data));

        await wait(2000);
        setIsLoading(false);
        toast("SignUp Successfull , Check your mail", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        await wait(2000);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error during signup: ", error);
    }
  }

  useEffect(() => {
    console.log("user: -------------> ", user);
  }, [user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col items-start text-[#D4D4D4]">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter your first name"
                    {...field}
                    className="bg-[#2c2c2c] border-none outline-none "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col items-start text-[#D4D4D4]">
                <FormLabel className="text-base text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="abc@gmail.com"
                    className="bg-[#2c2c2c] border-none outline-none "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {/*contact number*/}
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col items-start text-[#D4D4D4]">
                <FormLabel className="text-white">Contact Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="+91"
                    className="bg-[#2c2c2c] border-none outline-none "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/*state*/}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col items-start text-[#D4D4D4]">
                <FormLabel className="text-white">State</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="West Bengal"
                    className="bg-[#2c2c2c] border-none outline-none "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex justify-between w-full gap-2">
          {/*city*/}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start text-[#D4D4D4]">
                  <FormLabel className="text-white">City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Kolkata"
                      className="bg-[#2c2c2c] text-white border-none outline-none "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/*zip code*/}
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start text-[#D4D4D4]">
                  <FormLabel className="text-white">Zip code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="123456"
                      {...field}
                      className="bg-[#2c2c2c] border-none outline-none "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="role"
          defaultValue="institution"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col items-start text-[#D4D4D4]">
                <FormLabel className="text-white">Signup As</FormLabel>
                <Select
                  onValueChange={(selectedValue) => {
                    console.log(selectedValue);
                    setRole(selectedValue);
                    field.onChange;
                  }}
                  defaultValue={field.value}
                >
                  <FormControl className="bg-[#2c2c2c] border-none outline-none ">
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#D4D4D4]">
                    <SelectItem value="individual">individual</SelectItem>
                    <SelectItem value="institution">Institution</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {role == "institution" ? (
          <FormField
            control={form.control}
            name="nabh"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start text-[#D4D4D4]">
                  <FormLabel className="text-white">NABH code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="0000"
                      {...field}
                      className="bg-[#2c2c2c] border-none outline-none "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        ) : null}
        {isLoading ? (
          <Button
            disabled
            className="bg-[#ed5757] font-bold w-full text-lg hover:bg-[#D4D4D4] hover:text-[#ed5757]"
          >
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-[#ed5757] font-bold w-full text-lg hover:bg-[#D4D4D4] hover:text-[#ed5757]"
          >
            Create account
          </Button>
        )}
      </form>
    </Form>
  );
}
