"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FatherChildGraph from "./components/FatherChildGraph";
import buildNestedChildren from "@/utils/buildNestedChildren";
import { useRouter } from "next/navigation";

function FamilyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/api/user-tree");
      const formattedData = buildNestedChildren(data);
      setData(formattedData);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {data && !loading && <FatherChildGraph data={data} />}

      {/* add person button */}
      <button
        onClick={() => router.push("/add-person")}
        className="bg-green-500 fixed top-5 right-5 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Person
      </button>
    </div>
  );
}

export default FamilyPage;
