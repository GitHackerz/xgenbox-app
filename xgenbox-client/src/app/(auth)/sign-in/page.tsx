import React from "react";
import Link from "next/link";
import Image from "next/image";
import SigninForm from "@/components/auth/signin-form";
import { FaUser } from "react-icons/fa";

const Card = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <Link
    href={`/sign-up/${title.toLowerCase()}`}
    className="w-[95%] hover:w-full border border-white rounded-xl py-5 px-4 inline-flex gap-4 items-center hover:bg-zinc-200 hover:text-zinc-700 ease-in duration-200"
  >
    <Icon className="h-6 w-6" />
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold ">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  </Link>
);

export default function SigninPage() {
  return (
    <main>
      <div className="h-screen container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 duration-300">
        <div className="bg-zinc-900 hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="relative z-20 flex items-center text-lg font-medium">
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
                Welcome to XGenBox
              </h1>
              <p className={"text-sm text-zinc-300 text-center"}>
                Register now to access exclusive features and personalized
                content.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 w-full px-4">
              <Card
                title="Citizen"
                description="Register now to access exclusive features and personalized content."
                icon={FaUser}
              />
              <Card
                title="Collector"
                description="Register now to discover, collect, and manage your personalized collections."
                icon={FaUser}
              />
              <Card
                title="Company"
                description="Register your business for exclusive access to our platform's features."
                icon={FaUser}
              />
            </div>
          </div>
        </div>

        <div className="lg:p-8 h-full">
          <div className="h-full  mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl tracking-tight capitalize font-medium">
                Sign in to your{" "}
                <span className="font-bold ">citizen account</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                {"Don't have an account?"}
                <Link
                  href={"/sign-up/citizen"}
                  className="text-primary font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
            {/*<UserAuthForm />*/}
            <SigninForm />
          </div>
        </div>
      </div>
    </main>
  );
}
