import React, { useState, useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  ArrowRight,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Sparkles,
  Percent,
  CheckCircle,
  AlertTriangle,
  Lock,
} from "lucide-react";

// Define discount tiers outside component to prevent recreation on each render
const DISCOUNT_TIERS = [
  {
    threshold: 50,
    discount: 0.15,
    pricePerCredit: 0.0068,
    annualCommitment: 50000000,
  },
  {
    threshold: 60,
    discount: 0.2,
    pricePerCredit: 0.0064,
    annualCommitment: 60000000,
  },
  {
    threshold: 75,
    discount: 0.25,
    pricePerCredit: 0.006,
    annualCommitment: 75000000,
  },
  {
    threshold: 90,
    discount: 0.3,
    pricePerCredit: 0.0056,
    annualCommitment: 90000000,
  },
];

// Extract formatters outside component to prevent recreation
const formatCurrency = (value, maximumFractionDigits = 2) => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits,
  });
};

// Define constants
const BASE_MONTHLY_RATE = 0.008; // $0.008 per credit

// Functions outside component to avoid recreating them on each render
const getApplicableDiscount = (commitmentInMillions) => {
  for (let i = DISCOUNT_TIERS.length - 1; i >= 0; i--) {
    if (commitmentInMillions >= DISCOUNT_TIERS[i].threshold) {
      return DISCOUNT_TIERS[i];
    }
  }
  return DISCOUNT_TIERS[0];
};

// Calculate savings from discount (standard price vs. discounted price for same volume)
const calculateDiscountSavings = (standardAmount, discountedAmount) => {
  return standardAmount - discountedAmount;
};

// Calculate difference compared to current spending
const calculateComparedToCurrentSpend = (
  currentAnnualSpend,
  discountedAnnualAmount,
) => {
  return currentAnnualSpend - discountedAnnualAmount;
};

const calculateSavingsPercentage = (annualSavings, currentAnnualSpend) => {
  return Math.round((annualSavings / currentAnnualSpend) * 100);
};

// Service breakdown breakdown - moved outside component
const SERVICE_BREAKDOWN = {
  emailFinder: 22497.9,
  emailValidation: 92.99,
  mobileFinder: 4059.48,
  companySearch: 878.49,
  linkedinFinder: 314.72,
  competitorsSearch: 88.08,
  personalEmailFinder: 0.35,
};

interface AnnualPlanBenefitsProps {
  clientName?: string;
  currentMonthlySpend?: number;
  currentCreditRate?: number;
  projectedAnnualCredits?: number;
}

