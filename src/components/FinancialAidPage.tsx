import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, DollarSign, CheckCircle, Clock, FileText } from "lucide-react";

interface FinancialAidPageProps {
  onBack: () => void;
  backText?: string;
}

export function FinancialAidPage({ onBack, backText = "Back" }: FinancialAidPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {backText}
        </Button>

        <Card className="border-2 border-blue-500 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle>Financial Aid</CardTitle>
                <p className="text-gray-600">2024-2025 Academic Year</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Award Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-green-700 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Award Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-gray-600">Total Awards</p>
                  <p className="text-green-700">$18,500.00</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Disbursed</p>
                  <p className="text-blue-700">$9,250.00</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Pending</p>
                  <p className="text-orange-600">$9,250.00</p>
                </div>
              </div>
            </div>

            {/* Award Details */}
            <div>
              <h3 className="text-gray-700 mb-4">Award Details</h3>
              <div className="space-y-3">
                {/* Pell Grant */}
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-gray-800">Federal Pell Grant</h4>
                          <Badge className="bg-green-100 text-green-700">Accepted</Badge>
                        </div>
                        <p className="text-gray-600 mt-1">Need-based grant</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700">$6,500.00</p>
                        <p className="text-gray-500">per year</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fall 2024:</span>
                        <span className="text-green-600">$3,250.00 Disbursed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spring 2025:</span>
                        <span className="text-orange-600">$3,250.00 Pending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SFSU Grant */}
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-gray-800">SFSU University Grant</h4>
                          <Badge className="bg-green-100 text-green-700">Accepted</Badge>
                        </div>
                        <p className="text-gray-600 mt-1">Institutional aid</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700">$5,000.00</p>
                        <p className="text-gray-500">per year</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fall 2024:</span>
                        <span className="text-green-600">$2,500.00 Disbursed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spring 2025:</span>
                        <span className="text-orange-600">$2,500.00 Pending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cal Grant */}
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-gray-800">Cal Grant B</h4>
                          <Badge className="bg-green-100 text-green-700">Accepted</Badge>
                        </div>
                        <p className="text-gray-600 mt-1">State grant for California residents</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700">$4,000.00</p>
                        <p className="text-gray-500">per year</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fall 2024:</span>
                        <span className="text-green-600">$2,000.00 Disbursed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spring 2025:</span>
                        <span className="text-orange-600">$2,000.00 Pending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Work Study */}
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-gray-800">Federal Work-Study</h4>
                          <Badge className="bg-blue-100 text-blue-700">Offered</Badge>
                        </div>
                        <p className="text-gray-600 mt-1">Part-time employment opportunity</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700">$3,000.00</p>
                        <p className="text-gray-500">per year</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-600">Earned so far: $1,500.00</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Important Dates */}
            <Card className="bg-yellow-50 border-2 border-yellow-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Clock className="h-5 w-5" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Spring 2025 Disbursement:</span>
                  <span className="text-gray-800">January 20, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">FAFSA Renewal Due:</span>
                  <span className="text-gray-800">March 1, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Award Letter for 2025-26:</span>
                  <span className="text-gray-800">April 15, 2025</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                View Award Letter
              </Button>
              <Button variant="outline" className="flex-1">
                Contact Financial Aid Office
              </Button>
            </div>

            {/* Contact Information */}
            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-4">
                <p className="text-gray-700 mb-2">Need help with financial aid?</p>
                <p className="text-gray-600">
                  📧 Email: finaid@sfsu.edu<br />
                  📞 Phone: (415) 338-7000<br />
                  🏢 Office: Student Services Building, 2nd Floor
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}