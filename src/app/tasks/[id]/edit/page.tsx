"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../../utils/supabase";
import { Task } from "../../../../../types/task";

export default function EditTask({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching task:", error);
      } else {
        setTask(data);
      }
    };

    fetchTask();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    const { error } = await supabase
      .from("tasks")
      .update({ name: task.name, content: task.content, status: task.status })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task:", error);
    } else {
      router.push(`/tasks/${task.id}`);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タスク編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            タスク名 (50文字以内)
          </label>
          <input
            type="text"
            id="name"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            maxLength={50}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-2">
            内容 (100文字以内)
          </label>
          <textarea
            id="content"
            value={task.content}
            onChange={(e) => setTask({ ...task, content: e.target.value })}
            maxLength={100}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="status" className="block mb-2">
            ステータス
          </label>
          <select
            id="status"
            value={task.status}
            onChange={(e) =>
              setTask({
                ...task,
                status: e.target.value as "完了" | "途中" | "未完了",
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="未完了">未完了</option>
            <option value="途中">途中</option>
            <option value="完了">完了</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          更新
        </button>
      </form>
    </div>
  );
}
