import React, { useState, useEffect, useMemo } from "react";
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
  Download,
  PieChart,
  TrendingUp,
  AlertCircle,
  Clock,
  DollarSign,
  Sparkles,
  Percent,
  CheckCircle,
  AlertTriangle,
  Lock,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

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
  const [commitmentTier, setCommitmentTier] = useState(40);
  const [paymentOption, setPaymentOption] = useState("annual");

  // Current usage data
  const currentAnnualCredits = projectedAnnualCredits;
  const currentMonthlyCredits = currentAnnualCredits / 12;
  const currentAnnualSpend = currentMonthlySpend * 12;

  // Discount tiers (in millions of credits)
  const discountTiers = [
    { threshold: 40, discount: 0.1, pricePerCredit: 0.0072 },
    { threshold: 50, discount: 0.15, pricePerCredit: 0.0068 },
    { threshold: 60, discount: 0.2, pricePerCredit: 0.0064 },
    { threshold: 75, discount: 0.25, pricePerCredit: 0.006 },
    { threshold: 90, discount: 0.3, pricePerCredit: 0.0056 },
  ];

  // Calculate the applicable discount based on commitment tier
  const getApplicableDiscount = (commitmentInMillions: number) => {
    for (let i = discountTiers.length - 1; i >= 0; i--) {
      if (commitmentInMillions >= discountTiers[i].threshold) {
        return discountTiers[i];
      }
    }
    return discountTiers[0];
  };

  // Calculate pricing and savings
  const calculations = useMemo(() => {
    const commitmentCredits = commitmentTier * 1000000;
    const applicableTier = getApplicableDiscount(commitmentTier);

    // Calculate monthly and annual plan costs based on the selected tier
    const monthlyPlanCost = 40800; // $40,800 base monthly cost at standard rate
    const yearlyPlanCost = monthlyPlanCost * 12; // $489,600 yearly cost at standard rate

    // Calculate annual plan cost based on the discount tier
    const discountPercentage = applicableTier.discount * 100;
    const annualPlanCost = monthlyPlanCost * (1 - applicableTier.discount);
    const savings = monthlyPlanCost - annualPlanCost;
    const savingsPercentage = (savings / monthlyPlanCost) * 100;

    // Calculate annual savings
    const annualSavings = savings * 12;

    // Calculate the effective monthly cost
    const effectiveMonthlyRate = applicableTier.pricePerCredit;
    const effectiveMonthlyPlanCost = annualPlanCost;

    // Calculate the cost of staying at current usage
    const currentUsageTier = getApplicableDiscount(
      currentAnnualCredits / 1000000,
    );
    const currentUsageAnnualCost =
      currentAnnualCredits * currentUsageTier.pricePerCredit;
    const currentUsageSavings =
      currentAnnualCredits * 0.008 - currentUsageAnnualCost;

    // Calculate the additional savings from increasing commitment
    const additionalSavings =
      commitmentCredits > currentAnnualCredits
        ? annualSavings - currentUsageSavings
        : 0;

    // Calculate the cost of not taking the annual plan (opportunity cost)
    // This is the annual savings amount
    const opportunityCost = yearlyPlanCost * applicableTier.discount;

    // Calculate the equivalent months of free service
    const freeMonthsEquivalent = annualSavings / monthlyPlanCost;

    return {
      commitmentCredits,
      applicableTier,
      monthlyPlanCost,
      yearlyPlanCost,
      annualPlanCost,
      savings,
      annualSavings,
      savingsPercentage,
      effectiveMonthlyRate,
      effectiveMonthlyPlanCost,
      currentUsageAnnualCost,
      currentUsageSavings,
      additionalSavings,
      opportunityCost,
      freeMonthsEquivalent,
      discountPercentage,
    };
  }, [commitmentTier, currentAnnualCredits, currentAnnualSpend]);

  return (
    <div className="w-full h-full bg-slate-50 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Annual Plan Benefits
          </h1>
          <p className="text-gray-600 mt-2">
            Lock in your credit rate now and save significantly as your usage
            continues to grow
          </p>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-amber-200 bg-amber-50">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">
                Your Usage Is Growing Rapidly
              </h3>
              <p className="text-amber-700">
                Based on your current growth trajectory, we project your annual
                credit usage to reach approximately{" "}
                {projectedAnnualCredits.toLocaleString()} credits. At your
                current rate of ${currentCreditRate} per credit, this would cost
                ${currentAnnualSpend.toLocaleString()} annually.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Monthly Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    ${calculations.monthlyPlanCost.toLocaleString()}
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
              <CardTitle className="text-lg">Projected Annual Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    ${calculations.yearlyPlanCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Without annual discount
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Potential Annual Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Sparkles className="h-8 w-8 text-white mr-3" />
                <div>
                  <p className="text-3xl font-bold">
                    ~$
                    {calculations.opportunityCost.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-sm text-green-100">
                    With {calculations.discountPercentage.toFixed(0)}% annual
                    discount
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20 mb-8">
          <CardHeader>
            <CardTitle>Volume-Based Annual Commitment</CardTitle>
            <CardDescription>
              Commit to more volume upfront and unlock higher discount tiers
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
                  defaultValue={[40]}
                  value={[commitmentTier]}
                  min={40}
                  max={100}
                  step={5}
                  onValueChange={(value) => setCommitmentTier(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>40M</span>
                  <span>55M</span>
                  <span>70M</span>
                  <span>85M</span>
                  <span>100M</span>
                </div>
                <div className="flex items-center justify-center text-xs text-primary font-medium mt-2">
                  <span>Current usage: 5.1M credits</span>
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="h-4 w-4" />
                    <span>Current annual usage: 5.1M credits</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 mt-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>
                      Base annual savings: ~$
                      {calculations.opportunityCost.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Your Discount Tier
                  </span>
                  <Badge className="text-lg px-3 py-1.5 bg-primary">
                    <Percent className="mr-1 h-4 w-4" />
                    {calculations.discountPercentage.toFixed(0)}% Off
                  </Badge>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1">
                  {discountTiers.map((tier, index) => (
                    <div
                      key={index}
                      className={`text-center p-2 rounded-md cursor-pointer ${commitmentTier >= tier.threshold ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      onClick={() => setCommitmentTier(tier.threshold)}
                    >
                      <div className="text-xs">{tier.threshold}M+</div>
                      <div className="font-bold">
                        {(tier.discount * 100).toFixed(0)}%
                      </div>
                      {tier.threshold >= 50 && (
                        <div className="text-xs mt-1 bg-amber-200 text-amber-800 px-1 rounded-sm font-medium">
                          Credit Price Lock
                        </div>
                      )}
                    </div>
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
                Annual Commitment Summary
              </h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Monthly Plan Cost
                  </div>
                  <div className="text-2xl font-bold">
                    $
                    {calculations.monthlyPlanCost.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    $0.008 per credit
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Annual Plan Cost
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    $
                    {calculations.annualPlanCost.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${calculations.applicableTier.pricePerCredit.toFixed(4)} per
                    credit
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Your Savings
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ~$
                    {calculations.opportunityCost.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {calculations.savingsPercentage.toFixed(1)}% discount
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
                  ~$
                  {calculations.opportunityCost.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Money left on the table by staying with monthly billing
                </div>
              </div>

              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <span>
                    You'll lose{" "}
                    <span className="font-bold">
                      ~$
                      {calculations.opportunityCost.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </span>{" "}
                    in potential savings this year
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <span>
                    That's like missing out on{" "}
                    <span className="font-bold">
                      {calculations.freeMonthsEquivalent.toFixed(1)} months
                    </span>{" "}
                    of free service!
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <span>No protection against potential price increases</span>
                </li>
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
                  $
                  {(calculations.annualPlanCost / 12).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Effective monthly cost ($
                  {calculations.applicableTier.pricePerCredit.toFixed(4)} per
                  credit)
                </div>
              </div>

              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>
                    <span className="font-bold bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                      Price Protection:
                    </span>{" "}
                    Lock in per-API credit prices for the entire year
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>
                    Save{" "}
                    <span className="font-bold">
                      ~$
                      {calculations.opportunityCost.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </span>{" "}
                    compared to monthly billing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>
                    Priority API access and dedicated account management
                  </span>
                </li>
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
                <div className="overflow-x-auto -mx-6 px-6">
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
                        <th className="text-left py-3 px-4">
                          Annual Cost Example
                        </th>
                        <th className="text-left py-3 px-4">
                          Savings vs. Monthly
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {discountTiers.map((tier, index) => {
                        const tierCredits = tier.threshold * 1000000;
                        const nextTierThreshold =
                          index < discountTiers.length - 1
                            ? discountTiers[index + 1].threshold
                            : tier.threshold + 15;
                        const exampleCredits = tier.threshold * 1000000;
                        const monthlyPrice = exampleCredits * 0.008;
                        const annualPrice =
                          exampleCredits * tier.pricePerCredit;
                        const savings = monthlyPrice - annualPrice;
                        const yearlyStandardCost = calculations.yearlyPlanCost;
                        const yearlySavings =
                          yearlyStandardCost * tier.discount;

                        return (
                          <tr
                            key={index}
                            className={`border-b ${commitmentTier >= tier.threshold && (index === discountTiers.length - 1 || commitmentTier < discountTiers[index + 1].threshold) ? "bg-primary/5" : ""}`}
                            onClick={() => setCommitmentTier(tier.threshold)}
                          >
                            <td className="py-3 px-4 font-medium">
                              {tier.threshold}M - {nextTierThreshold}M Credits
                              {index > 0 && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-amber-100 text-amber-800 border-amber-200"
                                >
                                  Credit Lock Protection
                                </Badge>
                              )}
                              {commitmentTier >= tier.threshold &&
                                (index === discountTiers.length - 1 ||
                                  commitmentTier <
                                    discountTiers[index + 1].threshold) && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-primary text-primary-foreground"
                                  >
                                    Current Tier
                                  </Badge>
                                )}
                            </td>
                            <td className="py-3 px-4">
                              ${tier.pricePerCredit.toFixed(4)}
                            </td>
                            <td className="py-3 px-4">
                              {(tier.discount * 100).toFixed(0)}%
                            </td>
                            <td className="py-3 px-4">
                              $
                              {(
                                exampleCredits * tier.pricePerCredit
                              ).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-green-600">
                              $
                              {yearlySavings.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}{" "}
                              ({(tier.discount * 100).toFixed(0)}%)
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    * Pricing shown is for illustration. Your actual savings
                    will depend on your specific usage patterns.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-primary/5 border-primary/20 mb-8">
          <CardHeader>
            <CardTitle>Your Personalized Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">
                Based on your current usage of 5.1M credits annually
              </h3>
              <p className="mb-4">
                We recommend committing to{" "}
                <span className="font-bold text-primary">
                  {commitmentTier}M credits
                </span>{" "}
                to maximize your savings with a{" "}
                <span className="font-bold text-primary">
                  {calculations.discountPercentage.toFixed(0)}% discount
                </span>
                .
              </p>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">With this commitment:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        You'll save{" "}
                        <span className="font-bold">
                          ~$
                          {calculations.opportunityCost.toLocaleString(
                            "en-US",
                            {
                              maximumFractionDigits: 0,
                            },
                          )}
                        </span>{" "}
                        annually
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        Your effective rate will be{" "}
                        <span className="font-bold">
                          $
                          {calculations.applicableTier.pricePerCredit.toFixed(
                            4,
                          )}
                        </span>{" "}
                        per credit
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        That's equivalent to{" "}
                        <span className="font-bold">
                          {calculations.freeMonthsEquivalent.toFixed(1)} months
                        </span>{" "}
                        of free service
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col justify-center items-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    Annual Savings
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    ~$
                    {calculations.opportunityCost.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {calculations.savingsPercentage.toFixed(1)}% off standard
                    pricing
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">
              Get Your Custom Annual Plan{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-semibold">Strategic Advantages</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <DollarSign className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Predictable Billing</h4>
                    <p className="text-sm text-muted-foreground">
                      Lock in your rates for the entire year and simplify
                      budgeting with upfront annual billing.
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
                      Get dedicated account management and priority technical
                      support for all your needs.
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
                      Receive significant discounts on your high-volume usage
                      across all data enrichment services.
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
                    <h4 className="font-semibold">Rate Protection</h4>
                    <p className="text-sm text-muted-foreground">
                      Protect yourself against future rate increases with our
                      guaranteed price lock for 12 months.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-blue-50 border-blue-100 shadow-sm mb-8">
          <CardContent className="p-5">
            <div className="flex items-center">
              <Clock className="h-10 w-10 text-blue-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">
                  Limited Time Offer
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  Lock in your annual discount within 30 days and start saving
                  immediately. Any additional usage beyond your commitment will
                  be billed at your discounted rate.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Lock In Your Rate Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800 mb-1">
                Top-Up Credits Policy
              </h3>
              <p className="text-amber-700">
                If you exceed your annual commitment, additional credits will be
                billed at your discounted tier rate. This ensures you maintain
                your savings even as your usage grows beyond initial
                projections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualPlanBenefits;
