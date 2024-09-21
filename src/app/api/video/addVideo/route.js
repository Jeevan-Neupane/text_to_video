import {connect} from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";
import {NextResponse} from "next/server";

connect(); // Connect to the database

export async function POST(request) {
  try {
    const data = await request.json();
    const {user, title, thumbnail, videoUrl, caption, mcqs, category} = data;

    // Create a new video document
    const newVideo = new Video({
      user,
      title,
      thumbnail,
      videoUrl,
      caption,
      mcqs: mcqs || [], // Default to empty array if mcqs is not provided
      category: category || "New", // Default category if not provided
    });

    // Save the new video
    const savedVideo = await newVideo.save();

    // Return a success response
    return NextResponse.json({
      message: "Video added successfully",
      success: true,
      video: savedVideo,
    });
  } catch (error) {
    // Handle server errors
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
