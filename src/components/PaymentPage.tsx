import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";

interface PaymentPageProps {
  onBack: () => void;
  balance: number;
  backText?: string;
}

export function PaymentPage({ onBack, balance, backText = "Back" }: PaymentPageProps) {
  const [formData, setFormData] = useState({
    amount: Math.abs(balance).toFixed(2),
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <Card className="max-w-md w-full border-2 border-green-500">
          <CardContent className="p-8 text-center space-y-4">
            <div className="bg-green-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-green-600">Payment Successful!</h2>
            <p className="text-gray-600">
              Your payment of ${formData.amount} has been processed successfully.
            </p>
            <p className="text-gray-500">
              A confirmation email has been sent to your SFSU email address.
            </p>
            <Button onClick={onBack} className="w-full">
              Return to Gateway
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {backText}
        </Button>

        <Card className="border-2 border-blue-500 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center gap-3">
              <div className="bg-purple-700 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>
                  Securely pay your student account balance
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Amount */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <Label htmlFor="amount">Payment Amount</Label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">$</span>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    className="text-2xl"
                  />
                </div>
                <p className="text-gray-600 mt-2">
                  Current balance due: ${Math.abs(balance).toFixed(2)}
                </p>
              </div>

              {/* Card Information */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-gray-700">
                  <Lock className="h-4 w-4" />
                  Card Information
                </h3>

                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiration Date</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={formData.expiry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <h3 className="text-gray-700">Billing Address</h3>

                <div>
                  <Label htmlFor="billingAddress">Street Address</Label>
                  <Input
                    id="billingAddress"
                    name="billingAddress"
                    placeholder="123 Main St"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="San Francisco"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="CA"
                      maxLength={2}
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="94132"
                    maxLength={5}
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-800"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Submit Payment
                    </>
                  )}
                </Button>
                <p className="text-center text-gray-500">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}