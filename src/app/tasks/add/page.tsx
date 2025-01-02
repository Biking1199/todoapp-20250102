"use client";
import { TaskForm } from "@/app/components/TaskForm";
import React from "react";

export default function AddTask() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-700 mt-32">追加フォーム</h1>
      <TaskForm />
    </div>
  );
}
