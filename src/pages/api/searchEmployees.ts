// pages/api/searchEmployees.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { query } = req.query;

    try {
      const employees = await prisma.employee.findMany({
        where: {
          name: {
            contains: query as string,
            mode: 'insensitive', // Case-insensitive search
          },
        },
        select: {
          id: true,
          name: true,
          leaves: {
            select: {
              startDate: true,
              endDate: true,
              reason: true,
            },
          },
        },
      });

      res.status(200).json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
