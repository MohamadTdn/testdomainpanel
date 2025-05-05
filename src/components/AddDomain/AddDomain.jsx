import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function AddDomain({ closeMenuHandler }) {
  const [domain, setDomain] = useState("");

  const addDomain = () => {
    let validationRegex =
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

    if (domain === "") {
      Swal.fire({
        title: "Field is Empty",
        icon: "error",
        showCloseButton: true,
      });
    } else if (!validationRegex.test(domain)) {
      Swal.fire({
        title: "Value is not valid",
        icon: "error",
        showCloseButton: true,
      });
    } else {
      axios
        .post(
          "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
          {
            isActive: true,
            createdDate: 1737992850,
            domain: domain,
            status: "pending",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              title: "Domain Added Successfully",
              icon: "success",
              showCloseButton: true,
            }).then(value => {
              if (value.isConfirmed) {
                setDomain('')
              }
            })
          }
        });
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen w-[900px] visible opacity-100 fixed right-0 top-0 z-30 p-5 transition-all">
        <h3 className="text-3xl">Add Domain</h3>
        <form className="mt-3" action="#">
          <input
            type="text"
            className="border border-gray-400 w-[95%] p-3"
            placeholder="Ex https://google.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </form>
        <div className="flex gap-x-4 fixed bottom-5 right-4">
          <button
            onClick={closeMenuHandler}
            className="py-3 px-5 bg-white border border-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={addDomain}
            className="py-3 px-5 bg-blue-500 text-white"
          >
            Add
          </button>
        </div>
      </div>
      <div className="overlay bg-black/50 h-full w-full fixed visible opacity-100 right-0 left-0 top-0 transition-all"></div>
    </>
  );
}
