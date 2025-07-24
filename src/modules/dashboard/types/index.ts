export interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  payload: {
    margenUtilidadUnitario: number;
  };
}

export interface PropsCustomTooltip {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export const CHART_COLORS = {
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#06B6D4",
  gradient: {
    blue: ["#3B82F6", "#1D4ED8"],
    purple: ["#8B5CF6", "#7C3AED"],
    green: ["#10B981", "#059669"],
    orange: ["#F59E0B", "#D97706"],
  },
};

export type Trend = "up" | "down";
export type Color = "blue" | "green" | "purple" | "orange";

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: Trend;
  color?: Color;
}
