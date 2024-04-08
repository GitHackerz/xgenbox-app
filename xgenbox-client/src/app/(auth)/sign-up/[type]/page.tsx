import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTrashRestore, FaUser, FaWarehouse } from "react-icons/fa";
import SignUpForm from "@/components/auth/signup-form";
import { UserType } from "@/enums";
import { redirect } from "next/navigation";
import { getCompanies } from "@/actions/company";

const Card = ({
  icon: Icon,
  title,
  description,
  active,
  order,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  active: boolean;
  order?: number;
}) => (
  <Link
    href={`/sign-up/${title.toLowerCase()}`}
    style={{
      order: order,
    }}
    className={` ${active ? "w-full  bg-zinc-200 text-zinc-700" : " w-[95%]"}  hover:w-full border border-white rounded-xl py-5 px-4 inline-flex gap-4 items-center hover:bg-zinc-200 hover:text-zinc-700 ease-in duration-200`}
  >
    <Icon className="h-6 w-6" />
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold ">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  </Link>
);

export default async function SignUpPage({
  params,
}: {
  params: { type: UserType };
}) {
  const companies = await getCompanies();

  const { type } = params;
  if (!UserType[type.toUpperCase() as UserType]) redirect("/sign-up/employee");
  return (
    <main>
      <div className=" h-screen container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 duration-300">
        <div className="lg:p-8 h-full">
          <div className="h-full  mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl tracking-tight capitalize font-medium">
                Create your <span className="font-bold ">{type}</span> account
              </h1>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href={"/sign-in"} className="text-primary font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
            <SignUpForm
              type={type.toUpperCase() as UserType}
              companies={companies}
            />
          </div>
        </div>
        <div className="bg-zinc-900 hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="relative z-20 flex items-center text-lg font-medium self-end">
            <Image
              src={"/images/logoW.webp"}
              alt={"Logo"}
              width={150}
              height={0}
            />
          </div>

          <div className="h-full flex  w-full flex-col gap-14 items-center justify-center ">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-white">
                Welcome to XGENBOX
              </h1>
              <p className={"text-sm text-zinc-300 text-center"}>
                Register now to access exclusive features and personalized
                content.
              </p>
            </div>
            <div className="flex flex-col items-end gap-4 w-full px-4">
              <Card
                title="Employee"
                description="Register now to access exclusive features and personalized content."
                icon={FaUser}
                active={type.toUpperCase() === UserType.EMPLOYEE}
                order={type.toUpperCase() === UserType.EMPLOYEE ? 2 : 1}
              />
              <Card
                title="Collector"
                description="Register now to discover, collect, and manage your personalized collections."
                icon={FaTrashRestore}
                active={type.toUpperCase() === UserType.COLLECTOR}
                order={
                  type.toUpperCase() === UserType.COLLECTOR
                    ? 2
                    : type.toUpperCase() === UserType.EMPLOYEE
                      ? 1
                      : 3
                }
              />
              <Card
                title="Company"
                description="Register your business for exclusive access to our platform's features."
                icon={FaWarehouse}
                active={type.toUpperCase() === UserType.COMPANY}
                order={type.toUpperCase() === UserType.COMPANY ? 2 : 3}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
