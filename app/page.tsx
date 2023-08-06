"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const validationSchemaSignIn = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type FormFieldsSignIn = z.infer<typeof validationSchemaSignIn>;

const defaultValuesSignIn: FormFieldsSignIn = {
  email: "",
  password: "",
};

export default function Home() {
  const { handleSubmit, register, reset } = useForm<FormFieldsSignIn>({
    defaultValues: defaultValuesSignIn,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFieldsSignIn> = async (data) => {
    console.log(data);
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
