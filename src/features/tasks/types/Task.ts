export type TaskStatus = "pending" | "completed";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  impact: number;
  confidence: number;
  effort: number;
  iceScore: number;
  aiSummary: string;
};
