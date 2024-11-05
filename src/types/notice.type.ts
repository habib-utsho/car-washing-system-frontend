export type TNotice = {
  _id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  priority: "high" | "medium" | "low";
};
