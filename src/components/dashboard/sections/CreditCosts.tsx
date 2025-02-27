import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const CreditCosts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Cost Per Product</CardTitle>
        <CardDescription>
          Understanding the credit cost for each of our services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center mr-2 text-xs font-bold">
                1
              </span>
              Email Finder
            </h3>
            <p className="text-blue-700 text-sm">1 Credit = 1 Email Found</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center mr-2 text-xs font-bold">
                2
              </span>
              Email Validation
            </h3>
            <p className="text-purple-700 text-sm">
              1 Credit = 20 Email Validations
            </p>
          </div>

          <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-100">
            <h3 className="font-medium text-cyan-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-cyan-200 text-cyan-800 flex items-center justify-center mr-2 text-xs font-bold">
                3
              </span>
              Mobile Finder
            </h3>
            <p className="text-cyan-700 text-sm">5 Credits = 1 Mobile Found</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center mr-2 text-xs font-bold">
                4
              </span>
              Company Search
            </h3>
            <p className="text-green-700 text-sm">1 Credit = 1 Company Found</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h3 className="font-medium text-amber-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center mr-2 text-xs font-bold">
                5
              </span>
              Email to B2B Profile
            </h3>
            <p className="text-amber-700 text-sm">10 Credits = 1 Email Found</p>
          </div>

          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <h3 className="font-medium text-indigo-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center mr-2 text-xs font-bold">
                6
              </span>
              Competitors Search
            </h3>
            <p className="text-indigo-700 text-sm">
              5 Credits = 1 Group of Competitors
            </p>
          </div>

          <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
            <h3 className="font-medium text-pink-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-pink-200 text-pink-800 flex items-center justify-center mr-2 text-xs font-bold">
                7
              </span>
              Personal Email Finder
            </h3>
            <p className="text-pink-700 text-sm">
              2 Credits = 1 Personal Email
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h3 className="font-medium text-slate-800 mb-1">Important Note</h3>
            <p className="text-slate-700 text-sm">
              All our results come only on a successful result. You are only
              charged when we find what you're looking for.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCosts;
