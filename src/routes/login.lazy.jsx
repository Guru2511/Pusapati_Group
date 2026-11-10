import { useEffect, useState } from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";
import { LockKeyhole, Mail } from "lucide-react";
import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyAdminSession } from "@/lib/admin-fns";

export const Route = createLazyFileRoute("/login")({ component: AdminLoginPage });
const getFirebaseClient = createClientOnlyFn(() => import("@/lib/firebase.client"));

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("reason") === "unauthorized") {
      setError("This account is not authorized to access the admin dashboard.");
    }
  }, []);

  const signIn = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { getFirebaseAuth } = await getFirebaseClient();
      const auth = getFirebaseAuth();
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (!credential.user.emailVerified) {
        await sendEmailVerification(credential.user);
        await signOut(auth);
        setError(`A verification link was sent to ${credential.user.email}. Verify the address, then sign in again.`);
        return;
      }
      const idToken = await credential.user.getIdToken();
      await verifyAdminSession({ data: { idToken } });
      await navigate({ to: "/admin", replace: true });
    } catch (loginError) {
      try {
        const { getFirebaseAuth } = await getFirebaseClient();
        const auth = getFirebaseAuth();
        if (auth.currentUser) await signOut(auth);
      } catch (signOutError) {
        console.error("[admin sign-in] Could not clear the rejected session:", signOutError);
      }
      setError(loginError instanceof Error ? loginError.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  };

  const resetPassword = async () => {
    setError("");
    if (!email.trim()) {
      setError("Enter your admin email address first, then choose Forgot password.");
      return;
    }
    try {
      const { getFirebaseAuth } = await getFirebaseClient();
      await sendPasswordResetEmail(getFirebaseAuth(), email.trim());
      setError("If this admin account exists, Firebase has sent a password reset email.");
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Could not request a password reset.");
    }
  };

  return (
    <AuthLayout icon={LockKeyhole} title="Admin sign in" subtitle="Sign in with an authorized Pusapati Group admin account.">
      <form onSubmit={signIn} className="space-y-4">
        <label className="block space-y-2">
          <Label htmlFor="admin-email">Admin email</Label>
          <span className="relative block">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="admin-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 pl-10" required />
          </span>
        </label>
        <label className="block space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <span className="relative block">
            <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 pl-10" required />
          </span>
        </label>
        {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}
        <Button type="submit" disabled={busy} className="h-12 w-full">
          {busy ? "Verifying admin access…" : "Sign in"}
        </Button>
      </form>
      <button type="button" onClick={resetPassword} className="mt-4 block w-full text-center text-sm text-primary hover:underline">
        Forgot password?
      </button>
      <p className="mt-6 border-t border-border pt-4 text-center text-xs leading-5 text-muted-foreground">
        Admin accounts are created by an administrator. Public registration is disabled.
      </p>
      <Link to="/" className="mt-4 block text-center text-sm text-muted-foreground hover:text-foreground">Return to the public website</Link>
    </AuthLayout>
  );
}
