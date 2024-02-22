"use client";

import { useEffect, useState } from "react";
import { LoadingWithBg } from "@/components/helpers/Loading";
import RepositoryCard from "@/components/ui/Cards/Repository";

const RepositoriesSection = () => {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/OliverMorla/repos"
        );
        const repos = await res.json();
        setData(repos);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingWithBg />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((repo: any, index: number) => (
            <RepositoryCard key={index} {...repo} />
          ))}
        </div>
      )}
    </>
  );
};

export default RepositoriesSection;
