"use client";
import React from "react";
import { useSession } from "next-auth/react";
function page() {
  const { data } = useSession();
  console.log(data);
  return <div>{JSON.stringify(data?.user)}</div>;
}

export default page;
