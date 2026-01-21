import { NextRequest, NextResponse } from 'next/server';
import { PaymentStatus, UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/getUser';

export async function GET(request: NextRequest) {
    try {
        // Get current logged-in user
        const user = await getUser();
        if (!user || user.role !== UserRole.ADMIN) {
            return NextResponse.json(
                { error: 'Access Denied. Admins only.' },
                { status: 403 }
            );
        }

        // Parse query params for section split
        const { searchParams } = new URL(request.url);
        const section = searchParams.get('section') || 'all'; // 'stats' | 'recent' | 'all'

        let totalUsers = 0, adminUsers = 0, normalUsers = 0;
        let totalBlogs = 0, blogsByStatus: any[] = [], recentBlogs: any[] = [];
        let totalAppointments = 0, appointmentsByStatus: any[] = [], upcomingAppointments: any[] = [];
        let totalServices = 0, recentServices: any[] = [];
        let totalResearchPapers = 0, recentResearchPapers: any[] = [];
        let totalTeamMembers = 0, recentTeamMembers: any[] = [];
        let totalContacts = 0, contactsByStatus: any[] = [], recentContacts: any[] = [];
        let totalPayments = 0, paymentsByStatus: any[] = [], revenueAgg: any = { _sum: { amount: 0 } }, revenueByType: any[] = [], recentPayments: any[] = [];
        let totalRevenue = 0;

        if (section === 'stats' || section === 'all') {
            // --- Helper batches for Stats ---
            const [usersData, blogsData, apptData, contactData, paymentData, serviceCount, researchCount, teamCount] = await Promise.all([
                // Users
                Promise.all([
                    prisma.user.count(),
                    prisma.user.count({ where: { role: UserRole.ADMIN } }),
                ]),
                // Blogs
                Promise.all([
                    prisma.blog.count(),
                    prisma.blog.groupBy({ by: ['status'], _count: { status: true } }),
                ]),
                // Appointments
                Promise.all([
                    prisma.appointment.count(),
                    prisma.appointment.groupBy({ by: ['status'], _count: { status: true } }),
                ]),
                // Contacts
                Promise.all([
                    prisma.contact.count(),
                    prisma.contact.groupBy({ by: ['status'], _count: { status: true } }),
                ]),
                // Payments
                Promise.all([
                    prisma.payment.count(),
                    prisma.payment.groupBy({ by: ['status'], _count: { status: true } }),
                    prisma.payment.aggregate({ where: { status: PaymentStatus.SUCCESS }, _sum: { amount: true } }),
                    prisma.payment.groupBy({ by: ['paymentFor'], where: { status: PaymentStatus.SUCCESS }, _sum: { amount: true } }),
                ]),
                prisma.service.count(),
                prisma.research.count(),
                prisma.teamMember.count(),
            ]);

            totalUsers = usersData[0]; adminUsers = usersData[1]; normalUsers = totalUsers - adminUsers;
            totalBlogs = blogsData[0]; blogsByStatus = blogsData[1];
            totalAppointments = apptData[0]; appointmentsByStatus = apptData[1];
            totalContacts = contactData[0]; contactsByStatus = contactData[1];
            totalPayments = paymentData[0]; paymentsByStatus = paymentData[1]; revenueAgg = paymentData[2]; revenueByType = paymentData[3];
            totalServices = serviceCount;
            totalResearchPapers = researchCount;
            totalTeamMembers = teamCount;

            totalRevenue = Number(revenueAgg._sum.amount || 0);
        }

        if (section === 'recent' || section === 'all') {
            // --- Batched execution for Recent Items ---
            const [
                _recentBlogs,
                _upcomingAppointments,
                _recentServices,
                _recentResearchPapers,
                _recentTeamMembers,
                _recentContacts,
                _recentPayments
            ] = await Promise.all([
                // Blogs: Select specific author fields
                prisma.blog.findMany({
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                    include: {
                        author: {
                            select: { id: true, name: true, email: true, role: true, profilePicture: true, createdAt: true, updatedAt: true, clerkId: true }
                        }
                    }
                }),
                // Appointments: Select specific relation fields
                prisma.appointment.findMany({
                    where: { slot: { date: { gte: new Date() } } },
                    orderBy: { slot: { date: 'asc' } },
                    take: 5,
                    include: {
                        slot: true,
                        User: { select: { id: true, name: true, email: true} },
                        appointmentType: true
                    }
                }),
                // Services
                prisma.service.findMany({
                    orderBy: { createdAt: 'desc' },
                    take: 5
                }),
                // Research
                prisma.research.findMany({
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                    include: {
                        createdBy: {
                            select: { id: true, name: true, email: true, role: true, profilePicture: true }
                        }
                    }
                }),
                // Team Members
                prisma.teamMember.findMany({
                    orderBy: { createdAt: 'desc' },
                    take: 5
                }),
                // Contacts
                prisma.contact.findMany({
                    orderBy: { createdAt: 'desc' },
                    take: 5
                }),
                // Payments: limit user and relation fields
                prisma.payment.findMany({
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, profilePicture: true, role: true, createdAt: true, updatedAt: true, clerkId: true }
                        },
                        service: true,
                        appointment: {
                            include: { appointmentType: true }
                        }
                    }
                }),
            ]);

            recentBlogs = _recentBlogs;
            upcomingAppointments = _upcomingAppointments;
            recentServices = _recentServices;
            recentResearchPapers = _recentResearchPapers;
            recentTeamMembers = _recentTeamMembers;
            recentContacts = _recentContacts;
            recentPayments = _recentPayments;
        }

        return NextResponse.json({
            users: {
                total: totalUsers,
                admins: adminUsers,
                normal: normalUsers,
            },
            blogs: {
                total: totalBlogs,
                byStatus: blogsByStatus,
                recent: recentBlogs,
            },
            appointments: {
                total: totalAppointments,
                byStatus: appointmentsByStatus,
                upcoming: upcomingAppointments,
            },
            services: {
                total: totalServices,
                recent: recentServices,
            },
            research: {
                total: totalResearchPapers,
                recent: recentResearchPapers,
            },
            teamMembers: {
                total: totalTeamMembers,
                recent: recentTeamMembers,
            },
            contacts: {
                total: totalContacts,
                byStatus: contactsByStatus,
                recent: recentContacts,
            },
            payments: {
                total: totalPayments,
                byStatus: paymentsByStatus,
                revenue: totalRevenue,
                revenueByType: revenueByType,
                recent: recentPayments,
            },
        });
    } catch (error: any) {
        console.error('Admin Dashboard API Error:', error);

        // Handle connection pool timeout or other transient errors
        if (error.code === 'P2024' || error.message?.includes('Timed out fetching a new connection')) {
            return NextResponse.json(
                { error: 'Server busy, please retry shortly.' },
                { status: 503 }
            );
        }

        return NextResponse.json({ error: 'Internal Server Error. Please retry.' }, { status: 500 });
    }
}
