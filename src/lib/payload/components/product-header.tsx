"use client";

import { FC } from "react";
import Link from "next/link";
import { Payload } from "payload";
import { ArrowRight } from "lucide-react";
import "./styles/index.css";

const ProductHeader: FC<
  { payload: Payload } & {
    description: string;
  }
> = ({ payload, description, ...props }) => {
  return (
    <div className="header__wrapper">
      <p>{description}</p>
      <Link href="/inventory">
        <span>Products</span>
        <ArrowRight
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      </Link>
    </div>
  );
};

export default ProductHeader;
