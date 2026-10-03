import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("special_cars")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    cars: data,
  });
}

export async function POST(request: Request) {
  try {
    const { name, price, password } = await request.json();

    if (password !== process.env.SPECIAL_ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    if (!name?.trim() || !price) {
      return NextResponse.json(
        { success: false, message: "Car name and price are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("special_cars")
      .insert({
        name: name.trim(),
        price: Number(price),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      car: data,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, password } = await request.json();

    if (password !== process.env.SPECIAL_ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Car ID is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("special_cars")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}