"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schema/LoginSchema";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiConnector } from "@/services/apiconnector";
import { authEndpoints } from "@/services/apis";
import { setUser } from "@/utils/slices/profileSlices";
import { setToken } from "@/utils/slices/authSlice";
import wait from "@/utils/wait";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const institutionsForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const individualFormSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    const formData = { ...values };
    console.log(formData);
    try {
      const response = await apiConnector<{
        token: string;
        user: { name: string };
      }>("POST", authEndpoints.LOGIN_API, formData);
      if (response.status == 200) {
        const { token, user } = response.data;
        dispatch(setUser(user));
        dispatch(setToken(token));
        localStorage.setItem("OrganDonation_User", JSON.stringify(user));
        localStorage.setItem("OrganDonToken", JSON.stringify(token));
        await wait(2000);
        setIsLoading(false);
        toast("Login Successfull , Launching you", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        await wait(2000);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("error during login: ", error);
    }
  };

  return (
    <Form {...institutionsForm}>
      <form
        onSubmit={institutionsForm.handleSubmit(individualFormSubmit)}
        className="space-y-5 "
      >
        <FormField
          control={institutionsForm.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col items-start text-[#D4D4D4] mb-4">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="abc@gmail.com"
                    className="bg-[#2c2c2c] text-white border-none outline-none mb-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={institutionsForm.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col items-start text-[#D4D4D4] mb-4">
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Your pass"
                    className="bg-[#2c2c2c] text-white border-none outline-none mb-4 "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

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
            Login
          </Button>
        )}
      </form>
    </Form>
  );
}
