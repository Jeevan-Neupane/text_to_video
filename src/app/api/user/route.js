import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextResponse} from "next/server";

connect();
export async function PUT(request) {
  try {
    const data = await request.json();
    const {id, rewards} = data;
    console.log(data);

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
