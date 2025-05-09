// src/app/api/master/rework-reason/[id]/route.js

import { NextResponse } from "next/server";
import {connectDB} from "@/config/connectDb";
import empScheema from "@/models/empScheema";

const getCorsHeaders = (origin) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "PUT, OPTIONS",
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

export async function PUT(req, { params }) {
  const origin = req.headers.get("origin") || "*";
  const headers = getCorsHeaders(origin);

  try {
    await connectDB();
    const id = params.id;
    const { firstName, lastName, age } = await req.json();

    const updated = await empScheema.updateOne(
      { _id: id },
      { $set: { firstName, lastName, age } }
    );

    return NextResponse.json(
      { success: true, data: updated },
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Put error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500, headers }
    );
  }
}
