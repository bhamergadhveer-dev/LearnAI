import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import AuthShell, { Field } from "./AuthShell";
import Button from "@/components/ui/Button";

/** UI-only login. Any submission simply enters the app. */
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const enterApp = () => navigate({ to: "/app" });

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Continue where you left off."
      footer={
        <>
          New here?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <Field
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="you@university.edu"
      />
      <Field
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="••••••••"
      />
      <Button className="mt-2 w-full" onClick={enterApp}>
        Log in
      </Button>
      <Button variant="outline" className="w-full" onClick={enterApp}>
        Continue as demo student
      </Button>
    </AuthShell>
  );
}