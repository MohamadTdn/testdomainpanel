import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaDotCircle, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import Swal from "sweetalert2";

export default function Domain({ id, domain, isActive, status, createdDate }) {
  const editDomain = (domainID) => {
    Swal.fire({
      title: "New Domain Name",
      text: "Enter New Domain Name:",
      input: "text",
    }).then((value) => {
      if (value.isConfirmed) {
        axios
          .put(
            `https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${domainID}`,
            {
              isActive: true,
              domain: value.value,
            },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "domain edited successfully",
                icon: "success",
                showConfirmButton: true,
              });
            }
          });
      }
    });
  };

  const deleteDomain = (domainID) => {
    Swal.fire({
      title: "Do You want to delete",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((value) => {
      if (value.isConfirmed) {
        axios
          .delete(
            `https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${domainID}`
          )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Domain Deleted Successfully",
                icon: "success",
                showCloseButton: true,
              });
            }
          });
      }
    });
  };

  return (
    <>
      <tr className="text-black border-t border-b border-gray-400">
        <th
          scope="row"
          className="flex items-center gap-x-4 px-6 py-4 font-medium whitespace-nowrap"
        >
          <span>
            {isActive ? (
              <FaDotCircle className="text-green-600" />
            ) : (
              <TiDeleteOutline className="text-red-500 text-xl" />
            )}
          </span>
          <span>{domain}</span>
          <span>
            <FaArrowUpRightFromSquare className="text-gray-400" />
          </span>
        </th>
        {isActive ? (
          <td className="px-6 py-4 text-green-500">Active</td>
        ) : (
          <td className="px-6 py-4 text-red-500">Not Active</td>
        )}
        {status === "verified" ? (
          <td className="px-6 py-4 text-green-500">Verified</td>
        ) : status === "pending" ? (
          <td className="px-6 py-4 text-gray-500">Pending</td>
        ) : (
          <td className="px-6 py-4 text-red-500">Rejected</td>
        )}
        <td className="px-6 py-4 flex text-xl items-center gap-x-2">
          <FaEdit onClick={() => editDomain(id)} className="text-blue-600" />
          <MdDelete onClick={() => deleteDomain(id)} className="text-red-600" />
        </td>
      </tr>
    </>
  );
}
