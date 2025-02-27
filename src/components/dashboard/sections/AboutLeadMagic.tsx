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
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Users,
  Award,
  Rocket,
  Zap,
  Youtube,
  ExternalLink,
  Ship,
} from "lucide-react";

interface AboutLeadMagicProps {}

const AboutLeadMagic = ({}: AboutLeadMagicProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          About LeadMagic
        </h1>
        <p className="text-gray-600 text-lg">
          Empowering GTM Engineers with powerful data enrichment tools
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>
                Building the future of GTM Engineering
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700">
                LeadMagic is a leading provider of data enrichment APIs designed
                specifically for GTM (Go-To-Market) Engineers. We empower sales
                and marketing professionals with the tools they need to build
                sophisticated outreach systems and automate their prospecting
                workflows.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Zap className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Data Enrichment APIs
                    </h3>
                    <p className="text-sm text-gray-600">
                      Powerful APIs for email finding, validation, mobile
                      numbers, and more
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      GTM Engineering Community
                    </h3>
                    <p className="text-sm text-gray-600">
                      Building a thriving community of sales and marketing
                      professionals
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Rocket className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Workflow Automation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tools to automate prospecting and outreach at scale
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <Award className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Enterprise Solutions
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tailored solutions for high-volume users with dedicated
                      support
                    </p>
                  </div>
                </div>
              </div>

              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                "We're building LeadMagic to empower the next generation of GTM
                Engineers - professionals who combine sales, marketing, and
                technical skills to build sophisticated outreach systems."
                <footer className="text-sm text-gray-500 mt-1 not-italic">
                  — Jesse Ouellette, Founder
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <img
                  src="https://logo.clearbit.com/leadmagic.io"
                  alt="LeadMagic Logo"
                  className="h-16"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Founded:</span>
                  <span className="font-medium">2022</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Headquarters:</span>
                  <span className="font-medium">Boston, MA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">Data Enrichment</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Specialization:</span>
                  <span className="font-medium">GTM Engineering</span>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold mb-2">Connect With Us</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      window.open("https://leadmagic.io", "_blank")
                    }
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        "https://cal.com/team/leadmagic/strategy",
                        "_blank",
                      )
                    }
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Meet Our Founder</CardTitle>
            <CardDescription>
              Jesse Ouellette - Founder of LeadMagic & SaaS Yacht Club
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://media.licdn.com/dms/image/v2/C4E03AQGxINDEv6TrRw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1576561962695?e=1746057600&v=beta&t=fFb3hOGCBU0HC5qtUdYPLKA1piLRYAzOwloaty1KOkA"
                  alt="Jesse Ouellette"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold">Jesse Ouellette</h3>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Founder & CEO
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    GTM Engineer
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center">
                    <img
                      src="https://logo.clearbit.com/linkedin.com"
                      alt="LinkedIn"
                      className="h-4 w-4 mr-1"
                    />
                    Sales Top Voice
                  </Badge>
                </div>

                <p className="text-gray-700 mb-4">
                  Jesse Ouellette is the founder of LeadMagic and SaaS Yacht
                  Club, a community for GTM Engineers. With a background in
                  sales, marketing, and engineering, Jesse has pioneered the
                  concept of GTM Engineering - combining technical skills with
                  sales and marketing expertise to build sophisticated outreach
                  systems.
                </p>

                <p className="text-gray-700 mb-4">
                  Under Jesse's leadership, LeadMagic has pivoted from an agency
                  to a SaaS company and grown to become a trusted provider of
                  data enrichment APIs for companies like Clay.com and other
                  leading sales and marketing teams. His vision is to empower
                  the next generation of GTM Engineers with the tools they need
                  to succeed in an increasingly technical sales landscape.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-1">
                      Advisor Roles
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Email Delivery Expert
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Advisor to SmartLead.ai
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Advisor to Trigify.io
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-1">
                      Success Story
                    </h4>
                    <p className="text-sm text-green-700">
                      Took Email Finder from 13th place to #1 in less than 9
                      months with a successful waterfall strategy.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mb-4">
                  <h4 className="font-semibold text-amber-800 mb-1">
                    Fun Facts
                  </h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                      Jesse was the reference for Eric Nowoslawski
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                      Father of 2 children (1 infant, 1 toddler)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                      Married and headquartered in Boston, MA
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/jesseouellette/",
                        "_blank",
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 mr-2 fill-current"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                    LinkedIn
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        "https://twitter.com/jesseouellette",
                        "_blank",
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 mr-2 fill-current"
                    >
                      <path d="M22 5.8a8.49 8.49 0 01-2.36.64 4.13 4.13 0 001.81-2.27 8.21 8.21 0 01-2.61 1 4.1 4.1 0 00-7 3.74 11.64 11.64 0 01-8.45-4.29 4.16 4.16 0 001.27 5.49 4.09 4.09 0 01-1.86-.52v.05a4.1 4.1 0 003.3 4 4.05 4.05 0 01-1.9.08 4.11 4.11 0 003.83 2.84A8.22 8.22 0 012 18.28a11.57 11.57 0 006.29 1.85A11.59 11.59 0 0020 8.45v-.53a8.43 8.43 0 002-2.12z" />
                    </svg>
                    Twitter
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                <Ship className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">SaaS Yacht Club</h3>
                <p className="text-gray-600">
                  In addition to LeadMagic, Jesse founded SaaS Yacht Club, a
                  community for GTM Engineers to share knowledge, strategies,
                  and tools. The community has become a hub for professionals
                  looking to combine technical skills with sales and marketing
                  expertise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Youtube className="h-5 w-5 mr-2 text-red-600" />
              Hear from Clay's COO about Jesse's Impact
            </CardTitle>
            <CardDescription>
              Varun Anand, COO of Clay.com, discusses Jesse's contribution to
              the GTM Engineering community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-md overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/onmqgz9Kx5Q?list=PLxUsfasmudU6eprqs4t4-zcxBScTc6dfi&start=2819"
                title="Varun Anand discusses Jesse Ouellette's impact"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-medium mb-2">About this Video</h3>
              <p className="text-gray-600 text-sm">
                In this segment, Varun Anand, COO of Clay.com, discusses how
                Jesse Ouellette has made a significant impact on the GTM
                Engineering community and helped shape the future of sales and
                marketing automation. The conversation highlights the importance
                of technical skills in modern sales processes and how LeadMagic
                has contributed to this evolution.
              </p>
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(
                      "https://youtu.be/onmqgz9Kx5Q?list=PLxUsfasmudU6eprqs4t4-zcxBScTc6dfi&t=2819",
                      "_blank",
                    )
                  }
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Watch on YouTube
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-2">
                Ready to learn more about LeadMagic?
              </h2>
              <p className="text-blue-700 max-w-xl">
                Schedule a meeting with our team to discuss how LeadMagic can
                help your organization with data enrichment and GTM engineering.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() =>
                  window.open(
                    "https://cal.com/team/leadmagic/strategy",
                    "_blank",
                  )
                }
              >
                Schedule a Meeting
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutLeadMagic;
