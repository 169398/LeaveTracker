

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { startDate, endDate, reason, employeeName } = req.body;
    console.log('Form data:', { startDate, endDate, reason, employeeName });

    try {
      // Create an employee with the provided name
      const employee = await prisma.employee.create({
        data: {
          name: employeeName, // Provide the employee name
          position: 'Some Default Position',
        },
      });

      const leave = await prisma.leave.create({
        data: {
          startDate,
          endDate,
          reason,
          employeeId: employee.id,
        },
      });

      res.status(201).json({ success: true, leave });
    } catch (error) {
      console.error('Error creating leave request:', error);
      res.status(500).json({ success: false, error: 'Failed to create leave request' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
