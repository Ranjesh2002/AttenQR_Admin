import { Users, TrendingUp, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const statsData = [
  {
    title: "Average Attendance",
    value: "87.3%",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Students",
    value: "1,247",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Low Attendance",
    value: "23",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const recentActivity = [
  {
    name: "Ranjesh Thakur",
    action: "marked present",
    time: "10:00 AM",
    subject: "Database",
  },
  {
    name: "Sumit Ray ",
    action: "marked present",
    time: "09:45 AM",
    subject: "Database",
  },
  {
    name: "Ratik Bajracharya",
    action: "marked absent",
    time: "09:30 AM",
    subject: "Database",
  },
  {
    name: "Aadarsha Sunam",
    action: "marked present",
    time: "09:15 AM",
    subject: "Database",
  },
  {
    name: "Niraj Chaudhary",
    action: "marked present",
    time: "09:00 AM",
    subject: "Database",
  },
];
const attendanceTrendData = [
  { day: "Mon", attendance: 85 },
  { day: "Tue", attendance: 92 },
  { day: "Wed", attendance: 78 },
  { day: "Thu", attendance: 89 },
  { day: "Fri", attendance: 94 },
  { day: "Sat", attendance: 87 },
  { day: "Sun", attendance: 82 },
];
const subjectWiseData = [
  { name: "Mathematics", value: 92, color: "#3B82F6" },
  { name: "Physics", value: 88, color: "#10B981" },
  { name: "Chemistry", value: 85, color: "#F59E0B" },
  { name: "Biology", value: 90, color: "#EF4444" },
  { name: "English", value: 87, color: "#8B5CF6" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="rounded-xl shadow-sm bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Weekly Attendance Trend
            </CardTitle>
            <CardDescription className="text-gray-500">
              Average attendance percentage by day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="attendance"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Subject-wise Attendance
            </CardTitle>
            <CardDescription className="text-gray-500">
              Attendance distribution across subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectWiseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {subjectWiseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="rounded-xl shadow-sm bg-white p-4">
        <p className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </p>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    <span className="font-semibold">{activity.name}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.subject}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{activity.time}</span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    activity.action.includes("present")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {activity.action.includes("present") ? "Present" : "Absent"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
