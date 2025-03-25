// "use client";
// import Button from "@/components/controls/Button";
// import Input from "@/components/controls/Input";
// import Select from "@/components/controls/Select";
// import MainLayout from "@/components/main.layout";
// import { BaseResponse } from "@/model/base.response.model";
// import http from "@/utils/axios.service";
// import { Form, Formik } from "formik";
// import {  CheckCircle, Edit, Eye, Hash, LucideIcon, Mail, MapPin, MoreVertical, Phone, Plus, Trash, XCircle } from "lucide-react";
// import { useEffect, useState, useRef, useCallback } from "react";
// import { debounce } from "lodash";
// import Modal from "@/components/modal";
// import { BranchModal } from "@/model/branch/branch.model";
// import ConfirmationDialog from "@/components/confirmationDialog";
// import SaveBranch from "./saveBranch";
// import { Guid } from "guid-typescript";
// import { StatusEnum } from "@/enum/status.enum";

// export default function Branches() {
//   const [formValues, setFormValues] = useState({ status: 0, search: "" });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [branches, setBranches] = useState<BranchModal[]>([]);
//   const [selectedBranchId, setSelectedBranchId] = useState<string>('');

//   // Optimized API call with debouncing
//   const fetchBranches = useCallback(
//     debounce(async (status: number, search: string) => {
//       try {
//         const response = await http.get<BaseResponse<BranchModal[]>>("branch", { status, search });
//         setBranches(response.isSuccess ? response.data : []);
//       } catch (error) {
//         console.error(error);
//       }
//     }, 500),
//     []
//   );

//   useEffect(() => {
//     fetchBranches(formValues.status, formValues.search);
//     return () => fetchBranches.cancel();
//   }, [formValues, fetchBranches]);

//   const handleOpenModal = (id: string) => {
//     setSelectedBranchId(id);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     fetchBranches(formValues.status, formValues.search);
//   };

//   return (
//     <MainLayout title="Branches">
//       <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedBranchId != Guid.EMPTY ? "Edit Branch" : "Add New Branch"}>
//         <SaveBranch id={selectedBranchId || undefined} onClose={handleCloseModal} />
//       </Modal>

//       {/* Filter Section */}
//       <div className="w-full h-20 bg-white rounded-lg shadow-lg flex items-center justify-between gap-3 p-5 sticky top-0 z-10">
//         <Button variant="primary" size="small" onClick={() => handleOpenModal(Guid.EMPTY)}>
//           <Plus /> Add New
//         </Button>

//         <Formik initialValues={formValues} onSubmit={() => {}}>
//           {({ values, setFieldValue, handleChange }) => (
//             <Form className="flex gap-2">
//               <Select
//                 name="status"
//                 options={[
//                   { id: 0, name: "All" },
//                   { id: 1, name: "Active" },
//                   { id: 2, name: "Inactive" },
//                 ]}
//                 value={values.status}
//                 onChange={(e) => {
//                   setFieldValue("status", +e);
//                   setFormValues((prev) => ({ ...prev, status: +e }));
//                 }}
//                 groupClassName=""
//                 selectClassName="w-[100px]"
//               />
//               <Input
//                 placeholder="Search ..."
//                 name="search"
//                 type="search"
//                 value={values.search}
//                 onChange={(e) => {
//                   handleChange(e);
//                   setFormValues((prev) => ({ ...prev, search: e.target.value }));
//                 }}
//                 groupClassName=""
//               />
//             </Form>
//           )}
//         </Formik>
//       </div>

