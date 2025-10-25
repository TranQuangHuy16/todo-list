import {
  Calendar,
  CheckCircle2,
  Circle,
  Square,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Nhiệm vụ xóa thành công.");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi xóa task");
      toast.error("Lỗi xảy ra khi xóa task");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`Nhiệm vụ đã đổi thành ${updateTaskTitle}`);
      handleTaskChanged();
    } catch (error) {
      console.log("Lỗi xảy ra khi update task", error);
      toast.error("Lỗi xảy ra khi update nhiệm vụ");
    }
  };

  const toggleTaskCompleButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });

        toast.success(`${task.title} đã hoàn thành`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });

        toast.success(`${task.title} đã đổi sang trạng thái chưa hoàn thành`);
      }

      handleTaskChanged();
    } catch (error) {
      console.log("Lỗi xảy ra khi update task", error);
      toast.error("Lỗi xảy ra khi update nhiệm vụ");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full trasition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskCompleButton}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* hiển thị hoặc chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              autoFocus
              placeholder="Cần phải làm gì?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 "
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          {/* ngày tạo và ngày hoàn thành */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground">-</span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        </div>
        {/* nút chỉnh và nút xóa */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* button edit */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 trasition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* button delete */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 trasition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
