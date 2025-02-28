import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
  Download,
} from "lucide-react";

interface NextStepsProps {
  companyName?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  proposalDate?: string;
  steps?: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
}

const NextSteps = ({
  companyName = "Clay.com",
  contactName = "Alex Johnson",
  contactEmail = "alex@clay.com",
  contactPhone = "(555) 123-4567",
  proposalDate = "February 27, 2024",
  steps = [
    {
      title: "Review Proposal",
      description:
        "Take time to review all details of this annual plan proposal",
      icon: <Check className="h-5 w-5" />,
    },
    {
      title: "Schedule Discussion",
      description:
        "Book a call with your account manager to discuss any questions",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Sign Agreement",
      description:
        "Complete the digital signature process for the annual agreement",
      icon: <ArrowRight className="h-5 w-5" />,
    },
    {
      title: "Onboarding",
      description:
        "Our team will guide you through the transition to the annual plan",
      icon: <Check className="h-5 w-5" />,
    },
  ],
}: NextStepsProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Next Steps</h1>
        <p className="text-gray-600 text-lg">
          Here's how to proceed with your annual plan proposal
        </p>
        <blockquote className="mt-3 border-l-4 border-blue-500 pl-4 italic text-gray-700">
          "No company has ever made it to the summit without successfully
          passing through basecamp first. Focus on the next 18 months — not the
          next 18 years."
          <footer className="text-sm text-gray-500 mt-1 not-italic">
            — Brett Berson, First Round Partner (advice to Varun Anand)
          </footer>
        </blockquote>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Your Path Forward</CardTitle>
            <CardDescription>
              Follow these steps to complete your transition to an annual plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    {step.icon || <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-start">
            <Button className="mr-4">
              Schedule Call
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open("https://cal.com/team/leadmagic/strategy", "_blank")
              }
            >
              Setup Meeting
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Founder LeadMagic</CardTitle>
            <CardDescription>
              Have questions? Your dedicated account manager is here to help
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 overflow-hidden">
                <img
                  src="https://media.licdn.com/dms/image/v2/C4E03AQGxINDEv6TrRw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1576561962695?e=1746057600&v=beta&t=fFb3hOGCBU0HC5qtUdYPLKA1piLRYAzOwloaty1KOkA"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Jesse Ouellette</h3>
                <p className="text-sm text-gray-500">Founder LeadMagic</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <span>jesse@leadmagic.io</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <span>(207) 944-1160</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">
                Company Details
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Company:</span>
                  <span className="font-medium">LeadMagic, Inc.</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Website:</span>
                  <span className="font-medium">leadmagic.io</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-medium">{companyName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Proposal Date:</span>
                  <span className="font-medium">{proposalDate}</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                window.open("https://cal.com/team/leadmagic/strategy", "_blank")
              }
            >
              Schedule Meeting
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xl font-bold text-primary mb-2">
                Ready to move forward?
              </h2>
              <p className="text-gray-600 max-w-xl">
                Enjoy the benefits of predictable pricing, priority support, and
                significant cost savings with an annual plan.
              </p>
            </div>
            <div class="md:mt-0">
              <Button size="lg" className="font-semibold">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* YouTube link in bottom corner */}
      <div className="fixed bottom-4 right-4 flex items-center bg-white rounded-full shadow-md border border-gray-200 px-3 py-2 hover:bg-gray-50 transition-colors">
        <a
          href="https://youtu.be/onmqgz9Kx5Q?list=PLxUsfasmudU6eprqs4t4-zcxBScTc6dfi&t=2740"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
            alt="YouTube"
            className="w-6 h-6 mr-2"
          />
          <span className="text-sm font-medium">
            Hear Varun talk about LeadMagic's Founder
          </span>
        </a>
      </div>
    </div>
  );
};

export default NextSteps;
