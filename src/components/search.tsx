
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Leaf } from "react-select/src/types";

interface Employee {
    id: string;
    name: string;
    leaveData?: {
      startDate: string;
      endDate: string;
      reason: string;
    }[];
  }


const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleSearch = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.get<Employee[]>(`/api/searchEmployees?name=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        toast.error("Error searching employees", { position: toast.POSITION.TOP_CENTER });
        setError("Error searching employees");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search employee..."
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
        {error && <div>Error: {error}</div>}
        {isLoading && <div>Loading...</div>}
        {searchResults.length > 0 && (
  <div className="bg-zinc-700 p-4 rounded shadow-lg mt-4">
    <h2 className="text-xl font-bold mb-2">Search Results:</h2>
    <ul>
      {searchResults.map((employee) => (
        <li key={employee.id}>
          <h3 className="text-lg font-semibold">{employee.name}</h3>
          {employee.leaveData && employee.leaveData.length > 0 ? (
            <p>
              {employee.name} is on leave that ends on {employee.leaveData[0].endDate}.
            </p>
          ) : (
            <p>{employee.name} is  on   a leave.</p>
          )}
          <hr />
        </li>
      ))}
    </ul>
  </div>
)}


      </div>
    );
  };
  
  export default Search;  