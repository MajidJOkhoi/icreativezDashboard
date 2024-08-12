import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Eye, Star, Calendar, FileText, Clipboard, Badge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [leaves, setLeaves] = useState(0);

  // Simulate data fetching with animations
  useEffect(() => {
    const animateValue = (setValue, targetValue, duration) => {
      let start = 0;
      const stepTime = Math.abs(Math.floor(duration / targetValue));
      const step = () => {
        start += 1;
        setValue(start);
        if (start < targetValue) {
          setTimeout(step, stepTime);
        }
      };
      step();
    };

    animateValue(setProjectCount, 12, 1500);
    animateValue(setUserCount, 50, 1500);
    animateValue(setPresent, 80, 1500);
    animateValue(setAbsent, 20, 1500);
    animateValue(setLeaves, 10, 1500);
  }, []);

  const cardsData = [
    {
      title: "Users Info",
      description: "Total users in your organization",
      value: userCount,
      color: "green",
      link: "/dashboard/team",
      icon: <Clipboard className="text-green-400 h-8 w-8" />,
    },
    {
      title: "Active Projects",
      description: "Projects you are currently managing",
      value: projectCount,
      color: "blue",
      link: "/dashboard/projects",
      icon: <User className="text-blue-400 h-8 w-8" />,
    },
    {
      title: "Attendance",
      description: "Current attendance percentage",
      value: `p ${present}%  a ${absent}%`,
      color: "purple",
      link: "/dashboard/attendance",
      icon: <Eye className="text-purple-400 h-8 w-8 " />,
    },
    {
      title: "Leaves Taken",
      description: "Number of leaves taken this month",
      value: leaves,
      color: "orange",
      link: "/dashboard/leaves",
      icon: <Calendar className="text-orange-400 h-8 w-8" />,
    },
    {
      title: "Pending Tasks",
      description: "Tasks that are yet to be completed",
      value: 7,
      color: "red",
      link: "/dashboard/performance",
      icon: <FileText className="text-red-400 h-8 w-8 " />,
    },
    {
      title: "Completed Tasks",
      description: "Tasks completed this month",
      value: 28,
      color: "yellow",
      link: "/dashboard/performance",
      icon: <Star className="text-yellow-400 h-8 w-8 " />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
      {cardsData.map((card, index) => (
        <Link to={card.link} key={index}>
          <Card className="rounded-3xl p-4 border-2">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-2xl font-semibold mb-2">{card.title}</CardTitle>
              <div className="flex items-center justify-center">
                {card.icon}
              </div>
              <div className="flex items-center justify-center space-x-2">
                {card.title === "Attendance" ? (
                  <>
                    <Button variant="outline"  className="text-[#BA0D09] hover:text-[#BA0D09]  text-xl font-bold  ">
                      Pres {present}%
                    </Button>
                    
                    <Button variant="outline" className="text-[#BA0D09]  hover:text-[#BA0D09]  text-xl font-bold">
                       Abs {absent}%
                    </Button>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-[#BA0D09]">
                    {card.value}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center ">{card.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Home;
