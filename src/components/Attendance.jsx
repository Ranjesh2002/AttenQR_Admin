import { useState } from "react";
import { Eye, Users, Clock } from "lucide-react";

const todaysAttendance = [
  {
    id: 1,
    subject: "Mathematics",
    teacher: "Dr. Smith",
    date: "2024-01-15",
    time: "09:00 AM",
    presentCount: 28,
    absentCount: 5,
    totalStudents: 33,
  },
  {
    id: 2,
    subject: "Physics",
    teacher: "Prof. Johnson",
    date: "2024-01-15",
    time: "10:30 AM",
    presentCount: 31,
    absentCount: 2,
    totalStudents: 33,
  },
  {
    id: 3,
    subject: "Chemistry",
    teacher: "Dr. Williams",
    date: "2024-01-15",
    time: "02:00 PM",
    presentCount: 25,
    absentCount: 8,
    totalStudents: 33,
  },
  {
    id: 4,
    subject: "Biology",
    teacher: "Prof. Davis",
    date: "2024-01-15",
    time: "03:30 PM",
    presentCount: 30,
    absentCount: 3,
    totalStudents: 33,
  },
];

export default function Attendance() {
  const [selectedSession, setSelectedSession] = useState(null);

  const getAttendanceRate = (present, total) => {
    return Math.round((present / total) * 100);
  };

  const getAttendanceBadge = (rate) => {
    if (rate >= 90)
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
          Excellent
        </span>
      );
    if (rate >= 75)
      return (
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
          Good
        </span>
      );
    if (rate >= 60)
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
          Average
        </span>
      );
    return (
      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
        Poor
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl shadow-sm bg-white p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 bg-blue-50 p-2 rounded-lg" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">
                Total Sessions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {todaysAttendance.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-sm bg-white p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-600 bg-green-50 p-2 rounded-lg" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">
                Avg Attendance
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(
                  todaysAttendance.reduce(
                    (acc, curr) =>
                      acc + (curr.presentCount / curr.totalStudents) * 100,
                    0
                  ) / todaysAttendance.length
                )}
                %
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-sm bg-white p-4">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-orange-600 bg-orange-50 p-2 rounded-lg" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">
                Low Attendance
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  todaysAttendance.filter(
                    (session) =>
                      (session.presentCount / session.totalStudents) * 100 < 75
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl shadow-sm bg-white p-11">
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-900">
            Today's Attendance
          </p>
          <p className="text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="text-left text-gray-700 font-semibold p-2">
                  Subject
                </th>
                <th className="text-left text-gray-700 font-semibold p-2">
                  Teacher
                </th>
                <th className="text-left text-gray-700 font-semibold p-2">
                  Time
                </th>
                <th className="text-left text-gray-700 font-semibold p-2">
                  Present
                </th>
                <th className="text-left text-gray-700 font-semibold p-2">
                  Absent
                </th>
                <th className="text-left text-gray-700 font-semibold p-2">
                  Rate
                </th>
                <th className="text-left text-gray-700 font-semibold p-2">
                  Status
                </th>
                <th className="text-left text-gray-700 font-semibold p-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {todaysAttendance.map((session) => {
                const rate = getAttendanceRate(
                  session.presentCount,
                  session.totalStudents
                );
                return (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">
                      {session.subject}
                    </td>
                    <td className="p-4 text-gray-600">{session.teacher}</td>
                    <td className="p-4 text-gray-600">{session.time}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {session.presentCount}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {session.absentCount}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{rate}%</td>
                    <td className="p-4">{getAttendanceBadge(rate)}</td>
                    <td className="p-4">
                      <button
                        className="flex items-center text-sm text-blue-600 hover:underline"
                        onClick={() => setSelectedSession(session.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
