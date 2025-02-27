import React, { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import DashboardContent from "./dashboard/DashboardContent";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

interface HomeProps {
  clientName?: string;
}

const Home = ({ clientName = "Clay.com" }: HomeProps) => {
  const [activeSection, setActiveSection] = useState<
    | "executive-summary"
    | "usage-analysis"
    | "annual-plan-benefits"
    | "next-steps"
    | "about-leadmagic"
  >("executive-summary");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (section: string) => {
    setActiveSection(section as typeof activeSection);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-white shadow-md border-gray-200"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar - hidden on mobile unless menu is open */}
      <div className="hidden lg:block h-full">
        <Sidebar activePage={activeSection} onNavigate={handleNavigation} />
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <Sidebar
          isMobile={true}
          activePage={activeSection}
          onNavigate={handleNavigation}
          onMobileClose={closeMobileMenu}
        />
      )}

      {/* Main content */}
      <div className="flex-1 h-full overflow-hidden">
        <DashboardContent
          clientName={clientName}
          activeSection={activeSection}
        />
      </div>
    </div>
  );
};

export default Home;
