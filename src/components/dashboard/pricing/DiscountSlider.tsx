import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Percent, DollarSign, TrendingUp } from "lucide-react";

interface DiscountSliderProps {
  initialDiscount?: number;
  minDiscount?: number;
  maxDiscount?: number;
  step?: number;
  basePrice?: number;
  onDiscountChange?: (discount: number) => void;
}

const DiscountSlider = ({
  initialDiscount = 10,
  minDiscount = 10,
  maxDiscount = 25,
  step = 1,
  basePrice = 10000,
  onDiscountChange,
}: DiscountSliderProps) => {
  const [discount, setDiscount] = useState(initialDiscount);
  const [savings, setSavings] = useState(0);
  const [creditRate, setCreditRate] = useState(0.008);
  const [discountedRate, setDiscountedRate] = useState(0);

  useEffect(() => {
    // Calculate savings based on discount
    const calculatedSavings = (basePrice * discount) / 100;
    setSavings(calculatedSavings);

    // Calculate discounted credit rate
    const newDiscountedRate = creditRate * (1 - discount / 100);
    setDiscountedRate(newDiscountedRate);

    // Notify parent component if callback is provided
    if (onDiscountChange) {
      onDiscountChange(discount);
    }
  }, [discount, basePrice, onDiscountChange]);

  const handleSliderChange = (value: number[]) => {
    setDiscount(value[0]);
  };

  // Define discount tiers with their benefits
  const discountTiers = [
    { value: 10, label: "Standard", color: "blue" },
    { value: 20, label: "Pro", color: "purple" },
    { value: 30, label: "Enterprise", color: "green" },
  ];

  // Find the current tier based on discount value
  const currentTier =
    discountTiers.find((tier) => tier.value === discount) ||
    discountTiers.reduce((prev, curr) =>
      Math.abs(curr.value - discount) < Math.abs(prev.value - discount)
        ? curr
        : prev,
    );

  return (
    <Card className="w-full max-w-3xl bg-white shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">
            Annual Plan Discount
          </CardTitle>
          <Badge
            variant="outline"
            className={`flex items-center gap-1 px-3 py-1 text-lg font-semibold bg-${currentTier.color}-50 text-${currentTier.color}-700 border-${currentTier.color}-200`}
          >
            <Percent className="h-4 w-4" />
            {discount}% - {currentTier.label}
          </Badge>
        </div>
        <CardDescription>
          Adjust the discount percentage to see updated savings on your annual
          plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="pt-4">
          <Slider
            defaultValue={[discount]}
            value={[discount]}
            min={minDiscount}
            max={maxDiscount}
            step={step}
            onValueChange={handleSliderChange}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            {discountTiers.map((tier) => (
              <div
                key={tier.value}
                className={`flex flex-col items-center ${discount === tier.value ? `text-${tier.color}-600 font-medium` : ""}`}
                onClick={() => setDiscount(tier.value)}
              >
                <span>{tier.value}%</span>
                <span className="text-xs">{tier.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Monthly Equivalent:</span>
            <span className="font-semibold flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {basePrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">Monthly Savings:</span>
            <span className="font-semibold flex items-center text-green-600">
              <DollarSign className="h-4 w-4 mr-1" />
              {savings.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">Current Credit Rate:</span>
            <span className="font-semibold flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {creditRate.toFixed(6)}/credit
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t">
            <span className="text-sm font-medium">Discounted Rate:</span>
            <span className="font-bold flex items-center text-green-600">
              <DollarSign className="h-4 w-4 mr-1" />
              {discountedRate.toFixed(6)}/credit
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t">
            <span className="text-sm font-medium">New Monthly Cost:</span>
            <span className="font-bold flex items-center text-lg">
              <DollarSign className="h-5 w-5 mr-1" />
              {(basePrice - savings).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-green-50 p-4 border border-green-100">
          <div className="flex items-start">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-800">
                Annual Savings Projection
              </h4>
              <p className="text-green-700 text-sm mt-1">
                At your current growth rate, locking in a {discount}% discount
                now could save you up to ${(savings * 12).toLocaleString()} over
                the next 12 months.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 text-sm text-muted-foreground rounded-b-lg">
        <p>
          Drag the slider to adjust your discount or click on a tier level.
          Higher discounts are available with our Enterprise annual commitment.
        </p>
      </CardFooter>
    </Card>
  );
};

export default DiscountSlider;
