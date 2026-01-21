import { prisma } from '@/lib/prisma'
import ServicesClient from './ServicesClient'

export default async function Services() {
    const services = await prisma.practiceArea.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        take: 6
    });

    return <ServicesClient services={services} />
}