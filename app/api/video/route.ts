import { connectToDB } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB()
        const Videos = await Video.find({}).sort({ createdAt: -1 }).lean();
        if (!Videos || Videos.length===0) {
             return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(Videos);
        
    } catch (error) {
         return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
         );  
    }
}