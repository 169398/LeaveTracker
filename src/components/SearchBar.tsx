/*
"use client"

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
}
interface Employee {
  name: string;
}

interface LeaveDetails {
  employee: Employee;
  startDate: string;
  endDate: string;
  reason: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) =>{
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [leaveDetails, setLeaveDetails] = useState<LeaveDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/searchEmployees?name=${searchQuery}`);
      setLeaveDetails(response.data); // Update this line
    } catch (error) {
      setLeaveDetails(null);
      setError('Employee not found. Please check the name and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (errorRef.current && !errorRef.current.contains(event.target as Node)) {
        setError(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [errorRef]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter employee name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '10px' }}
        disabled={loading}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
  
      {error && (
        <p ref={errorRef} style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {leaveDetails && leaveDetails.employee && (
        <div>
          <h2>{leaveDetails.employee.name}</h2>
          <p>Leave Start Date: {leaveDetails.startDate}</p>
          <p>Leave End Date: {leaveDetails.endDate}</p>
          <p>Reason: {leaveDetails.reason}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
*/