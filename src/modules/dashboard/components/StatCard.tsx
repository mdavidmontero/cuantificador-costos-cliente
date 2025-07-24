import { Card, CardContent } from "@/components/ui/card";
import type { Color, StatCardProps } from "../types";
import { ArrowDownRight, ArrowUpRight, Badge } from "lucide-react";

export const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
  color = "blue",
}: StatCardProps) => {
  const colorClasses: Record<
    Color,
    {
      bg: string;
      icon: string;
      trend: string;
    }
  > = {
    blue: {
      bg: "from-blue-500 to-blue-600",
      icon: "bg-blue-100 text-blue-600",
      trend:
        trend === "up"
          ? "text-green-600 bg-green-50"
          : "text-red-600 bg-red-50",
    },
    green: {
      bg: "from-green-500 to-green-600",
      icon: "bg-green-100 text-green-600",
      trend:
        trend === "up"
          ? "text-green-600 bg-green-50"
          : "text-red-600 bg-red-50",
    },
    purple: {
      bg: "from-purple-500 to-purple-600",
      icon: "bg-purple-100 text-purple-600",
      trend:
        trend === "up"
          ? "text-green-600 bg-green-50"
          : "text-red-600 bg-red-50",
    },
    orange: {
      bg: "from-orange-500 to-orange-600",
      icon: "bg-orange-100 text-orange-600",
      trend:
        trend === "up"
          ? "text-green-600 bg-green-50"
          : "text-red-600 bg-red-50",
    },
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].bg} opacity-5`}
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center gap-2">
              <Badge
                className={`${colorClasses[color].trend} border-0 text-xs font-semibold`}
              >
                {trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                )}
                {change}
              </Badge>
              <span className="text-xs text-gray-500">vs período anterior</span>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color].icon}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
