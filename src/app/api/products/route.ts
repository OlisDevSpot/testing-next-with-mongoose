import Product from "@/models/product.model";
import dbConnect from "@/db/connectDB";

export async function GET() {
  console.log("hi");
  await dbConnect();

  const products = await Product.find({});

  return Response.json({ products });
}

export async function POST(request: Request) {
  await dbConnect();

  const data = await request.json();
  console.log(data);

  const product = await Product.create(data);

  return Response.json({ product });
}
