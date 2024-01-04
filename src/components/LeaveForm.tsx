"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import { ModeToggle } from '@/components/Theme';
import { Button } from './ui/button';

const LeaveForm: React.FC = () => {
  // State for form fields
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { startDate, endDate, reason });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ModeToggle />
      <Head>
        <title>Leave Request Form</title>
        <meta name="description" content="Leave Request Form" />
      </Head>

      <main className="w-full max-w-lg p-8 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Leave Request Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
  );
};

export default LeaveForm;
