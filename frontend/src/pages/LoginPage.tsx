import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required")
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setError("");
    try {
      const response = await login(values);
      setSession(response.access_token);
      navigate("/dashboard");
    } catch {
      setError("Login failed. Check your email and password.");
    }
  }

  return (
    <div className="page-shell flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-sm text-app-muted">Use your AeroPredict account to continue.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            <LogIn className="h-4 w-4" />
            {formState.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-5 text-sm text-app-muted">
          New here?{" "}
          <Link className="text-blue-300" to="/register">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}
