import { FilterTypes } from "@/lib/data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StatsAndFilters = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center max-w-xl w-full justify-center mx-auto mb-6">
      {/* phần thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/50"
        >
          {activeTasksCount} {FilterTypes.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/50"
        >
          {completedTasksCount} {FilterTypes.completed}
        </Badge>
      </div>
      {/* filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(FilterTypes).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className="capitalize"
          >
            <Filter className="size-4" />
            {FilterTypes[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
