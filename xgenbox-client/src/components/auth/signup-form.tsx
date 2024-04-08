"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import * as React from "react";
import { CollectorAccountType, CompanyAccountType, UserType } from "@/enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAccount } from "@/actions/auth";
import { Company } from "@/types/User";
import { Toast, ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";

const formEmployeeSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(8),
});
const formCollectorSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(8),
  accountType: z.nativeEnum(CollectorAccountType),
});
const formCompanySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(3),
  phone: z.string().min(8),
  accountType: z.nativeEnum(CompanyAccountType),
  address: z.string().min(3),
  city: z.string().min(3),
});

export default function SignUpForm({
  type,
  companies,
}: {
  type: UserType;
  companies: Company[];
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      type == UserType.COLLECTOR
        ? formCollectorSchema
        : type == UserType.COMPANY
          ? formCompanySchema
          : formEmployeeSchema,
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      accountType:
        type == UserType.COLLECTOR
          ? CollectorAccountType.INDIVIDUAL
          : CompanyAccountType.HOSPITAL,
      companyName: "",
      phone: "",
      address: "",
      city: "",
    },
  });

  const formSchema =
    type == UserType.COLLECTOR
      ? formCollectorSchema
      : type == UserType.COMPANY
        ? formCompanySchema
        : formEmployeeSchema;

  const handleSubmit = form.handleSubmit(
    async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      const { error, success } = await createAccount({
        ...values,
        role: type,
      });

      if (!success)
        toast({
          title: "Error",
          description: error,
          className: "bg-red-200 text-red-700",
        });
      else
        toast({
          title: "Success",
          description: "Account created successfully",
          className: "bg-green-200 text-green-700",
        });

      setIsLoading(false);
      if (success) router.push("/sign-in");
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
          {type == UserType.COLLECTOR ? (
            <div
              className={
                form.watch("accountType") == CollectorAccountType.COMPANY
                  ? "grid grid-cols-2 gap-2"
                  : ""
              }
            >
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
              {
                // Displayed only if the account type is Company the list of companies
                form.watch("accountType") == CollectorAccountType.COMPANY && (
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select the company">
                                {field.value
                                  ? field.value
                                  : "Select the company"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {companies.map((company) => (
                                <SelectItem
                                  key={company._id}
                                  value={company.companyName}
                                >
                                  {company.accountType +
                                    " - " +
                                    company.companyName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }
            </div>
          ) : (
            type == UserType.COMPANY && (
              <>
                <div className="grid grid-cols-2 gap-2">
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
                </div>
                <div className="inline-flex gap-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
