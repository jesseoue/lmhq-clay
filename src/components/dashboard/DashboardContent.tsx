import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ExecutiveSummary from "./sections/ExecutiveSummary";
import UsageAnalysis from "./sections/UsageAnalysis";
import AnnualPlanBenefits from "./sections/AnnualPlanBenefits";
import NextSteps from "./sections/NextSteps";
import AboutLeadMagic from "./sections/AboutLeadMagic";

interface DashboardContentProps {
  clientName?: string;
  activeSection?:
    | "executive-summary"
    | "usage-analysis"
    | "annual-plan-benefits"
    | "next-steps"
    | "about-leadmagic";
}

const DashboardContent = ({
  clientName = "Clay.com",
  activeSection = "executive-summary",
}: DashboardContentProps) => {
  const [currentSection, setCurrentSection] = useState(activeSection);

  // This function handles navigation from the parent component
  const handleSectionChange = (section: typeof currentSection) => {
    setCurrentSection(section);
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeSection} className="w-full h-full">
          <TabsContent value="executive-summary" className="mt-0 h-full">
            <ExecutiveSummary clientName={clientName} />
          </TabsContent>

          <TabsContent value="usage-analysis" className="mt-0 h-full">
            <UsageAnalysis />
          </TabsContent>

          <TabsContent value="annual-plan-benefits" className="mt-0 h-full">
            <AnnualPlanBenefits clientName={clientName} />
          </TabsContent>

          <TabsContent value="next-steps" className="mt-0 h-full">
            <NextSteps companyName={clientName} />
          </TabsContent>

          <TabsContent value="about-leadmagic" className="mt-0 h-full">
            <AboutLeadMagic />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardContent;
