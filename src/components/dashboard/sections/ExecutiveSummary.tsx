import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Rocket,
  Users,
  DollarSign,
  Zap,
} from "lucide-react";

interface ExecutiveSummaryProps {
  clientName?: string;
  growthPercentage?: number;
  annualSavings?: number;
}

const ExecutiveSummary = ({
  clientName = "Clay.com",
  growthPercentage = 495247,
  annualSavings = 100555.23,
}: ExecutiveSummaryProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Annual Proposal</h1>
          <div className="flex items-center mt-1">
            <img
              src="https://logo.clearbit.com/clay.com"
              alt="Clay Logo"
              className="h-7 w-7 rounded-md mr-2"
            />
            <span className="text-lg text-gray-600">{clientName}</span>
          </div>
        </div>
        <img
          src="https://logo.clearbit.com/leadmagic.io"
          alt="LeadMagic Logo"
          className="h-9"
        />
      </div>

      <Card className="mb-6 overflow-hidden border-0 shadow-md">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="max-w-5xl">
            <h2 className="text-2xl font-bold mb-3">Annual Plan Opportunity</h2>
            <p className="text-base leading-relaxed">
              Clay.com has grown from $0 to $34,000 monthly spend in less than
              12 months, with 3.5-4M monthly API calls at $0.008 per credit.
              Lock in your current rate with an annual plan and save over
              ~$40,000 to $200k+ based on volume while we continue investing in
              the GTM Engineering community that's been part of your journey.
            </p>

            <p className="text-base leading-relaxed mt-2">
              LeadMagic a "Clay Success" story. From top Lead Generation Agency
              to Fast Growing SaaS.
            </p>

            <div className="mt-4 flex space-x-3">
              <Button className="bg-white text-blue-700 hover:bg-blue-50">
                View Annual Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <TrendingUp className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Rapid Growth</h3>
                <p className="text-sm text-gray-600">
                  $0 to $34K monthly in under 12 months
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Rocket className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">API Calls</h3>
                <p className="text-sm text-gray-600">
                  0 - 25m API Calls &lt; 12 months 🚀
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <DollarSign className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Current Rate</h3>
                <p className="text-sm text-gray-600">
                  $0.008 per credit (3.5-4M monthly)
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-6">
        <Card className="col-span-2 bg-white border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Community Partnership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                "When in doubt, go on the side of what's better for the
                customer. The real work isn't in the initial growth spurt — it's
                in building the machine that can sustain and repeat it."
                <footer className="text-sm text-gray-500 mt-1 not-italic">
                  — Varun Anand, Co-founder
                </footer>
              </blockquote>
            </div>
            <div className="flex items-start mt-4">
              <div className="bg-blue-50 rounded-full h-7 w-7 flex items-center justify-center mr-3 flex-shrink-0">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  Our partnership focuses on helping Sales and Marketing
                  Professionals become GTM Engineers, building creative outbound
                  and continuing to grow the community and adoption of Clay.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-800">
              Annual Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-green-700">
                    Current Annual Run Rate
                  </p>
                  <p className="text-xl font-bold text-green-800">$408,000</p>
                </div>
              </div>

              <div className="flex items-center">
                <Award className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-green-700">
                    Potential Annual Savings
                  </p>
                  <p className="text-xl font-bold text-green-800">
                    ~$40,000 to $200k+ based on volume
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-green-100/50 border-t border-green-100 pt-3 pb-3">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              View Detailed Savings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mb-6 border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Annual Plan Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <Zap className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    Lock In Current Rate
                  </h3>
                  <p className="text-sm text-gray-600">
                    Secure $0.008/credit pricing for 12 months as you continue
                    to scale
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Zap className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    Priority Support
                  </h3>
                  <p className="text-sm text-gray-600">
                    Dedicated account management and early access to new
                    features
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <Zap className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    GTM Community Investment
                  </h3>
                  <p className="text-sm text-gray-600">
                    Helping Sales and Marketing Professionals become GTM
                    Engineers through training and community building
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Zap className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    Predictable Budgeting
                  </h3>
                  <p className="text-sm text-gray-600">
                    Simplified financial planning with consistent monthly
                    billing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-100 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center">
            <Clock className="h-10 w-10 text-blue-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">
                Limited Time Offer
              </h3>
              <p className="text-sm text-blue-700 mb-3">
                Lock in your annual discount within 30 days and start saving
                immediately.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                View Annual Plan Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveSummary;
