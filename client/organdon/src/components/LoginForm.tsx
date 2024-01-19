"use client";

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

export function LoginForm() {
  const institutionsForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const isLoading = institutionsForm.formState.isLoading;

  const individualFormSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const formData = { ...values };
    console.log(formData);
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

        <Button
          type="submit"
          className="bg-[#ed5757] font-bold w-full text-lg hover:bg-[#D4D4D4] hover:text-[#ed5757]"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
