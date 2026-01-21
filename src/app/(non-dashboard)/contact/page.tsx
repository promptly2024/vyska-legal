import React from 'react'
import { prisma } from '@/lib/prisma'
import ContactForm from '@/components/contact/ContactForm'
import { Mail, Phone, MapPin } from 'lucide-react'

const ContactUsPage = async () => {
  const companyInfo = await prisma.companyInfo.findFirst();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-2 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
        {/* Left: Branding & Info */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 text-white flex flex-col justify-between p-8 md:p-10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="Vyska Legal Logo" className="h-12 w-12 rounded-full bg-white p-1 shadow" />
              <span className="text-2xl font-extrabold tracking-wide">Vyska Legal</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-blue-100 mb-8">
              Have a question, need legal advice, or want to work with us? Fill out the form and our team will get back to you promptly.
            </p>
            <div className="space-y-4 text-blue-100 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-200" />
                <span>{companyInfo?.email || 'service@vyskalegal.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-200" />
                <span>{companyInfo?.phone || '+91 8382XXXXXX'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-200" />
                <span>{companyInfo?.address || '123, Law Street, Bengaluru, India'}</span>
              </div>
            </div>
          </div>
          <div className="mt-10 text-xs text-blue-200">
            &copy; {new Date().getFullYear()} Vyska Legal. All rights reserved.
          </div>
        </div>
        {/* Right: Contact Form */}
        <div className="md:w-1/2 flex items-center justify-center p-6 md:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
