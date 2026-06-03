
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { DEFAULT_EMAIL, DEFAULT_PHONE } from "@/lib/company-contact"
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BriefcaseBusiness,
    Building2,
    Calculator,
    CheckCircle2,
    FileSearch,
    Gavel,
    HandCoins,
    HeartHandshake,
    type LucideIcon,
    MessageSquareText,
    Scale,
    ShieldCheck,
    ShieldEllipsis,
    Sprout,
    Users,
    Workflow,
} from "lucide-react"

export const revalidate = 0;

const servicePromises = [
    {
        title: "Clear, client-first guidance",
        description:
            "We keep legal advice practical, understandable, and aligned with the real outcome you want to achieve.",
        icon: BadgeCheck,
    },
    {
        title: "Strategic support across matters",
        description:
            "From preventive advisory work to dispute resolution, our team is structured to support both immediate needs and long-term decisions.",
        icon: ShieldCheck,
    },
    {
        title: "Professional communication throughout",
        description:
            "You can expect timely updates, transparent conversations, and a disciplined legal approach from start to finish.",
        icon: HeartHandshake,
    },
]

const processSteps = [
    {
        title: "Initial consultation",
        description: "We understand the issue, goals, timeline, and any urgent risks before defining the next legal step.",
        icon: MessageSquareText,
    },
    {
        title: "Document and matter review",
        description: "We review agreements, records, filings, and surrounding facts to identify the strongest legal position.",
        icon: FileSearch,
    },
    {
        title: "Strategy and representation",
        description: "We build a tailored course of action, whether it involves advisory work, negotiation, drafting, or litigation.",
        icon: Gavel,
    },
    {
        title: "Ongoing support and resolution",
        description: "We stay engaged through follow-ups, appearances, and implementation so the matter moves forward with clarity.",
        icon: CheckCircle2,
    },
]

const serviceIconMap: Array<{ keywords: string[]; icon: LucideIcon }> = [
    { keywords: ["corporate", "commercial"], icon: BriefcaseBusiness },
    { keywords: ["litigation", "dispute"], icon: Gavel },
    { keywords: ["real estate", "property"], icon: Building2 },
    { keywords: ["banking", "finance"], icon: HandCoins },
    { keywords: ["intellectual property", "ipr"], icon: ShieldCheck },
    { keywords: ["family"], icon: Users },
    { keywords: ["employment", "labour"], icon: BriefcaseBusiness },
    { keywords: ["tax"], icon: Calculator },
    { keywords: ["consumer"], icon: BadgeCheck },
    { keywords: ["environment"], icon: Sprout },
    { keywords: ["technology", "privacy"], icon: ShieldEllipsis },
    { keywords: ["alternative dispute", "adr"], icon: Workflow },
]

function getServiceIcon(title: string) {
    const normalizedTitle = title.toLowerCase()
    const match = serviceIconMap.find(({ keywords }) =>
        keywords.some((keyword) => normalizedTitle.includes(keyword))
    )

    return match?.icon || Scale
}

