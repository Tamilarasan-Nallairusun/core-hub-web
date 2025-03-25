"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@/components/controls/Button";
import Input from "@/components/controls/Input";
import { Guid } from "guid-typescript";
import { BranchModal } from "@/model/branch/branch.model";
import http from "@/utils/axios.service";
import { BaseResponse } from "@/model/base.response.model";

interface Props {
  id?: Guid |string;
  onClose?: () => void;  // Callback function to close the modal after saving
  fetchData?: () => void;  // Callback function to refresh the branch list
}

const SaveBranch: React.FC<Props> = ({ id, onClose, fetchData }) => {
  const [branch, setBranch] = useState<BranchModal>(new BranchModal());
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch branch data if ID is provided (Edit mode)
  useEffect(() => {
    if (id != Guid.EMPTY) {
      setLoading(true);
      http.get<BaseResponse<BranchModal>>(`branch/${id}`)
        .then((response) => {
          if (response.isSuccess && response.data) {
            setBranch(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching branch:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Branch name is required"),
    code: Yup.string().required("Branch code is required"),
    location: Yup.string().required("Location is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid phone number")
      .required("Contact number is required"),
  });

  const handleSubmit = async (values: BranchModal) => {
    try {
 
        if(values.id ==''){
          values.id  = Guid.EMPTY;
        }
    const response = await http.post<BaseResponse<BranchModal>>("branch", values);

      if (response.isSuccess) {
        alert(id ? "Branch updated successfully!" : "Branch added successfully!");
        if (onClose) onClose();  // Close the modal
        if (fetchData) fetchData();  // Refresh the branch list
      } else {
        console.error("Failed to save branch:", response);
        alert("Failed to save branch.");
      }
    } catch (error) {
      console.error("Error saving branch:", error);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Formik
          initialValues={branch}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input name="name" label="Branch Name"  placeholder="Branch Name"  />
              <Input name="code" label="Branch Code" placeholder="Branch Code" />
              <Input name="location" label="Location" placeholder="Location" />
              <Input name="email" label="Email"  placeholder="Email" />
              <Input name="contact" label="Contact" placeholder="Contact" />

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex justify-end">
                <Button size="small" type="submit" loading={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SaveBranch;