//       {/* Branch Cards */}
//       <div className="bg-gray-100 flex-1 overflow-hidden">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//           {branches.map((branch) => (
//             <BranchCard
//               key={branch.id.toString()}
//               data={branch}
//               fetchData={() => fetchBranches(formValues.status, formValues.search)}
//               onEdit={() => handleOpenModal(branch.id)}
//             />
//           ))}
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// // BranchCard Component
// const BranchCard: React.FC<{ data: BranchModal; fetchData: () => void; onEdit: () => void }> = ({ data, fetchData, onEdit }) => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [showConfirmation, setConfirmation] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleDelete = async () => {
//     try {
//       await http.delete(`branch/${data.id}`);
//       fetchData();
//       setIsDeleteDialogOpen(false);
//     } catch (error) {
//       console.error("Failed to delete:", error);
//     }
//   };

//   return (
//     <>
//       <ConfirmationDialog
//         isOpen={isDeleteDialogOpen}
//         title="Delete Branch?"
//         message={`Are you sure you want to delete "<b>${data.name}</b>" permanently?`}
//         yesText="Delete"
//         noText="Cancel"
//         onYes={handleDelete}
//         onNo={() => setIsDeleteDialogOpen(false)}
//       />

//          <ConfirmationDialog
//         isOpen={isDeleteDialogOpen}
//         title="Delete Branch?"
//         message={`Are you sure you want to delete "<b>${data.name}</b>" permanently?`}
//         yesText="Delete"
//         noText="Cancel"
//         onYes={handleDelete}
//         onNo={() => setIsDeleteDialogOpen(false)}
//       />

//       <div className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 relative">
//         <div className="absolute top-3 right-3">
//           <button className="text-gray-600 hover:text-black" onClick={() => setDropdownOpen(!isDropdownOpen)}>
//             <MoreVertical className="w-5 h-5" />
//           </button>

//           {isDropdownOpen && (
//             <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//               <ul className="py-2 text-sm text-gray-700">
//                 <DropdownItem icon={Eye} label="View" onClick={() => alert(`Viewing ${data.name}`)} className={"text-green-500 hover:text-green-600"} />
//                 <DropdownItem icon={Edit} label="Edit" onClick={onEdit} className={"text-blue-500 hover:text-blue-600"} />
//                 <DropdownItem icon={Trash} label="Delete" onClick={() => setIsDeleteDialogOpen(true)} className={'text-red-500 hover:text-red-600'} />
//                 {data.status == StatusEnum.Inactive && 
//                 <DropdownItem icon={CheckCircle} label="Active" onClick={() => setIsDeleteDialogOpen(true)} className={'text-red-500 hover:text-red-600'} />
//                 }
//                 {data.status == StatusEnum.Active && 
//                 <DropdownItem icon={XCircle} label="InActive" onClick={() => setIsDeleteDialogOpen(true)} className={'text-red-500 hover:text-red-600'} />
//                 }
//               </ul>
//             </div>
//           )}
//         </div>

//         <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//           <Hash className="w-5 h-5 text-gray-500" /> {data.name}
//         </h2>
//         <p className="text-gray-600 flex items-center gap-2 mt-2">
//           <MapPin className="w-5 h-5 text-gray-500" /> {data.location}
//         </p>

//         <div className="mt-4 space-y-3">
//           <p className="text-sm text-gray-500 flex items-center gap-2">
//             <Phone className="w-5 h-5" /> {data.contact}
//           </p>
//           <p className="text-sm text-gray-500 flex items-center gap-2 break-all">
//             <Mail className="w-5 h-5" /> {data.email}
//           </p>
//           <p className="text-sm text-gray-500 flex items-center gap-2">
//             <Hash className="w-5 h-5" /> {data.code}
//           </p>
//         </div>

//         <div className="mt-5 flex items-center gap-2">
//           {data.status === 1 ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
//           <span className={`px-3 py-1 text-sm font-medium rounded-full ${data.status === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//             {data.status === 1 ? "Active" : "Inactive"}
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };

// // DropdownItem Component
// const DropdownItem: React.FC<{ className:string,icon: LucideIcon; label: string; onClick: () => void }> = ({ className,icon: Icon, label, onClick }) => (
//   <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer" onClick={onClick}>
//     <Icon className={'w-4 h-4 '+className} /> {label}
//   </li>
// );

