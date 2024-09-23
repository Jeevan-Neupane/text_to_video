import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {NextResponse} from "next/server";

connect();

export async function POST(request) {
  try {
    const data = await request.json();
    const {name, email, password, role} = data;

    const user = await User.findOne({email});

    if (user) {
      return NextResponse.json({error: "User already exists"}, {status: 400});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role ? role : "student",
    });

    let savedUser = await newUser.save();
    if (!savedUser) {
      throw new Error("User could not be saved");
    }

    savedUser = savedUser.toObject();
    delete savedUser.password;

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}


