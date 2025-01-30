"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Link from "next/link";
import { Task } from "./types/task";
import { useRouter } from "next/navigation";
import SignOutButton from "./components/signout/signout";

export default function Home() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session || !session.user) {
        setMessage("ログインセッションがありません。ログインしてください。");
        setIsLoading(false);
        router.replace("/components/signin");
        return;
      }
      const user = session.user;

      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        setMessage("タスクの取得に失敗しました。");
      } else {
        setTasks(tasks);
      }
      setIsLoading(false);
    };
    fetchTasks();
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
      <div>
        <Link
          href="/tasks/create"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          新規タスク作成
        </Link>
        <Link
          href="/components/signup"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          サインアップ
        </Link>
        <Link
          href="components/signin"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          サインイン
        </Link>
        <SignOutButton />
      </div>

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
