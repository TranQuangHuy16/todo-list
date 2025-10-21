import { Circle } from "lucide-react";
import { Card } from "./ui/card";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md max-w-xl w-full justify-center mx-auto mb-6">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "Không có nhiệm nào đang làm."
              : filter === "completed"
              ? "Chưa có nhiệm nào hoàn thành"
              : "Chưa có nhiệm vụ"}
          </h3>

          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Thêm nhiệm vụ đầu tiên để bắt đầu"
              : `Chuyển sang "tất cả" để thấy nhiệm vụ ${
                  filter === "active" ? "Đã hoàn thành" : "Đang làm "
                } `}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
