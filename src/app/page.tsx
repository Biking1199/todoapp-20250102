"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Link from "next/link";
import { Task } from "./types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();

    // リアルタイム更新のためのサブスクリプション
    const subscription = supabase
      .channel("tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data || []);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
      <Link
        href="/tasks/create"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        新規タスク作成
      </Link>
      <ul className="mt-4">
        <div className="flex items-center justify-between  mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            タスク名
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ステータス
          </label>
        </div>
        {tasks.map((task: Task) => (
          <li
            key={task.id}
            className="border p-4 mb-2 flex justify-between items-center "
          >
            <Link
              href={`/tasks/${task.id}`}
              className="font-bold text-blue-500"
            >
              {task.name}
            </Link>
            <p className="">{task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
