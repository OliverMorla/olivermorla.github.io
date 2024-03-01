"use client";

import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CertificationCard = ({ title, institution }: CertificationCardProps) => {
  return (
    <div
      className="flex flex-col max-h-[400px] h-full justify-between p-2 items-center"
      style={{
        boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.4)",
      }}
    >
      <h1 className="font-bold text-4xl tracking-tighter text-center">
        {title}
      </h1>
      <FontAwesomeIcon
        icon={faCertificate}
        width={400}
        height={400}
        className="text-[--color-slate-gray] text-9xl"
      />
      <p className="font-bold text-2xl">{institution}</p>
    </div>
  );
};

export default CertificationCard;
