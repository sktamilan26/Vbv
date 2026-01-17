
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '../firebaseConfig';

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (isRegistering) {
        if (!displayName.trim()) throw new Error("Please enter a display name.");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg("Email is already registered. Try logging in.");
      } else if (error.code === 'auth/invalid-credential') {
        setErrorMsg("Incorrect email or password.");
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg("Password should be at least 6 characters.");
      } else if (error.code === 'auth/invalid-email') {
        setErrorMsg("Please enter a valid email address.");
      } else {
        setErrorMsg(error.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-10">
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block p-1 rounded-2xl bg-zinc-800 mb-6">
              <div className="px-4 py-1 bg-fire-gradient rounded-xl text-[10px] font-bold tracking-widest text-white uppercase">
                {isRegistering ? 'New Operator' : 'Secure Access'}
              </div>
            </div>
            <h2 className="text-3xl font-orbitron font-bold text-white mb-2 uppercase tracking-tight">
              {isRegistering ? 'Create Account' : 'System Login'}
            </h2>
            <p className="text-zinc-500 text-xs">
              {isRegistering 
                ? 'Join the elite squad and optimize your gear.' 
                : 'Enter your credentials to access pro tools.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 tracking-widest">Display Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Gamer Tag"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-700"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 tracking-widest">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="commander@gaming.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 tracking-widest">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-700"
              />
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-in fade-in slide-in-from-top-2">
                <p className="text-red-400 text-[11px] font-medium leading-relaxed">
                  <span className="font-bold mr-1">ERROR:</span> {errorMsg}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-center space-x-3 bg-fire-gradient text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>{isRegistering ? 'INITIALIZE ACCOUNT' : 'SECURE SIGN IN'}</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-zinc-800/50">
            <p className="text-zinc-500 text-xs">
              {isRegistering ? 'Already have an account?' : "Don't have an account yet?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setErrorMsg(null);
                }}
                className="text-orange-500 font-bold hover:text-orange-400 transition-colors underline underline-offset-4"
              >
                {isRegistering ? 'Login Now' : 'Register Here'}
              </button>
            </p>
          </div>

          <p className="mt-8 text-[9px] text-zinc-700 text-center uppercase tracking-[0.3em] font-bold">
            Encryption Status: AES-256 Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
