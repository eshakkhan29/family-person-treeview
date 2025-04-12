"use client";
import DataComboBox from "@/components/DataComboBox";
import Loader from "@/components/Loader/Loader";
import UserInfo from "@/components/UserInfo";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

function AddFamilyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // get user data
  const [data, setData] = useState<any>([]);
  const [selectedPerson, setSelectedPerson] = useState<any>({});
  const [selectedSiblings, setSelectedSiblings] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/api/get-users");
      setData(data);
    };
    getData();
  }, []);

  const formattedPersonData = data?.map((person: any) => ({
    id: person?.id,
    name: person?.name,
    phone: person?.phone,
    image: person?.image,
  }));

  const onlyMalePersonData = data
    ?.filter((person: any) => person.gender === "Male")
    ?.map((person: any) => ({
      id: person?.id,
      name: person?.name,
      phone: person?.phone,
      image: person?.image,
    }));

  const handleFatherSelect = (value: any) => {
    if (value?.id) {
      setSelectedPerson(value);
    }
  };

  const handleSiblingsSelect = (value: any) => {
    const isAlreadySelected = selectedSiblings?.some(
      (sibling: any) => sibling?.id === value?.id
    );
    if (value?.id && !isAlreadySelected) {
      setSelectedSiblings((prev: any) => [...prev, value]);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      age: "",
      gender: "",
      fatherId: selectedPerson?.id || "",
      mother: "",
      profession: "",
      nid_number: "",
      present_address: "",
      permanent_address: "",
      siblingsIds: selectedSiblings?.map((sibling: any) => sibling?.id) || [],
    },
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      const finalValue = {
        ...values,
        fatherId: parseInt(values.fatherId),
        siblingsIds: values?.siblingsIds?.map((id: any) => parseInt(id)),
      };
      try {
        setLoading(true);
        await axios.post("http://localhost:3000/api/create-person", finalValue);
        setLoading(false);
        formik.resetForm();
        router.push("/family-tree");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });
  return (
    <div className="p-5 lg:p-20 bg-[url('/bg.svg')] bg-no-repeat bg-center bg-cover h-screen overflow-auto flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-4 p-5 bg-white/20 backdrop-blur-md rounded-2xl shadow-sm shadow-[#e8f5e9] border border-white/20"
      >
        <div className="flex flex-col lg:flex-row items-center gap-5">
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Name"
          />
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            placeholder="Mobile number"
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-5">
          <input
            type="number"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            placeholder="Age"
          />

          <input
            type="text"
            name="profession"
            onChange={formik.handleChange}
            value={formik.values.profession}
            placeholder="Profession"
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-5">
          <input
            type="number"
            name="nid_number"
            onChange={formik.handleChange}
            value={formik.values.nid_number}
            placeholder="NID number"
          />
        </div>
        <input
          type="text"
          name="mother"
          onChange={formik.handleChange}
          value={formik.values.mother}
          placeholder="Mother name"
        />
        <div className="flex flex-col lg:flex-row items-center gap-5">
          <select
            name="gender"
            id=""
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <option value="">Select gender</option>
            <option value="Male">MALE</option>
            <option value="Female">FEMALE</option>
          </select>
          {/* ================================ */}
          <div className="w-full">
            <DataComboBox
              noIcon
              values={onlyMalePersonData || []}
              setSelect={handleFatherSelect}
              placeholder="Search Father of this person"
              setComponet={(person: any) => (
                <div className="cursor-pointer w-full">
                  <UserInfo
                    name={person?.name}
                    email={person?.phone}
                    image={person?.image}
                  />
                </div>
              )}
            />
          </div>
          {/* ================================ */}
        </div>

        <textarea
          name="present_address"
          onChange={formik.handleChange}
          value={formik.values.present_address}
          placeholder="Present address"
        />
        <textarea
          name="permanent_address"
          onChange={formik.handleChange}
          value={formik.values.permanent_address}
          placeholder="Permanent address"
        />
        {/* select with multiple */}

        {/* ===================================== */}
        <div className="w-full">
          <DataComboBox
            noIcon
            values={formattedPersonData || []}
            setSelect={handleSiblingsSelect}
            placeholder="Search Siblings of this person"
            setComponet={(person: any) => (
              <div className="cursor-pointer w-full">
                <UserInfo
                  name={person?.name}
                  email={person?.phone}
                  image={person?.image}
                />
              </div>
            )}
          />
        </div>
        {/* selected siblings list */}
        <div className="flex flex-wrap gap-2">
          {selectedSiblings?.map((item: any, i: number) => (
            <div
              key={i}
              className="py-1.5 px-2 bg-gray-200 rounded-md flex items-center gap-2"
            >
              <UserInfo
                name={item?.name}
                email={item?.phone}
                image={item?.image}
              />
              <button
                className="shrink-0 text-gray-500 hover:text-red-500 text-2xl cursor-pointer"
                onClick={() => {
                  setSelectedSiblings(
                    selectedSiblings?.filter(
                      (person: any) => person?.id !== item?.id
                    )
                  );
                }}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
        {/* ===================================== */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 px-3 py-2 rounded-lg text-white font-semibold text-lg flex items-center justify-center"
        >
          {loading ? <Loader classNames="text-white" /> : "Add person"}
        </button>
      </form>
    </div>
  );
}

export default AddFamilyPage;
