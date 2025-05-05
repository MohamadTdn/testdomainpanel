import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Domain from "../Domain/Domain";
import axios from "axios";
import AddDomain from "../AddDomain/AddDomain";
import { useDispatch } from "react-redux";
import { getDomainsFromServer } from "../../redux/store/domains";

export default function Domains() {
  const [domains, setDomains] = useState([]);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [status, setStatus] = useState('-1')
  const [filteredDomains, setFilteredDomains] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get("https://6797aa2bc2c861de0c6d964c.mockapi.io/domain")
      .then((res) => {
        setDomains(res.data);
        setFilteredDomains(res.data)
      });
    dispatch(getDomainsFromServer('/https://6797aa2bc2c861de0c6d964c.mockapi.io/domain'))
  }, []);

  const closeHandler = () => {
    setAddMenuOpen(false)
  }

  // filter functions
  useEffect(() => {
    switch(status) {
      case "asc" : {
        let ascDomains = [...domains]
        setFilteredDomains(ascDomains)
        break;
      }
      case "desc" : {
        let descDomains  = [...domains].reverse()
        setFilteredDomains(descDomains)
        break;
      }
      case "active" : {
        let activeDomains = [...domains].filter(domain => {
          return domain.isActive === true
        })
        setFilteredDomains(activeDomains)
        break
      }
      case "not active" : {
        let notActiveDomains = [...domains].filter(domain => {
          return domain.isActive === false
        })
        setFilteredDomains(notActiveDomains)
        break
      }
      default : {
        setFilteredDomains([...domains])
      }
    }
  }, [status])

  // search functions
  useEffect(() => {
    const searchedList = [...domains].filter(domain => {
      return domain.domain.includes(searchValue)
    })

    setFilteredDomains(searchedList)
  }, [searchValue])

  return (
    <div className="Domains relative">
      <div className="app-header flex justify-between items-center">
        <button
          onClick={() => setAddMenuOpen(true)}
          className="add-domain-btn flex items-center justify-center gap-x-5 bg-blue-400 text-white p-3"
        >
          <span>
            <FaPlus />
          </span>
          <span>Add Domain</span>
        </button>
        <div className="flex gap-x-6">
          <select onChange={e => setStatus(e.target.value)} className="filters border border-gray-400 px-5 py-3">
          <option value="-1">Select An Filter</option>
            <option value="asc">Sort By ASC</option>
            <option value="desc">Sort By Desc</option>
            <option value="active">Sort By Active</option>
            <option value="not active">Sort By Not Active</option>
          </select>
          <form action="#" className="relative">
            <FaSearch className="absolute top-3 right-3 text-2xl" />
            <input
              type="search"
              className="border border-gray-400 px-5 py-3"
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </div>
      </div>
      {addMenuOpen ? <AddDomain closeMenuHandler={closeHandler} /> : null}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
          <thead className="border-b border-t border-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Domain URL
              </th>
              <th scope="col" className="px-6 py-3">
                Active Status
              </th>
              <th scope="col" className="px-6 py-3">
                Verification Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDomains.map((domain) => {
              return <Domain key={domain.id} {...domain} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
