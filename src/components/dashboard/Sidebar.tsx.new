import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  ArrowRightCircle,
  Menu,
  X,
  Info,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  isMobile?: boolean;
  onMobileClose?: () => void;
  activePage?: string;
  onNavigate?: (page: string) => void;
}

const Sidebar = ({
  className,
  isMobile = false,
  onMobileClose = () => {},
  activePage = "executive-summary",
  onNavigate = () => {},
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const navigationItems = [
    {
      name: "Executive Summary",
      id: "executive-summary",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Usage Analysis",
      id: "usage-analysis",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Annual Plan Benefits",
      id: "annual-plan-benefits",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Next Steps",
      id: "next-steps",
      icon: <ArrowRightCircle className="h-5 w-5" />,
    },
    {
      name: "About LeadMagic",
      id: "about-leadmagic",
      icon: <Info className="h-5 w-5" />,
    },
  ];

  const handleNavigation = (pageId: string) => {
    onNavigate(pageId);
    if (isMobile) {
      onMobileClose();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64 lg:w-72",
        isMobile ? "fixed inset-y-0 left-0 z-50" : "",
        className,
      )}
    >
      {isMobile && (
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="text-white hover:bg-slate-800"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between p-6 pb-2">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              src="https://logo.clearbit.com/clay.com"
              alt="Clay Logo"
              className="h-10 w-10 object-cover rounded-md"
            />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h1 className="text-xl font-bold">Clay</h1>
              <p className="text-xs text-slate-400">Annual Pricing Proposal</p>
            </div>
          )}
        </div>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="px-6 py-2">
        <Separator className="my-4 bg-slate-700" />
      </div>

      <ScrollArea className="flex-1">
        <nav className="px-3 py-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = activePage === item.id;
              return collapsed ? (
                <TooltipProvider key={item.id}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <li>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          size="icon"
                          className={cn(
                            "w-full justify-center",
                            isActive
                              ? "bg-slate-800 text-white hover:bg-slate-700"
                              : "text-slate-400 hover:text-white hover:bg-slate-800",
                          )}
                          onClick={() => handleNavigation(item.id)}
                        >
                          {item.icon}
                        </Button>
                      </li>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <li key={item.id}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive
                        ? "bg-slate-800 text-white hover:bg-slate-700"
                        : "text-slate-400 hover:text-white hover:bg-slate-800",
                    )}
                    onClick={() => handleNavigation(item.id)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>

      <div className="p-6">
        <div
          className={cn(
            "rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-4",
            collapsed ? "items-center justify-center" : "",
          )}
        >
          {collapsed ? (
            <div className="flex flex-col items-center">
              <ArrowRightCircle className="h-6 w-6 text-white" />
              <span className="mt-2 text-xs font-medium text-white">Sign</span>
            </div>
          ) : (
            <>
              <h3 className="font-medium text-white">Prepared by LeadMagic</h3>
              <p className="mt-1 text-xs text-blue-100">
                <a
                  href="https://cal.com/team/leadmagic/strategy"
                  target="_blank"
                  className="hover:underline"
                >
                  Schedule a Meeting to Discuss
                </a>
              </p>
              <Button
                className="mt-3 w-full bg-white text-blue-600 hover:bg-blue-50"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://cal.com/team/leadmagic/strategy",
                    "_blank",
                  )
                }
              >
                Schedule Meeting
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
