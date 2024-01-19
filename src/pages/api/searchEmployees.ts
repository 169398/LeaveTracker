// pages/api/searchEmployees.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { name } = req.query;

    try {
      const employees = await prisma.employee.findMany({
        where: {
          name: {
            contains: name as string,
          },
        },
        include: {
          leaves: {
            select: {
              id: true,
              startDate: true,
              endDate: true,
              reason: true,
            },
          },
        },
      });
      const response = employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        position: employee.position,
        leaves: employee.leaves.map((leave) => ({
          startDate: leave.startDate.toISOString(),
          endDate: leave.endDate.toISOString(),
          reason: leave.reason,
        })),
      }));
      
      res.status(200).json(response);
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error searching employees:', error);
      res.status(500).json({ error: 'Error searching employees' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

/*
// pages/api/searchEmployees.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

interface LeaveData {
  startDate: string;
  endDate: string;
  reason: string;
  status: string; // Adjust the type to match your enum
}

interface Employee {
  id: number;
  name: string;
  position: string;
  leaves: LeaveData[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { name } = req.query;

    try {
      const employees = await prisma.employee.findMany({
        where: {
          name: {
            contains: name as string,
          },
        },
        include: {
          leaves: {
            select: {
              startDate: true,
              endDate: true,
              reason: true,
              status: true,
            },
          },
        },
      });

      const response: Employee[] = employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        position: employee.position,
        leaves: employee.leaves.map((leave) => ({
          startDate: leave.startDate.toISOString(),
          endDate: leave.endDate.toISOString(),
          reason: leave.reason,
          status: leave.status,
        })),
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error('Error searching employees:', error);
      res.status(500).json({ error: 'Error searching employees' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
*/