const AnnualPlanBenefits = ({
  clientName = "Clay.com",
  currentMonthlySpend = 34778.85,
  currentCreditRate = 0.008,
  projectedAnnualCredits = 50000000,
}: AnnualPlanBenefitsProps) => {
  // State for commitment tier (in millions of credits)
  const [commitmentTier, setCommitmentTier] = useState(50);

  // Current usage data - memoize values derived from props
  const currentMonthlyCredits = useMemo(() => 4347355.65, []); // Constant value, could be a parameter
  const currentAnnualSpend = useMemo(
    () => currentMonthlySpend * 12,
    [currentMonthlySpend],
  );

  // Calculate pricing and savings with all dependencies included
  const calculations = useMemo(() => {
    const applicableTier = getApplicableDiscount(commitmentTier);
    const tierCommitmentCredits = applicableTier.annualCommitment;
    const monthlyCommitmentCredits = tierCommitmentCredits / 12;

    // Standard calculations
    const standardMonthlyAmount =
      (commitmentTier * 1000000 * BASE_MONTHLY_RATE) / 12;
    const standardAnnualAmount = commitmentTier * 1000000 * BASE_MONTHLY_RATE;

    // Discounted calculations
    const discountedMonthlyAmount =
      (commitmentTier * 1000000 * applicableTier.pricePerCredit) / 12;
    const discountedAnnualAmount =
      commitmentTier * 1000000 * applicableTier.pricePerCredit;

    // Savings calculations
    const monthlySavings = standardMonthlyAmount - discountedMonthlyAmount;

    // Discount savings (savings from the discount itself)
    const discountSavings = calculateDiscountSavings(
      standardAnnualAmount,
      discountedAnnualAmount,
    );
    const discountSavingsPercentage = Math.round(
      (discountSavings / standardAnnualAmount) * 100,
    );

    // Comparison to current spending
    const comparedToCurrentSpend = calculateComparedToCurrentSpend(
      currentAnnualSpend,
      discountedAnnualAmount,
    );
    const comparedToCurrentSpendPercentage = calculateSavingsPercentage(
      comparedToCurrentSpend,
      currentAnnualSpend,
    );

    // Additional metrics
    const freeMonthsEquivalent = comparedToCurrentSpend / currentMonthlySpend;
    const volumeIncrease =
      tierCommitmentCredits > currentMonthlyCredits * 12
        ? Math.round(
            (tierCommitmentCredits / (currentMonthlyCredits * 12) - 1) * 100,
          )
        : 0;

    return {
      applicableTier,
      standardMonthlyAmount,
      discountedMonthlyAmount,
      standardAnnualAmount,
      discountedAnnualAmount,
      monthlySavings,
      discountSavings,
      discountSavingsPercentage,
      comparedToCurrentSpend,
      comparedToCurrentSpendPercentage,
      freeMonthsEquivalent,
      discountPercentage: applicableTier.discount * 100,
      monthlyCommitmentCredits,
      annualCommitmentCredits: tierCommitmentCredits,
      volumeIncrease,
      formattedDiscountSavings: formatCurrency(discountSavings, 0),
      formattedComparedToCurrentSpend: formatCurrency(
        Math.abs(comparedToCurrentSpend),
        0,
      ),
      isIncreasedCost: comparedToCurrentSpend < 0,
      formattedDiscountedMonthlyAmount: formatCurrency(
        discountedMonthlyAmount,
        0,
      ),
      formattedDiscountedAnnualAmount: formatCurrency(
        discountedAnnualAmount,
        0,
      ),
      formattedFreeMonthsEquivalent: freeMonthsEquivalent.toFixed(1),
    };
  }, [
    commitmentTier,
    currentMonthlyCredits,
    currentMonthlySpend,
    currentAnnualSpend,
  ]);

  // Memoize tier selection handler
  const handleTierSelection = useCallback((tier) => {
    setCommitmentTier(tier);
  }, []);

  // Memoize the tier items to prevent unnecessary recalculations
  const discountTierItems = useMemo(() => {
    return DISCOUNT_TIERS.map((tier, index) => {
      const tierCredits = tier.annualCommitment;
      const monthlyCredits = tierCredits / 12;
      const standardMonthlyCost = monthlyCredits * BASE_MONTHLY_RATE;
      const discountedMonthlyCost = monthlyCredits * tier.pricePerCredit;
      const annualStandardCost = standardMonthlyCost * 12;
      const annualDiscountedCost = discountedMonthlyCost * 12;
      const annualSavings = annualStandardCost - annualDiscountedCost;

      // Pre-calculate required values for the table
      return {
        tier,
        index,
        formattedDiscountedMonthlyCost: formatCurrency(
          discountedMonthlyCost,
          0,
        ),
        formattedAnnualDiscountedCost: formatCurrency(annualDiscountedCost, 0),
        formattedAnnualSavings: formatCurrency(annualSavings, 0),
        hasProtection: index >= 1,
        isSelected: commitmentTier === tier.threshold,
      };
    });
  }, [commitmentTier]);

  // Benefit list items - memoize to avoid recreation
  const benefitItems = useMemo(
    () => [
      {
        icon: <CheckCircle className="h-5 w-5 text-primary mt-0.5" />,
        text:
          calculations.discountPercentage >= 15 ? (
            <>
              <span className="font-bold bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                Credit Price Protection:
              </span>{" "}
              Lock in per-API credit prices for the entire year
            </>
          ) : (
            <>
              <span className="font-bold">Basic Rate Lock:</span> Lock in your
              discount rate for 12 months
            </>
          ),
      },
      {
        icon: <CheckCircle className="h-5 w-5 text-primary mt-0.5" />,
        text: (
          <>
            Save{" "}
            <span className="font-bold">
              ${calculations.formattedDiscountSavings}
            </span>{" "}
            compared to standard pricing
          </>
        ),
      },
      {
        icon: <CheckCircle className="h-5 w-5 text-primary mt-0.5" />,
        text: "Priority API access and dedicated account management",
      },
    ],
    [calculations.discountPercentage, calculations.formattedDiscountSavings],
  );

  // Cost of not switching items - memoize to avoid recreation
  const costOfNotSwitchingItems = useMemo(
    () => [
      {
        icon: <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />,
        text: (
          <>
            You'll lose{" "}
            <span className="font-bold">
              ${calculations.formattedDiscountSavings}
            </span>{" "}
            in potential discount savings this year
          </>
        ),
      },
      {
        icon: <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />,
        text: (
          <>
            You'll pay{" "}
            <span className="font-bold">
              ${formatCurrency(calculations.standardAnnualAmount, 0)}
            </span>{" "}
            instead of{" "}
            <span className="font-bold">
              ${calculations.formattedDiscountedAnnualAmount}
            </span>
          </>
        ),
      },
      {
        icon: <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />,
        text: (
          <>
            You'll need to commit to purchasing {commitmentTier}M credits
            annually to get this rate
          </>
        ),
      },
      {
        icon: <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />,
        text: "No protection against potential price increases",
      },
    ],
    [
      calculations.formattedDiscountSavings,
      calculations.standardAnnualAmount,
      calculations.formattedDiscountedAnnualAmount,
      commitmentTier,
    ],
  );

  return (
    <div className="w-full h-full bg-slate-50 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Annual Plan Benefits
          </h1>
          <p className="text-gray-600 mt-2">
            Lock in your credit rate now and save significantly with
            volume-based discounts
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Monthly Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    ${formatCurrency(currentMonthlySpend)}
                  </p>
                  <p className="text-sm text-gray-500">
                    At ${currentCreditRate}/credit
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Annual Plan Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-3xl font-bold text-primary">
                    ${calculations.formattedDiscountedAnnualAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${calculations.applicableTier.pricePerCredit.toFixed(4)}
                    /credit (${calculations.formattedDiscountedMonthlyAmount}
                    /month)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Discount Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Sparkles className="h-8 w-8 text-white mr-3" />
                <div>
                  <p className="text-3xl font-bold">
                    ${calculations.formattedDiscountSavings}
                  </p>
                  <p className="text-sm text-green-100">
                    {calculations.discountSavingsPercentage}% off standard price
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle>Volume-Based Discount Tiers</CardTitle>
            <CardDescription>
              Commit to more volume and unlock higher discounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Annual Credit Commitment
                  </span>
                  <Badge variant="outline" className="text-lg px-3 py-1.5">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {commitmentTier}M Credits
                  </Badge>
                </div>
                <Slider
                  defaultValue={[50]}
                  value={[commitmentTier]}
                  min={50}
                  max={90}
                  step={10}
                  onValueChange={(value) => setCommitmentTier(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50M</span>
                  <span>60M</span>
                  <span>75M</span>
                  <span>90M</span>
                </div>
                <div className="flex items-center justify-center text-xs text-primary font-medium mt-2">
                  <span>
                    Monthly Spend (February): $
                    {formatCurrency(currentMonthlySpend)} |{" "}
                    {formatCurrency(4347356, 0)} credits
                    <br />
                    Annual Run Rate: ${formatCurrency(
                      currentAnnualSpend,
                      0,
                    )} | {formatCurrency(52168268, 0)} credits
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Your Discount Tier
                  </span>
                  <Badge className="text-lg px-3 py-1.5 bg-primary">
                    <Percent className="mr-1 h-4 w-4" />
                    {calculations.discountPercentage}% Off
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-1">
                  {DISCOUNT_TIERS.map((tier, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`text-center p-2 rounded-md cursor-pointer ${
                        commitmentTier === tier.threshold
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                      onClick={() => handleTierSelection(tier.threshold)}
                    >
                      <div className="text-xs">{tier.threshold}M</div>
                      <div className="font-bold">{tier.discount * 100}%</div>
                      {index >= 0 && (
                        <div className="text-xs mt-1 bg-amber-200 text-amber-800 px-1 rounded-sm font-medium">
                          Price Protection
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-2 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>
                      <span className="font-bold">
                        ${calculations.applicableTier.pricePerCredit.toFixed(4)}
                      </span>{" "}
                      per credit (vs. $0.008)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <h3 className="text-lg font-semibold mb-4">
                Annual Commitment Summary ({commitmentTier}M Credits)
              </h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Monthly Plan Cost
                  </div>
                  <div className="text-2xl font-bold">
                    ${formatCurrency(calculations.standardMonthlyAmount, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {commitmentTier}M credits × ${BASE_MONTHLY_RATE} ÷ 12
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Monthly with Discount
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ${calculations.formattedDiscountedMonthlyAmount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {commitmentTier}M credits × $
                    {calculations.applicableTier.pricePerCredit.toFixed(4)} ÷ 12
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Annual Total Cost
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ${calculations.formattedDiscountedAnnualAmount}
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="line-through">
                        ${formatCurrency(calculations.standardAnnualAmount, 0)}{" "}
                        standard price
                      </span>
                      <span className="text-green-600 font-medium">
                        {calculations.discountSavingsPercentage}% off
                      </span>
                    </div>
                    <div className="text-blue-600 font-medium">
                      {commitmentTier}M credits ({calculations.volumeIncrease}%
                      more volume than current usage)
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Discount Savings
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${calculations.formattedDiscountSavings}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {calculations.discountSavingsPercentage}% off standard price
                    of ${formatCurrency(calculations.standardAnnualAmount, 0)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
          <Card className="border-destructive/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Cost of Not Switching
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-destructive/5 rounded-lg">
                <div className="text-3xl font-bold text-destructive">
                  ${calculations.formattedDiscountSavings}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Savings missed by not taking the{" "}
                  {calculations.discountPercentage}% discount on{" "}
                  {commitmentTier}M credits
                </div>
              </div>

              <ul className="space-y-2">
                {costOfNotSwitchingItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {item.icon}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Benefits of Annual Commitment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  ${calculations.formattedDiscountedMonthlyAmount}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Effective monthly cost vs. current $
                  {formatCurrency(currentMonthlySpend, 0)}/month
                  <div className="mt-1 text-green-600 font-medium">
                    Save $
                    {formatCurrency(
                      currentMonthlySpend -
                        calculations.discountedMonthlyAmount,
                      0,
                    )}
                    /month
                  </div>
                </div>
              </div>

              <ul className="space-y-2">
                {benefitItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {item.icon}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tiers" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="tiers">Discount Tiers</TabsTrigger>
          </TabsList>
          <TabsContent value="tiers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Volume-Based Discount Tiers</CardTitle>
                <CardDescription>
                  Commit to more volume and unlock higher discounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">
                          Annual Commitment
                        </th>
                        <th className="text-left py-3 px-4">
                          Price Per Credit
                        </th>
                        <th className="text-left py-3 px-4">Discount</th>
                        <th className="text-left py-3 px-4">Monthly Cost</th>
                        <th className="text-left py-3 px-4">Annual Cost</th>
                        <th className="text-left py-3 px-4">Annual Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {discountTierItems.map(
                        ({
                          tier,
                          index,
                          formattedDiscountedMonthlyCost,
                          formattedAnnualDiscountedCost,
                          formattedAnnualSavings,
                          hasProtection,
                          isSelected,
                        }) => (
                          <tr
                            key={index}
                            className={`border-b cursor-pointer ${isSelected ? "bg-primary/5 font-medium" : ""}`}
                            onClick={() => handleTierSelection(tier.threshold)}
                          >
                            <td className="py-3 px-4">
                              {tier.threshold}M Credits
                              {hasProtection && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-amber-100 text-amber-800 border-amber-200"
                                >
                                  Price Protection
                                </Badge>
                              )}
                              {isSelected && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-primary text-primary-foreground"
                                >
                                  Selected
                                </Badge>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              ${tier.pricePerCredit.toFixed(4)}
                            </td>
                            <td className="py-3 px-4">
                              {tier.discount * 100}%
                            </td>
                            <td className="py-3 px-4">
                              ${formattedDiscountedMonthlyCost}
                            </td>
                            <td className="py-3 px-4 font-medium">
                              ${formattedAnnualDiscountedCost}
                            </td>
                            <td className="py-3 px-4 text-green-600">
                              ${formattedAnnualSavings}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-primary/5 border-primary/20 mb-8">
          <CardHeader>
            <CardTitle>
              Get Started with Your {commitmentTier}M Credit Annual Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">
                  With a {calculations.discountPercentage}% discount (
                  {commitmentTier}M credit commitment):
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>
                      You'll save{" "}
                      <span className="font-bold">
                        ${calculations.formattedDiscountSavings}
                      </span>{" "}
                      annually compared to standard pricing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>
                      Your effective rate will be{" "}
                      <span className="font-bold">
                        ${calculations.applicableTier.pricePerCredit.toFixed(4)}
                      </span>{" "}
                      per credit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>
                      {calculations.discountPercentage >= 15 ? (
                        <>
                          <span className="font-bold bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                            Credit Price Protection
                          </span>{" "}
                          against future rate increases
                        </>
                      ) : (
                        <>
                          <span className="font-bold">Basic Rate Lock</span> for
                          12 months
                        </>
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col justify-center items-center p-4 bg-primary/10 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">
                  Annual Savings
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  ${calculations.formattedDiscountSavings}
                </div>
                <div className="text-sm text-muted-foreground">
                  {calculations.discountSavingsPercentage}% off standard price
                  of ${formatCurrency(calculations.standardAnnualAmount, 0)}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">
              View {commitmentTier}M Credit Annual Plan Details{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <DollarSign className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-semibold">Predictable Billing</h4>
                  <p className="text-sm text-muted-foreground">
                    Lock in your rates for the entire year
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-semibold">Priority Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Dedicated account management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Percent className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-semibold">Volume Discounts</h4>
                  <p className="text-sm text-muted-foreground">
                    Up to 30% off with higher volume
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Lock className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-semibold">Credit Price Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    Available on 15%+ discount tiers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnnualPlanBenefits;
