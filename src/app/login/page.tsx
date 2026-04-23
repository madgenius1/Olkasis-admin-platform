"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import { Eye, EyeOff, Mail, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";

  const [email, setEmail] = useState("sarah.k@zanari.com");
  const [password, setPassword] = useState("demo1234");
  const [showPwd, setShowPwd] = useState(false);
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (step === "credentials") { setStep("2fa"); return; }
    if (code.length < 6) { setError("Please enter a 6-digit code."); return; }
    setLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) router.push(from);
      else setError("Invalid credentials. Please try again.");
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center shadow-2xl">
            <span className="text-white font-black text-xl">Z</span>
          </div>
          <div>
            <p className="text-white font-black text-2xl leading-none">Zanari</p>
            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Admin Platform</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-6">
            <h1 className="text-white text-xl font-bold">
              {step === "credentials" ? "Sign in to your account" : "Two-factor authentication"}
            </h1>
            <p className="text-blue-200 text-sm mt-1">
              {step === "credentials"
                ? "Secure access for authorised administrators only."
                : "Enter the 6-digit code from your authenticator app."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
            {step === "credentials" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)} required
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"} value={password}
                      onChange={e => setPassword(e.target.value)} required
                      className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                    <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <p className="text-xs text-blue-700 font-medium">Code sent to <strong>{email}</strong></p>
                </div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Verification code</label>
                <input
                  type="text" maxLength={6} value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-2xl font-mono tracking-[0.5em] text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
                <p className="text-xs text-slate-400 mt-2 text-center">Demo: enter any 6 digits</p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-100 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />{error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {step === "credentials" ? "Continue" : "Verify & Sign in"}
            </button>

            {step === "2fa" && (
              <button type="button" onClick={() => setStep("credentials")} className="w-full text-slate-500 text-sm hover:text-slate-700 transition-colors">
                ← Back to credentials
              </button>
            )}
          </form>

          <div className="px-8 pb-6">
            <p className="text-center text-xs text-slate-400">
              🔒 Protected by IP whitelisting · 2FA · Session logging
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
