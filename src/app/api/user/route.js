import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {getServerSession} from "next-auth/next";
import {NextResponse} from "next/server";
import {authOptions} from "../auth/[...nextauth]/route";

connect();

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    const userId = session.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    return NextResponse.json({
      message: "User Updated Successfully",
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const {id, rewards} = data;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    user.rewards += rewards;
    let updatedUser = await user.save();
    if (!updatedUser) {
      throw new Error("User could not be saved");
    }

    return NextResponse.json({
      message: "User Updated Successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
