"use client";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

function AddFamilyPage() {
  const [loading, setLoading] = useState(false);
  // get user data
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/api/get-users");
      setData(data);
    };
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      age: "",
      gender: "",
      fatherId: "",
      mother: "",
      profession: "",
      nid_number: "",
      present_address: "",
      permanent_address: "",
      siblingsIds: [],
    },
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
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });
  return (
    <div className="p-5 lg:p-20 bg-gradient-to-br from-[#e0f7fa] to-[#e8f5e9] h-screen overflow-auto flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-4 p-5 bg-white/70 backdrop-blur-md rounded-lg shadow-2xl shadow-[#e8f5e9] border border-white/20"
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
          <select
            name="fatherId"
            id=""
            onChange={formik.handleChange}
            value={formik.values.fatherId}
          >
            <option value="">Select Father of this person</option>
            {data?.map((item: any, i: number) => {
              return (
                item?.gender === "Male" && (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                )
              );
            })}
          </select>
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
        <select
          multiple
          name="siblingsIds"
          onChange={formik.handleChange}
          value={formik.values.siblingsIds}
          className="w-full"
        >
          <option value="">Select Siblings for this person</option>
          {data?.map((item: any, i: number) => (
            <option key={i} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 px-3 py-2 rounded-lg text-white font-semibold text-lg"
        >
          {loading ? "Submitting..." : "Add person"}
        </button>
      </form>
    </div>
  );
}

export default AddFamilyPage;
