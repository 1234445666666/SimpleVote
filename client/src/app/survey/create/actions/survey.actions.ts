import { ISurvey } from "@/types/survey";
import { useRouter } from "next/navigation";
import { useState } from "react";

// export async function createSurvey(data: ISurvey) {
//     try {
//         const response = await fetch("http://localhost:6700/api/survey/create", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         const data = await response.json();
// }
// }

export async function createSurvey(data: ISurvey) {
  try {
    const response = await fetch("http://localhost:6700/api/surveys", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.error("Error creating survey:", error);
  }
}
