import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, HelpCircle, FileText } from 'lucide-react';
import {
  DEFAULT_EMAIL,
  DEFAULT_OFFICE_HOURS,
  DEFAULT_PHONE,
  DEFAULT_WHATSAPP_URL,
} from '@/lib/company-contact';

const HelpPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Main Help Section */}
      <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              How Can We Help You?
            </CardTitle>
          </div>
          <p className="text-base sm:text-lg text-gray-600">
            Choose your preferred way to reach us—we're here to assist you
          </p>
        </CardHeader>

        <CardContent className="pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* WhatsApp Support */}
            <Card className="border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  WhatsApp Chat
                </h3>

                <p className="text-sm text-gray-600 mb-6 leading-relaxed min-h-[3rem]">
                  Get instant replies and support anytime, anywhere
                </p>

                <a href={DEFAULT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Now
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Customer Support */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Phone Support
                </h3>

                <p className="text-sm text-gray-600 mb-6 leading-relaxed min-h-[3rem]">
                  Speak directly with our team for immediate assistance
                </p>

                <a href={`tel:${DEFAULT_PHONE}`}>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Email Support */}
            <Card className="border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300">
                    <Mail className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Email Support
                </h3>

                <p className="text-sm text-gray-600 mb-6 leading-relaxed min-h-[3rem]">
                  Send detailed queries and receive comprehensive responses
                </p>

                <a href={`mailto:${DEFAULT_EMAIL}`}>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card className="w-full shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-indigo-600" />
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
              Additional Resources
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-semibold text-gray-800 mb-2">Business Hours</h4>
              <p className="text-sm text-gray-600">{DEFAULT_OFFICE_HOURS}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-semibold text-gray-800 mb-2">Response Time</h4>
              <p className="text-sm text-gray-600">Email: Within 24 hours</p>
              <p className="text-sm text-gray-600">Phone/WhatsApp: Immediate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpPage;
