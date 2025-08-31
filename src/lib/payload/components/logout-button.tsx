"use client";
import Link from "next/link";
import { Payload } from "payload";
import { LogOut } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import "./styles/index.css";

const LogOutButton: FC<
  { payload: Payload } & HTMLAttributes<HTMLDivElement>
> = ({ payload, ...props }) => {
  return (
    <div className="logout__button__wrapper">
      <Link href={"/"} className="dashboard__button">
        Home
      </Link>
      <Link href={"/admin/logout"}>
        <LogOut className="logout__button" />
      </Link>
    </div>
  );
};

export default LogOutButton;
