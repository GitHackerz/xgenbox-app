"use client";

import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import Webcam from "react-webcam";
import { createBinAction } from "@/actions/binActions";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";

function Scan() {
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data.length > 0) {
      try {
        const jsonData = JSON.parse(data);
        jsonData.user = user?._id;
        jsonData.type = "THROW";
        createBinAction(jsonData).then(() => {
          setMessage("Bin action created successfully");
          setTimeout(() => {
            setMessage("");
            setData("");
            router.push("/dashboard/collection/history");
          }, 2000);
        });
      } catch (e) {
        setMessage("Invalid QR code");
        setTimeout(() => {
          setMessage("");
          setData("");
        }, 2000);
      }
    }
  }, [data, router, user?._id]);

  if (!user) return null;
  return (
    <div
      className={"flex flex-col items-center justify-center h-screen relative"}
    >
      <Webcam
        width={"50%"}
        style={{
          transform: "scaleX(-1)",
          filter: "FlipH",
        }}
      />

      <QrReader
        onResult={(result: any, error: any) => {
          if (result) {
            setData(result.text);
          }

          if (error) {
            console.info(error);
          }
        }}
        constraints={{ facingMode: "environment" }}
      />

      {message && (
        <p className="text-xl absolute bg-blue-300 text-blue-700 px-3 py-1 rounded-full">
          {message}
        </p>
      )}
    </div>
  );
}

export default Scan;
