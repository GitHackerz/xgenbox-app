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
import { createBin, updateBin } from "@/actions/bin";
import { useRouter } from "next/navigation";

export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  type: z.string(),
  weight: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  capacity: z.number(),
  temperature: z.number(),
  gaz: z.number(),
});

type BinFormValues = z.infer<typeof formSchema>;

interface BinFormProps {
  initialData: any | null;
  binID: string;
}

export const BinForm: React.FC<BinFormProps> = ({ initialData, binID }) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit bin" : "Create bin";
  const description = initialData ? "Edit a bin." : `Add a ${binID} bin`;
  const action = initialData ? "Save changes" : "Create";
  const router = useRouter();

  const defaultValues = initialData
    ? initialData
    : {
        type: "",
        weight: 0,
        latitude: 0,
        longitude: 0,
        capacity: 0,
        temperature: 0,
        gaz: 0,
      };

  const form = useForm<BinFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: BinFormValues) => {
    setLoading(true);
    if (initialData) {
      await updateBin(initialData._id, values);
    } else {
      await createBin(values);
    }
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
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
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
          <div className="md:grid md:grid-cols-4 gap-8">
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
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Bin Capacity"
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
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperature</FormLabel>
                  <FormControl>
                    <Input
                      type={"number"}
                      disabled={loading}
                      placeholder="Bin Temperature"
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
              name="gaz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gaz</FormLabel>
                  <FormControl>
                    <Input
                      type={"number"}
                      disabled={loading}
                      placeholder="Bin Gaz"
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
