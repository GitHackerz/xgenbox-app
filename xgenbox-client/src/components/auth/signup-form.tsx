"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import * as React from "react";
import Link from "next/link";
import { CollectorAccountType, CompanyAccountType, UserType } from "@/enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formCitizenSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});
const formCollectorSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  accountType: z.nativeEnum(CollectorAccountType),
});
const formCompanySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(3),
  phone: z.string().min(8),
  accountType: z.nativeEnum(CompanyAccountType),
});

export default function SignUpForm({ type }: { type: UserType }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(
      type == UserType.COLLECTOR
        ? formCollectorSchema
        : type == UserType.COMPANY
          ? formCompanySchema
          : formCitizenSchema,
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      accountType:
        type == UserType.COLLECTOR
          ? CollectorAccountType.INDIVIDUAL
          : CompanyAccountType.ORGANISATION_ASSOCIATION,
      companyName: "",
      phone: "",
    },
  });

  const formSchema =
    type == UserType.COLLECTOR
      ? formCollectorSchema
      : type == UserType.COMPANY
        ? formCompanySchema
        : formCitizenSchema;

  const handleSubmit = form.handleSubmit(
    (values: z.infer<typeof formSchema>) => {
      console.log(values);
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type == UserType.COLLECTOR ? (
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>
                          {field.value
                            ? field.value
                            : "Select the account type"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CollectorAccountType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            type == UserType.COMPANY && (
              <>
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue>
                              {field.value
                                ? field.value
                                : "Select the account type"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(CompanyAccountType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )
          )}
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>
    </Form>
  );
}
