import { NextRequest, NextResponse } from 'next/server';
import { BlogStatus, PaymentStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/getUser';

export async function GET(request: NextRequest) {
    try {
        // Get logged-in user
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
        }

        const userId = user.id;

        // Parallelize all independent database queries
        const [
            blogsByStatus,
            recentBlogs,
            appointmentsByStatus,
            upcomingAppointments,
            paymentStats,
            recentPayments,
        ] = await Promise.all([
            // Blog status counts with groupBy (replaces 5 separate queries)
            prisma.blog.groupBy({
                by: ['status'],
                where: { authorId: userId },
                _count: { status: true },
            }),
            // Recent blogs
            prisma.blog.findMany({
                where: { authorId: userId },
                orderBy: { createdAt: 'desc' },
                take: 5,
            }),
            // Appointment status counts
            prisma.appointment.groupBy({
                by: ['status'],
                where: { userId },
                _count: { status: true },
            }),
            // Upcoming appointments
            prisma.appointment.findMany({
                where: {
                    userId,
                    slot: { date: { gte: new Date() } },
                },
                orderBy: { slot: { date: 'asc' } },
                include: {
                    slot: true,
                    appointmentType: true,
                },
                take: 5,
            }),
            // Payment stats with groupBy and aggregate combined
            prisma.payment.groupBy({
                by: ['status'],
                where: { userId },
                _count: { status: true },
                _sum: { amount: true },
            }),
            // Recent payments
            prisma.payment.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                include: {
                    service: true,
                    appointment: { include: { appointmentType: true } },
                },
                take: 5,
            }),
        ]);

        // Calculate blog totals from groupBy result
        const totalBlogs = blogsByStatus.reduce((sum, group) => sum + group._count.status, 0);
        const approvedBlogs = blogsByStatus.find(g => g.status === BlogStatus.APPROVED)?._count.status || 0;
        const pendingBlogs = blogsByStatus.find(g => g.status === BlogStatus.PENDING)?._count.status || 0;
        const rejectedBlogs = blogsByStatus.find(g => g.status === BlogStatus.REJECTED)?._count.status || 0;
        const draftBlogs = blogsByStatus.find(g => g.status === BlogStatus.DRAFT)?._count.status || 0;

        // Calculate appointment total from groupBy result
        const totalAppointments = appointmentsByStatus.reduce((sum, group) => sum + group._count.status, 0);

        // Calculate payment totals from groupBy result
        const totalPayments = paymentStats.reduce((sum, group) => sum + group._count.status, 0);
        const totalSpent = paymentStats
            .filter(g => g.status === PaymentStatus.SUCCESS)
            .reduce((sum, group) => sum + Number(group._sum.amount || 0), 0);

        // --- RETURN OVERVIEW JSON ---
        return NextResponse.json({
            blogs: {
                total: totalBlogs,
                approved: approvedBlogs,
                pending: pendingBlogs,
                rejected: rejectedBlogs,
                draft: draftBlogs,
                recent: recentBlogs,
            },
            appointments: {
                total: totalAppointments,
                byStatus: appointmentsByStatus,
                upcoming: upcomingAppointments,
            },
            payments: {
                total: totalPayments,
                byStatus: paymentStats.map(p => ({ status: p.status, _count: { status: p._count.status } })),
                totalSpent,
                recent: recentPayments,
            },
        });
    } catch (error) {
        console.error('User Dashboard API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
