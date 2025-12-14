import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  User,
} from "lucide-react";
import adminApi from "@/utils/api";
import { toast } from "sonner";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [teac, setTeac] = useState([]);
  const [sess, setSess] = useState([]);
  const [stu, setStu] = useState([]);
  const [dep, setDep] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subjects: "",
  });
  const [editTeacher, setEditTeacher] = useState({
    name: "",
    email: "",
    phone_number: "",
    department: "",
    subject: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminApi.get("/total_teacher/");
        setTeac(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchSess = async () => {
      try {
        const res = await adminApi.get("/class-sessions/");
        setSess(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchStu = async () => {
      try {
        const res = await adminApi.get("/total_stu/");
        setStu(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchdep = async () => {
      try {
        const res = await adminApi.get("/total_departments/");
        setDep(res.data.departments);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
    fetchSess();
    fetchStu();
    fetchdep();
    fetchTeacher();
  }, []);

  const fetchTeacher = async () => {
    try {
      const res = await adminApi.get("/teachers/");
      setTeachers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTeacher = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(teacher.subjects)
        ? teacher.subjects.some((subject) =>
            subject.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : teacher.subject
        ? teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
        : false);

    const matchesDepartment =
      selectedDepartment === "" ||
      selectedDepartment === "all" ||
      teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const activeTeachers = teachers.filter((t) => t.status === "active").length;

  const generateTeacherId = () => {
    const existingIds = teachers.map((t) => parseInt(t.id.substring(1)));
    const maxId = Math.max(...existingIds);
    return `T${String(maxId + 1).padStart(3, "0")}`;
  };

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.department) {
      alert("Please fill in all required fields");
      return;
    }

    const teacherToAdd = {
      id: generateTeacherId(),
      name: newTeacher.name,
      email: newTeacher.email,
      phone: newTeacher.phone || "N/A",
      subjects: newTeacher.subjects
        ? newTeacher.subjects.split(",").map((s) => s.trim())
        : [],
      department: newTeacher.department,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      classesAssigned: 0,
      totalStudents: 0,
    };

    console.log("Adding new teacher:", teacherToAdd);
    setTeachers((prev) => [...prev, teacherToAdd]);
    setIsAddDialogOpen(false);
    setNewTeacher({
      name: "",
      email: "",
      phone: "",
      department: "",
      subject: "",
    });
  };

  const handleEditTeacher = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (teacher) {
      setEditingTeacher(teacher);

      setEditTeacher({
        name: teacher.name,
        email: teacher.email,
        phone_number: teacher.phone_number || teacher.phone || "",
        department: teacher.department,
        subject: teacher.subject || "",
        status: teacher.status || "active",
      });
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateTeacher = async () => {
    if (!editingTeacher) return;

    try {
      const updateData = {
        name: editTeacher.name,
        email: editTeacher.email,
        phone_number: editTeacher.phone_number,
        department: editTeacher.department,
        subject: editTeacher.subject,
        status: editTeacher.status,
      };

      await adminApi.put(`/update_teacher/${editingTeacher.id}/`, updateData);

      toast.success("Teacher updated successfully");
      setIsEditModalOpen(false);
      setEditingTeacher(null);
      setEditTeacher({
        name: "",
        email: "",
        phone_number: "",
        department: "",
        subject: "",
        status: "",
      });

      fetchTeacher();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed");
    }
  };

  const handleDeleteTeacher = (teacherId) => {
    setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User className="w-12 h-12  text-blue-600 shrink-0" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
            <p className="text-gray-600">
              Manage teacher profiles and assignments
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Teacher
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Teachers
            </h3>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{teac.length}</div>
          <p className="text-xs text-gray-500">
            {activeTeachers} active teachers
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Classes</h3>
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{sess.length}</div>
          <p className="text-xs text-gray-500">Classes assigned</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Students
            </h3>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stu.length}</div>
          <p className="text-xs text-gray-500">Students enrolled</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Departments</h3>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{dep.length}</div>
          <p className="text-xs text-gray-500">Active departments</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          >
            <option value="all">All departments</option>
            {dep.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Teachers List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subjects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeacher.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {teacher.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {teacher.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="mr-1 h-3 w-3" />
                        {teacher.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="mr-1 h-3 w-3" />
                        {teacher.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacher.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {teacher.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        teacher.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTeacher(teacher.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 border rounded-md hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="p-2 text-gray-600 hover:text-red-600 border rounded-md hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Add New Teacher</h2>
              <p className="text-gray-600 text-sm">
                Add a new teacher to the system. Fill in all required
                information.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, name: e.target.value })
                  }
                  placeholder="Enter teacher name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  placeholder="teacher@school.edu"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newTeacher.phone}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, phone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  value={newTeacher.department}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, department: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  {dep.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects (comma-separated)
                </label>
                <textarea
                  value={newTeacher.subjects}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, subjects: e.target.value })
                  }
                  placeholder="Mathematics, Statistics"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeacher}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && editingTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-h-[90vh]  max-w-md">
            <h2 className="text-lg font-semibold ">Edit Teacher</h2>

            <div className="space-y-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editTeacher.name}
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editTeacher.email}
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editTeacher.phone_number}
                  onChange={(e) =>
                    setEditTeacher({
                      ...editTeacher,
                      phone_number: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  value={editTeacher.department}
                  onChange={(e) =>
                    setEditTeacher({
                      ...editTeacher,
                      department: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  {dep.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects
                </label>
                <input
                  value={editTeacher.subject}
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, subject: e.target.value })
                  }
                  placeholder="subject"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  value={editTeacher.status}
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-5 mt-2">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingTeacher(null);
                  setEditTeacher({
                    name: "",
                    email: "",
                    phone_number: "",
                    department: "",
                    subject: "",
                    status: "",
                  });
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleUpdateTeacher}
              >
                Update Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
