"use client";
import useFetch from "@/hooks/useFetch";
import { LoadingWithBg } from "@/components/helpers/Loading";
import RepositoryCard from "@/components/ui/Cards/Repository";

const RepositoriesData = () => {
  const { loading, response, error } = useFetch(
    "https://api.github.com/users/OliverMorla/repos"
  );

  return (
    <>
      {loading ? (
        <LoadingWithBg />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {response &&
            response.map((repo: any, index: number) => (
              <RepositoryCard key={index} {...repo} />
            ))}
        </div>
      )}
    </>
  );
};

export default RepositoriesData;
