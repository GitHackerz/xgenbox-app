"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { createBin } from "@/actions/bin";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  type: z.string(),
  weight: z.number(),
  latitude: z.number(),
  longitude: z.number(),
});

type BinFormValues = z.infer<typeof formSchema>;

export const BinRequestForm = () => {
  const [loading, setLoading] = useState(false);
  const title = "Request bin";
  const description = "Request a bin.";
  const action = "Send Request";
  const router = useRouter();

  const defaultValues = {
    type: "",
    weight: 0,
    latitude: 0,
    longitude: 0,
  };

  const form = useForm<BinFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: BinFormValues) => {
    setLoading(true);
    await createBin(values);
    router.push("/dashboard/bin");
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[30%] mx-auto flex flex-col items-center justify-center bg-secondary px-4 py-8 rounded-xl"
        >
          <h1 className="text-3xl font-bold">Request a bin</h1>
          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Bin Type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        disabled={loading}
                        placeholder="Bin Latitude"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        className="flex-1 w-full"
                        type={"number"}
                        disabled={loading}
                        placeholder="Bin Longitude"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      type={"number"}
                      disabled={loading}
                      placeholder="Bin Weight"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="inline-flex items-center gap-4">
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
            <Button
              variant={"outline"}
              disabled={loading}
              onClick={() => router.push("/dashboard/bin")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
