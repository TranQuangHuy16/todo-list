import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = () => {
  let filter = "all";

  const filterTasks = [
    {
      _id: 1,
      title: "học react",
      status: "active",
      completedAt: null,
      createdAt: new Date(),
    },
    {
      _id: 2,
      title: "làm bài tập",
      status: "completed",
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  if (!filterTasks || filterTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }

  return (
    <div className="space-y-3 max-w-xl w-full justify-center mx-auto mb-6">
      {filterTasks.map((task, index) => (
        <TaskCard key={task._id ?? index} task={task} index={index} />
      ))}
    </div>
  );
};

export default TaskList;
