"use client";
import React from "react";
import { useSession } from "next-auth/react";
function page() {
  const { data } = useSession();
  return <div>{JSON.stringify(data?.user)}</div>;
}
