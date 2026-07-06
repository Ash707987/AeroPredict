import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Card } from "../components/ui/Card";
import { getApiErrorMessage } from "../lib/apiError";
import { register as registerUser } from "../services/authService";

const schema = z.object({
  username: z.string().min(2, "Username is too short"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Use at least 6 characters")
});

type FormValues = z.infer<typeof schema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setError("");
    try {
      await registerUser(values);
      navigate("/login");
    } catch (error) {
      setError(getApiErrorMessage(error, "Registration failed. Please try again."));
    }
  }

  return (
    <div className="page-shell flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Register</h1>
        <p className="mt-2 text-sm text-app-muted">Create an account for protected dashboard routes.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm">
            Username
            <input className="input mt-2" {...register("username")} />
            <span className="text-xs text-red-300">{formState.errors.username?.message}</span>
          </label>
          <label className="block text-sm">
            Email
            <input className="input mt-2" type="email" {...register("email")} />
            <span className="text-xs text-red-300">{formState.errors.email?.message}</span>
          </label>
          <label className="block text-sm">
            Password
            <input className="input mt-2" type="password" {...register("password")} />
            <span className="text-xs text-red-300">{formState.errors.password?.message}</span>
          </label>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button className="btn-primary w-full" disabled={formState.isSubmitting}>
            <UserPlus className="h-4 w-4" />
            {formState.isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="mt-5 text-sm text-app-muted">
          Already registered?{" "}
          <Link className="text-blue-300" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
