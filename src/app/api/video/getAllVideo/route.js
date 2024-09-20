import Video from "@/models/videoModel";
import {NextResponse} from "next/server";

export async function GET(request) {
  try {
    const videos = await Video.find().populate("user", "name"); // Fetch all videos from the database

    // Return the videos in the response
    return NextResponse.json({
      message: "Videos retrieved successfully",
      success: true,
      videos,
    });
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
