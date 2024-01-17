"use client"

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';
import Head from 'next/head';
import { Button } from './ui/button';
import Search from './search';

const LeaveForm: React.FC = () => {
  const [employeeName, setEmployeeName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(startDate).toISOString();

  
      const response = await fetch('/api/submitLeave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeName, startDate: formattedStartDate, endDate:formattedEndDate, reason }),
      });
  
      if (response.ok) {
        toast.success('Leave form saved to the database succesfully', { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.error('Error saving form data to the database', { position: toast.POSITION.TOP_CENTER });

        console.error('Error saving form data to the database:', await response.json());
      }
    } catch (error) {

      console.error('Network error:', error);
    }
  };
  


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-700">
      <Head>
        <meta name="description" content="Leave Request Form" />
      </Head>
      <div className="w-full max-w-lg flex flex-col items-center">
        <main className="w-full p-8 bg-zinc-700 rounded shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Search/>
            <label htmlFor="employeeName">Employee Name:</label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"

            />

            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="reason">Reason:</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            ></textarea>

            <Button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Submit
            </Button>
          </form>
        </main>
      </div>
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
    </div>
  );
};

export default LeaveForm;