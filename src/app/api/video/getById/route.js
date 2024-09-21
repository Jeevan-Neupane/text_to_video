import {connect} from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";
import {NextResponse} from "next/server";

connect();
export async function GET(request) {
  try {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({error: "Video ID is required"}, {status: 400});
    }

    const video = await Video.findById(id).populate("user", "name");

    // Return the videos in the response
    return NextResponse.json({
      message: "Videos retrieved successfully",
      success: true,
      video,
    });
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
