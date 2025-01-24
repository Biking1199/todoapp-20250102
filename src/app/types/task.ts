export type Task = {
  id: string;
  name: string;
  content: string;
  status: "完了" | "途中" | "未完了";
  created_at: string;
  user_id: string;
};
