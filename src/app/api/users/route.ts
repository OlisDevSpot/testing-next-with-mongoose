import User from "@/models/user.model";
import dbConnect from "@/db/connectDB";

export async function GET() {
  console.log("hi!");
  await dbConnect();

  const users = await User.find({});

  return Response.json({ users });
}

export async function POST(request: Request) {
  await dbConnect();

  const data = await request.json();
  console.log(data);

  const user = await User.create(data);

  return Response.json({ user });
}
