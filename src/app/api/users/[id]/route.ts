import dbConnect from "@/db/connectDB";
import User from "@/models/user.model";

interface IParams {
  id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  await dbConnect();
  const { id } = params;

  await User.findByIdAndDelete(id);

  return Response.json({ success: true });
}
