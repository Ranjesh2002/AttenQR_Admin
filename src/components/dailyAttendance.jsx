import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import adminApi from "@/utils/api";
import { toast } from "sonner";

export default function DownloadMonthlyAttendanceCSV({ month, year }) {
  const handleExport = async () => {
    try {
      const res = await adminApi.get(
        `/monthly-attendance/?month=${month}&year=${year}`
      );
      const data = res.data;

      if (!data || data.length === 0) {
        toast.error("No attendance data found for this month");
        return;
      }

      const studentMap = {};
      const TOTAL_CLASSES = 30;
      data.forEach((record) => {
        if (!studentMap[record.student_id]) {
          studentMap[record.student_id] = {
            Name: record.student_name,
            ID: record.student_id,
            Email: record.email,
            Class: `${record.department} - ${record.year}`,
            "Present Days": 0,
            "Absent Days": 0,
            "Late Days": 0,
            "Attendance %": 0,
            "Late %": 0,
            Remarks: "",
          };
        }
        studentMap[record.student_id]["Present Days"] += 1;
      });

      const csvData = Object.values(studentMap).map((student) => {
        student["Absent Days"] = TOTAL_CLASSES - student["Present Days"];
        student["Attendance %"] = Math.round(
          (student["Present Days"] / TOTAL_CLASSES) * 100
        );
        student["Late %"] = 0;

        if (student["Attendance %"] >= 90) student["Remarks"] = "Excellent";
        else if (student["Attendance %"] >= 75) student["Remarks"] = "Good";
        else if (student["Attendance %"] >= 60) student["Remarks"] = "Average";
        else student["Remarks"] = "Poor";

        return student;
      });

      const headers = Object.keys(csvData[0]).join(",");
      const rows = csvData
        .map((row) =>
          Object.values(row)
            .map((v) => `"${v}"`)
            .join(",")
        )
        .join("\n");
      const csvString = `${headers}\n${rows}`;

      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `Attendance_${month}_${year}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Attendance CSV downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export attendance CSV");
    }
  };

  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      Download Monthly CSV
    </Button>
  );
}
