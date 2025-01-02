import { supabase } from "../../../../utils/supabase";
import Link from "next/link";

export default async function TaskDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    console.error("Error fetching task:", error);
    return <div>エラーが発生しました。</div>;
  }
  if (!task) {
    return <div>タスクが見つかりません。</div>;
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
          <Link
            href={"/"}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            削除
          </Link>
        </div>
      </div>
    </div>
  );
}
