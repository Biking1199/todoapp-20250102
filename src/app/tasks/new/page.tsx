"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase";

export default function NewTask() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"完了" | "途中" | "未完了">("未完了");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ name, content, status }]);

    if (error) {
      console.error("Error creating task:", error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新規タスク作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            タスク名 (50文字以内)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "完了" | "途中" | "未完了")
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
          作成
        </button>
      </form>
    </div>
  );
}
