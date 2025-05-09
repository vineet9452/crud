// src/app/api/master/rework-reason/add-reason/route.js

import { NextResponse } from "next/server";
import {connectDB} from "@/config/connectDb";
import empScheema from "@/models/empScheema";

const getCorsHeaders = (origin) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
});

export async function OPTIONS(req) {
  const origin = req.headers.get("origin") || "*";
  return NextResponse.json(
    {},
    { status: 200, headers: getCorsHeaders(origin) }
  );
}

export async function GET(req) {
  const origin = req.headers.get("origin") || "*";
  const headers = getCorsHeaders(origin);

  try {
    await connectDB();
    const data = await empScheema.find();

    return NextResponse.json({ success: true, data }, { status: 200, headers });
  } catch (err) {
    console.error("Get error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500, headers }
    );
  }
}




