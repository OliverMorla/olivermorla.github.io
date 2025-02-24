import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CertificationCard = ({
  title,
  institution,
}: {
  title: string;
  institution: string;
}) => {
  return (
    <div
      className="flex flex-col flex-grow h-full justify-between p-2 items-center max-h-[450px] min-h-[450px] max-sm:max-w-[300px]"
      style={{
        boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.4)",
      }}
    >
      <h1 className="font-bold text-4xl max-sm:text-2xl tracking-tighter text-center">
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
