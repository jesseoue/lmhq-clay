import React from "react";
import { Check, X, TrendingUp, AlertTriangle, Lock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

interface PricingTier {
  title: string;
  description: string;
  price: number;
  annualPrice?: number;
  features: string[];
  recommended?: boolean;
  savings?: number;
  creditRate?: number;
  discountedRate?: number;
  color?: string;
}

interface PricingComparisonProps {
  discountPercentage?: number;
  tiers?: PricingTier[];
  currentMonthlySpend?: number;
  projectedAnnualCredits?: number;
}

const PricingComparison = ({
  discountPercentage = 25,
  currentMonthlySpend = 34778.85,
  projectedAnnualCredits = 50000000,
  tiers = [
    {
      title: "Pay As You Go",
      description: "Standard pricing with no commitment",
      price: 34000,
      creditRate: 0.008,
      features: [
        "All LeadMagic features",
        "Standard support",
        "Monthly billing",
        "No long-term commitment",
        "Standard credit rate of $0.008",
      ],
      recommended: false,
      color: "gray",
    },
    {
      title: "Standard Annual",
      description: "Basic annual commitment with savings",
      price: 34000,
      creditRate: 0.008,
      discountedRate: 0.0072,
      annualPrice: 30600, // 10% discount
      features: [
        "All LeadMagic features",
        "Standard support",
        "Annual billing",
        "Predictable pricing",
        "10% discount on all credits",
        "Price Protection",
        "Rate lock guarantee",
      ],
      recommended: false,
      savings: 40000, // Fixed value
      color: "blue",
    },
    {
      title: "Pro Annual",
      description: "Enhanced value with cash position benefits",
      price: 34000,
      creditRate: 0.008,
      discountedRate: 0.0064,
      annualPrice: 27200, // 20% discount
      features: [
        "All LeadMagic features",
        "Priority support",
        "Annual billing",
        "Predictable pricing",
        "20% discount on all credits",
        "Price Protection",
        "Rate lock guarantee",
        "Quarterly strategy sessions",
      ],
      recommended: false,
      savings: 80000, // Fixed value
      color: "purple",
    },
    {
      title: "Enterprise Annual",
      description: "Maximum savings for growing businesses",
      price: 34000,
      creditRate: 0.008,
      discountedRate: 0.0056,
      annualPrice: 23800, // 30% discount
      features: [
        "All LeadMagic features",
        "Priority account management",
        "Priority support",
        "Annual billing",
        "30% discount on all credits",
        "Price Protection",
        "Rate lock guarantee",
        "Monthly strategy sessions",
        "Custom integration support",
      ],
      recommended: true,
      savings: 120000, // Fixed value
      color: "green",
    },
  ],
}: PricingComparisonProps) => {
  // Calculate annual prices and savings based on discount percentage and projected usage
  const calculatedTiers = tiers.map((tier) => {
    // For pay-as-you-go, calculate the projected annual cost
    if (!tier.annualPrice) {
      const projectedAnnualCost = projectedAnnualCredits * tier.creditRate!;
      return {
        ...tier,
        projectedAnnualCost,
      };
    }

    // For annual plans, use the fixed discount percentages
    const tierDiscount =
      tier.title === "Standard Annual"
        ? 10
        : tier.title === "Pro Annual"
          ? 20
          : tier.title === "Enterprise Annual"
            ? 30
            : discountPercentage;

    const discountedRate = tier.creditRate! * (1 - tierDiscount / 100);
    const calculatedAnnualPrice = tier.price * (1 - tierDiscount / 100);
    const projectedAnnualCost = projectedAnnualCredits * discountedRate;

    // Use fixed savings values
    const calculatedSavings =
      tier.title === "Standard Annual"
        ? 40000
        : tier.title === "Pro Annual"
          ? 80000
          : tier.title === "Enterprise Annual"
            ? 120000
            : tier.savings || 0;

    return {
      ...tier,
      annualPrice: calculatedAnnualPrice,
      discountedRate,
      projectedAnnualCost,
      savings: calculatedSavings,
    };
  });

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Credit Rate Comparison
        </h2>
        <p className="text-gray-600">
          Compare our pricing options and see how much you can save with an
          annual plan as your usage grows.
        </p>
      </div>

      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800 mb-1">
              Credit Rate Increases Coming Soon
            </h3>
            <p className="text-amber-700">
              Our standard credit rate is scheduled to increase from $0.008 to
              $0.01 per credit in the next quarter. Lock in your current rate
              now with an annual plan to protect against future increases.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {calculatedTiers.map((tier, index) => (
          <Card
            key={index}
            className={`flex flex-col h-full ${tier.recommended ? `border-2 border-${tier.color}-500 shadow-lg` : `border border-${tier.color}-200`}`}
          >
            <CardHeader
              className={`${tier.recommended ? `bg-${tier.color}-50` : ""} rounded-t-xl relative overflow-hidden`}
            >
              {tier.recommended && (
                <Badge
                  className={`mb-2 self-start bg-${tier.color}-500 hover:bg-${tier.color}-600`}
                >
                  Best Value
                </Badge>
              )}
              {tier.recommended && (
                <div className="absolute -top-1 -right-12 bg-amber-500 text-white px-12 py-1 transform rotate-45">
                  <span className="text-xs font-bold">
                    SAVE ~${(tier.savings! / 1000).toFixed(0)}K
                  </span>
                </div>
              )}
              <CardTitle className="text-xl">{tier.title}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">{tier.description}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                {tier.annualPrice ? (
                  <div>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold">
                        ${tier.annualPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">/month</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm">
                      <span className="line-through text-gray-400">
                        ${tier.price.toLocaleString()}/month
                      </span>
                      <Badge
                        variant="secondary"
                        className={`ml-2 bg-${tier.color}-100 text-${tier.color}-800 border-${tier.color}-200`}
                      >
                        ~${(tier.savings! / 1000).toFixed(0)}K savings
                      </Badge>
                    </div>
                    <div className="mt-3 p-2 bg-gray-50 rounded-md">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Rate:</span>
                        <span className="font-medium">
                          ${tier.creditRate}/credit
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">Your Rate:</span>
                        <span className="font-medium text-green-600">
                          ${tier.discountedRate}/credit
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">
                        Save ~${tier.savings?.toLocaleString()} per year
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold">
                        ${tier.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">/month</span>
                    </div>
                    <div className="mt-3 p-2 bg-gray-50 rounded-md">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Rate:</span>
                        <span className="font-medium">
                          ${tier.creditRate}/credit
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">Future Rate:</span>
                        <span className="font-medium text-red-600">
                          $0.01/credit
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-red-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">
                        No protection against rate increases
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check
                      className={`h-5 w-5 text-${tier.color || "green"}-500 mr-2 flex-shrink-0 mt-0.5`}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-4 pb-6">
              <Button
                className={`w-full ${tier.recommended ? `bg-${tier.color}-600 hover:bg-${tier.color}-700 text-white` : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
              >
                {tier.annualPrice ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Lock In This Rate
                  </>
                ) : (
                  "Continue With Pay-As-You-Go"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Why Lock In Your Credit Rate Now?
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
            <span>
              <span className="font-medium">
                Protection Against Rate Increases:
              </span>{" "}
              Our standard rate is scheduled to increase from $0.008 to $0.01
              per credit soon.
            </span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
            <span>
              <span className="font-medium">Significant Savings:</span> Save up
              to ~${calculatedTiers[3].savings?.toLocaleString()} annually based
              on your projected usage.
            </span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
            <span>
              <span className="font-medium">Predictable Costs:</span> As your
              usage grows, your savings increase proportionally with a locked-in
              rate.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PricingComparison;
