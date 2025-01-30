"use client";
import React from "react";
import { supabase } from "../../../../utils/supabase";
import Link from "next/link";
import { Task } from "@/app/types/task";
import { useEffect, useState } from "react";
import {signout }

export default function TaskDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const resolvedParams = React.use(params);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("id", resolvedParams.id)
          .single();

        if (error) {
          console.error("Error fetching task:", error);
          setError("タスクの取得中にエラーが発生しました。");
          setIsLoading(false);
          return;
        }
        setTask(data);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, [resolvedParams.id]);

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", resolvedParams.id);

      if (error) {
        console.error("Error deleting task:", error);
      }
    } catch (err) {
      console.error("Unexpected error during delete:", err);
      setError("予期しないエラーが発生しました。");
    }
  };
  if (!task) {
    return <div>タスクが見つかりませんでした。</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タスク詳細</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <p className="text-gray-700">{task.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            内容
          </label>
          <p className="text-gray-700">{task.content}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ステータス
          </label>
          <p className="text-gray-700">{task.status}</p>
        </div>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            戻る
          </Link>
          <Link
            href={`/tasks/${task.id}/edit`}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            編集
          </Link>
          <button onClick={handleDelete}></button>
          <Link
            href={"/"}
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            削除
          </Link>
        </div>
      </div>
    </div>
  );
}
