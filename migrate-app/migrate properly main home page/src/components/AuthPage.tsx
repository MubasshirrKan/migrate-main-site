import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect, type ClipboardEvent, type KeyboardEvent } from "react";
import { ArrowRight, ArrowLeft, ShieldCheck, Loader2, Pencil } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Auth (Login + Sign up) — WhatsApp number + OTP.
//
// Login:  WhatsApp number → OTP.
// Sign up: Name + WhatsApp number → OTP (same WhatsApp verification).
//
// This is the front-end flow only. The two TODO points below are where the
// backend gets wired in — one endpoint to send a code over the WhatsApp
// Business API, one to verify it. Until then the UI runs in demo mode: any
// 6-digit code is accepted so the screen can be clicked through.
// ─────────────────────────────────────────────────────────────────────────────

type Mode = "login" | "signup";
type Step = "details" | "otp";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

// A small curated set — the marquee/quiz copy skews toward South Asia, so these
// lead. Anything else can be typed straight into the number field.
const COUNTRY_CODES = [
  { code: "+880", label: "🇧🇩 +880" },
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+92", label: "🇵🇰 +92" },
  { code: "+977", label: "🇳🇵 +977" },
  { code: "+94", label: "🇱🇰 +94" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+1", label: "🇺🇸 +1" },
];

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.51 5.26l-.999 3.648 3.978-1.044zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function AuthPage({ initialMode = "login" }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [step, setStep] = useState<Step>("details");

  const [name, setName] = useState("");
  const [dialCode, setDialCode] = useState("+880");
  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);

  const fullNumber = `${dialCode} ${phone.trim()}`;

  // SPA navigation helper (same pattern used across the app).
  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  // Resend cooldown ticker.
  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setInterval(() => setResendIn(s => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, [resendIn]);

  // Focus the first OTP box when we land on that step.
  useEffect(() => {
    if (step === "otp") otpRefs.current[0]?.focus();
  }, [step]);

  const switchMode = (next: Mode) => {
    setMode(next);
    setStep("details");
    setError(null);
    setOtp(Array(OTP_LENGTH).fill(""));
    navigateTo(next === "login" ? "/login" : "/signup");
  };

  const phoneValid = phone.replace(/\D/g, "").length >= 6;
  const nameValid = mode === "login" || name.trim().length >= 2;

  const sendCode = async () => {
    setError(null);
    if (!nameValid) return setError("Please tell us your name.");
    if (!phoneValid) return setError("Enter a valid WhatsApp number.");

    setLoading(true);
    try {
      // TODO(backend): POST { mode, name, number: fullNumber } to trigger a
      // WhatsApp OTP via the WhatsApp Business API (e.g. Twilio / Meta Cloud API).
      await new Promise(r => setTimeout(r, 900)); // simulate the round-trip
      setStep("otp");
      setResendIn(RESEND_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
    } catch {
      setError("Couldn't send the code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (resendIn > 0) return;
    setLoading(true);
    // TODO(backend): re-trigger the WhatsApp OTP for fullNumber.
    await new Promise(r => setTimeout(r, 700));
    setResendIn(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    otpRefs.current[0]?.focus();
    setLoading(false);
  };

  const setOtpAt = (i: number, val: string) => {
    setOtp(prev => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
  };

  const handleOtpChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setOtpAt(i, digit);
    if (digit && i < OTP_LENGTH - 1) otpRefs.current[i + 1]?.focus();
    setError(null);
  };

  const handleOtpKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
      setOtpAt(i - 1, "");
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!digits) return;
    const next = Array(OTP_LENGTH).fill("");
    digits.split("").forEach((d, idx) => (next[idx] = d));
    setOtp(next);
    otpRefs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
  };

  const verify = async () => {
    setError(null);
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return setError("Enter the 6-digit code from WhatsApp.");

    setLoading(true);
    try {
      // TODO(backend): POST { number: fullNumber, code } to verify the OTP and
      // open a session. On success the API returns the user/session; route them
      // into the student portal. (Demo mode accepts any 6-digit code.)
      await new Promise(r => setTimeout(r, 900));
      navigateTo("/portal");
    } catch {
      setError("That code didn't match. Please try again.");
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1D4ED8]/60 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] transition-all";
  const labelBase = "block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2";

  return (
    <div className="relative bg-zinc-950 text-white font-sans antialiased min-h-screen overflow-x-hidden flex flex-col">
      {/* Sticky logo nav (matches the rest of the site) */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <button
          onClick={() => navigateTo("/")}
          className="flex items-center gap-2 font-bold text-white text-lg tracking-widest uppercase"
        >
          <img
            src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png"
            alt="MigrateProperly Logo" className="w-7 h-7 object-contain"
          />
          Migrate<span className="font-light">Properly</span>
        </button>
        <button
          onClick={() => navigateTo("/")}
          className="text-sm font-semibold text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back home
        </button>
      </nav>

      {/* Ambient glow, same palette as the careers/hero pages */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-24 right-1/4 w-[400px] h-[400px] rounded-full bg-[#25D366]/5 blur-[120px]" />

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Eyebrow */}
          <p className="text-[#60A5FA] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[#1D4ED8]/60" />
            {mode === "login" ? "Welcome back" : "Create your account"}
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.05] mb-2">
            {mode === "login" ? (
              <>Sign in to <span className="overseas-glow font-serif italic font-light">MigrateProperly</span></>
            ) : (
              <>Start your <span className="overseas-glow font-serif italic font-light">journey</span></>
            )}
          </h1>
          <p className="text-white/50 text-sm mb-7">
            {step === "details"
              ? "We'll send a one-time code to your WhatsApp number — no password needed."
              : <>Enter the 6-digit code we sent on WhatsApp to <span className="text-white/80 font-medium">{fullNumber}</span>.</>}
          </p>

          {/* Card */}
          <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            {/* Login / Signup toggle (hidden during OTP step) */}
            {step === "details" && (
              <div className="grid grid-cols-2 gap-1 p-1 mb-6 rounded-full bg-white/5 border border-white/10">
                {(["login", "signup"] as Mode[]).map(m => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`relative py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${
                      mode === m ? "text-white" : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {mode === m && (
                      <motion.span
                        layoutId="auth-toggle"
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {m === "login" ? "Login" : "Sign up"}
                  </button>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === "details" ? (
                <motion.form
                  key="details"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={e => { e.preventDefault(); sendCode(); }}
                  className="space-y-5"
                >
                  {/* Name — sign up only */}
                  <AnimatePresence initial={false}>
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <label className={labelBase}>
                          Your name <span className="text-[#60A5FA]">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="e.g. Ayesha Rahman"
                          autoComplete="name"
                          className={inputBase}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* WhatsApp number */}
                  <div>
                    <label className={labelBase}>
                      WhatsApp number <span className="text-[#60A5FA]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative shrink-0">
                        <select
                          value={dialCode}
                          onChange={e => setDialCode(e.target.value)}
                          className="appearance-none h-full bg-white/5 border border-white/10 rounded-xl pl-3 pr-7 py-3 text-white text-sm focus:outline-none focus:border-[#1D4ED8]/60 transition-all cursor-pointer"
                          aria-label="Country code"
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={c.code} value={c.code} className="bg-zinc-900 text-white">
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                      </div>
                      <div className="relative flex-1">
                        <WhatsAppIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25D366]" />
                        <input
                          type="tel"
                          inputMode="numeric"
                          value={phone}
                          onChange={e => setPhone(e.target.value.replace(/[^\d\s-]/g, ""))}
                          placeholder="1XXX-XXXXXX"
                          autoComplete="tel-national"
                          className={`${inputBase} pl-9`}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-white/30 text-xs flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]/70" />
                      Make sure this number is on WhatsApp — that's where the code lands.
                    </p>
                  </div>

                  {error && <p className="text-[#F27D26] text-sm font-medium">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:from-[#5b97ff] hover:to-[#1E40AF] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <WhatsAppIcon className="w-4 h-4" />}
                    {loading ? "Sending code…" : "Send code via WhatsApp"}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <label className={`${labelBase} mb-0`}>Verification code</label>
                    <button
                      type="button"
                      onClick={() => { setStep("details"); setError(null); }}
                      className="text-white/40 hover:text-white/70 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Pencil className="w-3 h-3" /> Edit number
                    </button>
                  </div>

                  <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        ref={el => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                        className="w-full aspect-square text-center text-xl font-semibold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#1D4ED8]/60 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] transition-all"
                      />
                    ))}
                  </div>

                  {error && <p className="text-[#F27D26] text-sm font-medium">{error}</p>}

                  <button
                    type="button"
                    onClick={verify}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:from-[#5b97ff] hover:to-[#1E40AF] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    {loading ? "Verifying…" : mode === "login" ? "Verify & sign in" : "Verify & create account"}
                  </button>

                  <p className="text-center text-white/40 text-xs">
                    Didn't get it?{" "}
                    {resendIn > 0 ? (
                      <span className="text-white/50">Resend in {resendIn}s</span>
                    ) : (
                      <button onClick={resend} disabled={loading} className="text-[#60A5FA] hover:text-[#93C5FD] font-medium transition-colors">
                        Resend code
                      </button>
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer switch */}
          {step === "details" && (
            <p className="text-center text-white/40 text-sm mt-6">
              {mode === "login" ? (
                <>New to MigrateProperly?{" "}
                  <button onClick={() => switchMode("signup")} className="text-[#60A5FA] hover:text-[#93C5FD] font-semibold transition-colors">
                    Create an account
                  </button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button onClick={() => switchMode("login")} className="text-[#60A5FA] hover:text-[#93C5FD] font-semibold transition-colors">
                    Log in
                  </button>
                </>
              )}
            </p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
