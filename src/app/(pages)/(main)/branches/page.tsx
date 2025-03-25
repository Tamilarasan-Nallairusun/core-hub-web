"use client";
import Button from "@/components/controls/Button";
import Input from "@/components/controls/Input";
import Select from "@/components/controls/Select";
import DropdownMenu, { DropdownOption } from "@/components/dropdown";
import MainLayout from "@/components/main.layout";
import { BaseResponse } from "@/model/base.response.model";
import { BranchModal } from "@/model/branch/branch.model";
import http from "@/utils/axios.service";
import { Form, Formik } from "formik";
import { debounce } from "lodash";
import {
  CheckCircle,
  Edit,
  Hash,
  Mail,
  MapPin,
  Phone,
  Plus,
  Share2,
  Trash2,
  XCircle,
} from "lucide-react";
import {  useCallback, useEffect, useState } from "react";

export default function Branches() {
  const [branches, setBranches] = useState<Array<BranchModal>>([]);
  return (
    <MainLayout title="Branches">
      <BranchFilter setBranches={setBranches} />
      <BranchList branches={branches} />
    </MainLayout>
  );
}

function BranchList({ branches }: { branches: Array<BranchModal> }) {
  return (
    <div className="bg-gray-100 flex-1 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {branches.map((branch, index) => (
          <BranchCard key={index} data={branch} />
        ))}
      </div>
    </div>
  );
}

const BranchCard: React.FC<{ data: BranchModal }> = ({ data }) => {
  const menuOptions:DropdownOption[]= [
    {
      label: "Edit",
      icon: <Edit className="w-4 h-4" />,
      onClick: () => alert("Edit clicked"),
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-4 h-4 text-red-500" />,
      onClick: () => alert("Delete clicked"),
    },
    {
      label: "Share",
      icon: <Share2 className="w-4 h-4" />,
      onClick: () => alert("Share clicked"),
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 relative">
      <div className="absolute top-3 right-3">
        <DropdownMenu options={menuOptions} />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Hash className="w-5 h-5 text-gray-500" /> {data.name}
      </h2>
      <p className="text-gray-600 flex items-center gap-2 mt-2">
        <MapPin className="w-5 h-5 text-gray-500" /> {data.location}
      </p>

      <div className="mt-4 space-y-3">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Phone className="w-5 h-5" /> {data.contact}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2 break-all">
          <Mail className="w-5 h-5" /> {data.email}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Hash className="w-5 h-5" /> {data.code}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {data.status === 1 ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            data.status === 1
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {data.status === 1 ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
};

function BranchFilter({
  setBranches,
}: {
  setBranches: (branches: Array<BranchModal>) => void;
}) {
  const [formValues, setFormValues] = useState({ status: 0, search: "" });

  const fetchBranches = useCallback(
    debounce(async (status: number, search: string) => {
      try {
        const response = await http.get<BaseResponse<BranchModal[]>>("branch", {
          status,
          search,
        });
        setBranches(response.isSuccess ? [...response.data,...response.data,...response.data,...response.data] : []);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchBranches(formValues.status, formValues.search);
  }, [formValues]);
  return (
    <div className="w-full h-20 bg-white rounded-lg shadow-lg flex items-center justify-between gap-3 p-5 sticky top-0 z-10">
      <Button
        variant="primary"
        size="small"
        onClick={() => alert("Add New Clicked")}
      >
        <Plus /> Add New
      </Button>

      <Formik initialValues={formValues} onSubmit={() => {}}>
        {({ values, setFieldValue, handleChange }) => (
          <Form className="flex gap-2">
            <Select
              focus
              name="status"
              options={[
                { id: 0, name: "All" },
                { id: 1, name: "Active" },
                { id: 2, name: "Inactive" },
              ]}
              value={values.status}
              onChange={(e) => {
                setFieldValue("status", +e);
                setFormValues((prev) => ({ ...prev, status: +e }));
              }}
              selectClassName="w-[100px]"
            />
            <Input
              placeholder="Search ..."
              name="search"
              type="search"
              value={values.search}
              onChange={(e) => {
                handleChange(e);
                setFormValues((prev) => ({ ...prev, search: e.target.value }));
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