export default async function ServicesPage() {
    const [services, companyInfo] = await Promise.all([
        prisma.practiceArea.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        }),
        prisma.companyInfo.findFirst()
    ]);

    const phoneNumber = companyInfo?.phone || DEFAULT_PHONE;
    const email = companyInfo?.email || DEFAULT_EMAIL;
    const telLink = `tel:${phoneNumber.replace(/\s+/g, '')}`;
    const stats = [
        { label: "Practice Areas", value: String(services.length).padStart(2, "0") },
        { label: "Years of Experience", value: companyInfo?.yearsExperience || "10+" },
        { label: "Trusted Clients", value: companyInfo?.trustedClients || "200+" },
    ]

    return (
        <main className="min-h-screen bg-gray-50 overflow-hidden font-lato selection:bg-blue-100 selection:text-blue-900">
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 pt-28 pb-20 lg:pb-24">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-400/20 blur-[120px] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-[100px] -translate-x-1/3 translate-y-1/3" />

                <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:items-center">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center rounded-full border border-blue-300/20 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-[0.2em] text-blue-100 uppercase backdrop-blur-sm">
                            Practice Areas
                        </span>
                        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Legal services built around clarity, strategy, and trusted representation.
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                            Vyska Legal supports individuals, families, businesses, and institutions across a broad range of legal matters. Explore our active practice areas and connect with the team for tailored legal guidance.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <a
                                href="#practice-areas"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-blue-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                            >
                                Explore Practice Areas
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <Link
                                href="/book-appointments"
                                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                            >
                                Book a Consultation
                            </Link>
                        </div>
                    </div>

                    <div className="relative lg:ml-auto w-full max-w-xl">
                        <div className="absolute -inset-4 rounded-[2rem] bg-blue-300/10 blur-3xl" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
                            <Image
                                src="/officepic.jpg"
                                alt="Vyska Legal office"
                                width={960}
                                height={720}
                                priority
                                className="h-[320px] w-full object-cover sm:h-[380px] lg:h-[440px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/30 to-transparent" />
                            <div className="absolute inset-x-6 bottom-6">
                                <div className="max-w-sm">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
                                        Full-Service Support
                                    </p>
                                    <p className="mt-2 text-xl font-semibold text-white">
                                        Practical counsel for urgent legal questions and long-term matters alike.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-blue-100 bg-white px-6 py-5 shadow-sm"
                        >
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500">{stat.label}</p>
                            <p className="mt-3 text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Why Clients Reach Out</span>
                        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Legal support shaped around clarity, responsiveness, and strategy.
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {servicePromises.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-900">{item.title}</h3>
                                <p className="mt-3 text-base leading-7 text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="practice-areas" className="py-6 lg:py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Our Services</span>
                            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                                Explore the legal practice areas currently offered by the firm.
                            </h2>
                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                Each practice area below highlights the matters our team actively handles, with a focus on scope, clarity, and the support clients can expect.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 self-start rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                        >
                            Need help choosing the right service?
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {services.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-blue-200 bg-white px-8 py-16 text-center text-gray-600 shadow-sm">
                            Services will appear here once active practice areas are available.
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {services.map((service, index) => {
                                const Icon = getServiceIcon(service.title)

                                return (
                                    <article
                                        key={service.id}
                                        className="group flex h-full flex-col rounded-[1.75rem] border border-blue-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <span className="text-sm font-semibold tracking-[0.28em] text-blue-200">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-2xl font-bold leading-tight text-gray-900 group-hover:text-blue-800">
                                            {service.title}
                                        </h3>
                                        <p className="mt-4 flex-1 text-base leading-7 text-gray-600">
                                            {service.description}
                                        </p>

                                        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
                                            <span className="text-sm font-semibold text-blue-700">Discuss this practice area</span>
                                            <Link
                                                href="/book-appointments"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-blue-700"
                                            >
                                                Book consultation
                                                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </Link>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:items-center">
                    <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl">
                        <Image
                            src="/court.png"
                            alt="Courtroom representation"
                            width={900}
                            height={900}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/15 to-transparent" />
                        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">Our Process</p>
                            <p className="mt-2 text-lg font-semibold text-white">
                                Every matter moves through a clear, structured legal workflow.
                            </p>
                        </div>
                    </div>

                    <div>
                        <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">How We Work</span>
                        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Straightforward legal support, from first conversation to final action.
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
                            Whether the matter is advisory, documentation-heavy, or dispute-driven, the goal is to keep the process disciplined, understandable, and outcome-oriented.
                        </p>

                        <div className="mt-8 grid gap-5 sm:grid-cols-2">
                            {processSteps.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                            <step.icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-semibold tracking-[0.24em] text-blue-300">
                                            0{index + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-gray-900">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-24 pt-6 px-4 sm:px-6 lg:px-8">
                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-900 to-slate-900 px-8 py-12 text-center shadow-2xl md:px-16 md:py-16">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
                    <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

                    <div className="relative z-10 mx-auto max-w-3xl">
                        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                            Need support on one of these legal matters?
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                            Reach out to the team for a consultation and let us understand your matter with the seriousness it deserves.
                        </p>
                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="/book-appointments"
                                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-blue-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                            >
                                Book a Consultation
                            </Link>
                            <Link
                                href={telLink}
                                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                            >
                                Call Us Now
                            </Link>
                        </div>
                        <p className="mt-8 text-sm text-blue-200/80">
                            Or email us at{" "}
                            <a href={`mailto:${email}`} className="font-semibold text-white underline decoration-blue-300/40 underline-offset-4">
                                {email}
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
