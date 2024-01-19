"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SignUpSchema } from "@/schemas/SignUpSchema";

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

export function SignUpForm() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const isLoading = form.formState.isLoading;

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const formData = { ...values };
    console.log("form data: ", formData);
  }

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
                    className="bg-[#2c2c2c]"
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="abc@gmail.com"
                    className="bg-[#2c2c2c]"
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
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="1234567890"
                    className="bg-[#2c2c2c]"
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
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="West Bengal"
                    className="bg-[#2c2c2c]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex justify-between w-full">
          {/*city*/}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start text-[#D4D4D4]">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Kolkata"
                      className="bg-[#2c2c2c]"
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
                  <FormLabel>Zip code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="123456"
                      {...field}
                      className="bg-[#2c2c2c] "
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
                <FormLabel>SignUp as</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="bg-[#2c2c2c]">
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
        <Button
          type="submit"
          className="bg-[#ed5757] font-bold w-full text-lg hover:bg-[#D4D4D4] hover:text-[#ed5757]"
        >
          Create account
        </Button>
      </form>
    </Form>
  );
}
