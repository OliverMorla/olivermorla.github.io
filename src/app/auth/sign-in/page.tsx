import { faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignIn = () => {
  return (
    <main className="h-screen bg-[--color-dark-gray] pt-[115px] pb-10 text-white px-10 flex justify-center items-center flex-col">
      <h1 className="font-bold text-4xl">This page is under construction</h1>
      <h1 className="text-7xl flex gap-4">
        404 Status /
        <FontAwesomeIcon icon={faTools} />
      </h1>
    </main>
  );
};

export default SignIn;
