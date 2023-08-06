"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const userSchema = z
  .object({
    id: z.number(),
    email: z.string().email(),
  })
  .strict();

const validationSchemaSignIn = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type FormFieldsSignIn = z.infer<typeof validationSchemaSignIn>;

const defaultValuesSignIn: FormFieldsSignIn = {
  email: "",
  password: "",
};

async function signIn(data: { email: string; password: string }) {
  const response = await fetch("http://localhost:4000/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userJson = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const user = userSchema.parse(userJson);
  return user;
}

export default function Home() {
  const { handleSubmit, register, reset } = useForm<FormFieldsSignIn>({
    defaultValues: defaultValuesSignIn,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFieldsSignIn> = async (data) => {
    const user = await signIn(data);
    console.log(user);
    reset();
  };

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Home</h1>
        <div>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2"
            href="/users"
          >
            users
          </Link>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2"
            href="/reports"
          >
            reports
          </Link>
        </div>
      </header>
      <div className="flex justify-center">
        <div className="flex flex-col w-60">
          <h2 className="text-1xl my-2">Sign in</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 flex-col"
          >
            <input
              {...register("email")}
              type="email"
              placeholder="email"
              className="bg-slate-100 rounded px-2 py-1 outline-none text-slate-800"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="bg-slate-100 rounded px-2 py-1 outline-none text-slate-800"
            />
            <button className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
