"use client";

import { useData } from "@/context/DataContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CustomAreaChart from "@/components/CustomAreaChart";


function getCommentsPerMonth(comments) {
    const counts = {};
  
    comments?.forEach(({ commentData }) => {
      const date = new Date(commentData.publishedAt);
      const monthYear = date.toLocaleString("default", { month: "short", year: "numeric" });
  
      counts[monthYear] = (counts[monthYear] || 0) + 1;
    });
  
    return Object.keys(counts).map((month) => ({
        month,
        comments: counts[month],
      }));
  }
  
export default function Dashboard() {
    const {data }= useData();
    const chartData = getCommentsPerMonth(data?.classifiedComments);
  const agree = data?.classifiedComments.filter(
    (comment) => comment.sentiment === "Agree"
  ).length;
  const disagree = data?.classifiedComments.filter(
    (comment) => comment.sentiment === "Disagree"
  ).length;
  const neutral = data?.classifiedComments.filter(
    (comment) => comment.sentiment === "Neutral"
  ).length;

  const total = agree + disagree + neutral;
  const percentageAgree = ((agree / total) * 100).toFixed(2);
  const percentageDisagree = ((disagree / total) * 100).toFixed(2);
  const percentageNeutral = ((neutral / total) * 100).toFixed(2);
  console.log(agree, disagree, total);
  console.log(data);
  return (
    <div className="min-h-screen flex flex-col gap-12  p-16 bg-black">
      <h2 className="text-5xl text-white font-bold">Analysis Results</h2>
      <div className="grid grid-cols-2 gap-8 ">
        <Card className="grow px-6 py-8 bg-gray-800 backdrop:blur-sm text-white border-0">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-semibold">
              Sentiment Distribution
            </CardTitle>
          </CardHeader>
          <div className="flex justify-between">
            <span>Agree</span>
            <span>{percentageAgree}%</span>
          </div>
          <Progress
            value={percentageAgree}
            className=" [&>*]:bg-green-500   "
          />
          <div className="flex justify-between">
            <span>Disagree</span>
            <span>{percentageDisagree}%</span>
          </div>
          <Progress
            value={percentageDisagree}
            className=" [&>*]:bg-red-500   "
          />
          <div className="flex justify-between">
            <span>Neutral</span>
            <span>{percentageNeutral}%</span>
          </div>
          <Progress
            value={percentageNeutral}
            className=" [&>*]:bg-blue-500   "
          />
        </Card>
        <Card className="grow px-6 py-8 bg-gray-800 backdrop:blur-sm text-white border-0 ">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-semibold text-white">
              Comment Statistics
            </CardTitle>
          </CardHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className=" text-gray-300">Total Comments</p>
                <p className="text-4xl font-bold">{total}</p>
              </div>

              <div className="bg-green-900 p-4 rounded-lg">
                <p className=" text-green-300">Agree</p>
                <p className="text-4xl font-bold text-green-400">{agree}</p>
              </div>

              <div className="bg-red-900 p-4 rounded-lg">
                <p className="text-red-300">Disagree</p>
                <p className="text-4xl font-bold text-red-400">{disagree}</p>
              </div>

              <div className="bg-blue-900 p-4 rounded-lg">
                <p className="text-blue-300">Neutral</p>
                <p className="text-4xl font-bold text-blue-400">{neutral}</p>
              </div>
            </div>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <Card className="grow  px-6 py-8 bg-gray-800 backdrop:blur-sm text-white border-0">
        <CardHeader className="px-0">
            <CardTitle className="text-2xl font-semibold">
              Monthly Distribution
            </CardTitle>
          </CardHeader>
            <CustomAreaChart data={chartData} />
        </Card>
        <Card className="grow px-6 py-8 bg-gray-800 backdrop:blur-sm text-white border-0">
        <CardHeader className="px-0">
            <CardTitle className="text-2xl font-semibold">
              Top Keywords
            </CardTitle>
          </CardHeader>
          <div className= "flex gap-3 flex-wrap">
            {data?.keywords.map((keyword)=>{
                return <div key={keyword} className="bg-gray-700 px-3 py-1 rounded-xl">
                    <p className="text-gray-300 text-xl">{keyword}</p>
                    </div>
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
