import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import api from "@/lib/axios";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTastkCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("all");
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  // logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks");
    }
  };

  //biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  const handleTaskChange = () => {
    fetchTasks();
  };

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6"></div>
        {/* đầu trang  */}
        <Header />

        {/* tạo nhiệm vụ */}
        <AddTask handleNewTaskAdded={handleTaskChange} />

        {/* thống kê và bộ lọc */}
        <StatsAndFilters
          filter={filter}
          setFilter={setFilter}
          activeTasksCount={activeTastkCount}
          completedTasksCount={completedTaskCount}
        />

        {/* danh sách công việc */}
        <TaskList
          filterTasks={filteredTasks}
          filter={filter}
          handleTaskChanged={handleTaskChange}
        />

        {/* phân trang và lọc theo date */}
        <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row mb-5">
          <TaskListPagination />
          <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
        </div>
        {/* cuối trang */}
        <Footer
          activeTasksCount={activeTastkCount}
          completedTasksCount={completedTaskCount}
        />
      </div>
    </div>
  );
};

export default HomePage;
