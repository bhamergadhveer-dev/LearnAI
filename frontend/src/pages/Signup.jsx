import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import AuthShell, { Field } from "./AuthShell";
import Button from "@/components/ui/Button";

/** UI-only signup with only the essential account fields. */
export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <AuthShell
      title="Create your account"
      subtitle="Tell us a little so lessons fit your level."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <Field label="Name" value={form.name} onChange={update("name")} placeholder="Your name" />
      <Field
        label="Email"
        type="email"
        value={form.email}
        onChange={update("email")}
        placeholder="you@university.edu"
      />
      <Field
        label="Password"
        type="password"
        value={form.password}
        onChange={update("password")}
        placeholder="••••••••"
      />
      <Button className="w-full" onClick={() => navigate({ to: "/app" })}>
        Create account
      </Button>
    </AuthShell>
  );
}