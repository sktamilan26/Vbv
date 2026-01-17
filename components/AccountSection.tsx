
import React, { useState } from 'react';
import { auth, signOut, updateProfile } from '../firebaseConfig';

interface AccountSectionProps {
  user: any;
  onBack: () => void;
}

const AccountSection: React.FC<AccountSectionProps> = ({ user, onBack }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateName = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser!, { displayName: newName });
      setEditing(false);
      window.location.reload(); // Refresh to reflect changes in header
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update name.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-xl mx-auto">
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-center mb-10">
          <button onClick={onBack} className="text-zinc-500 hover:text-white flex items-center space-x-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Back</span>
          </button>
          <div className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Profile Management</div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-fire-gradient p-1 mb-4 shadow-[0_0_25px_rgba(249,115,22,0.3)]">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-4xl font-bold text-white font-orbitron">
              {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
          
          {editing ? (
            <div className="w-full space-y-3 flex flex-col items-center">
              <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)}
                className="bg-zinc-950 border border-orange-500/50 rounded-xl p-3 text-center text-white outline-none focus:ring-2 focus:ring-orange-500/30 w-full"
                placeholder="New Display Name"
              />
              <div className="flex space-x-2 w-full">
                <button 
                  onClick={handleUpdateName}
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  onClick={() => setEditing(false)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-orbitron font-bold text-white flex items-center justify-center space-x-3">
                <span>{user?.displayName || 'Unnamed Player'}</span>
                <button onClick={() => setEditing(true)} className="text-zinc-600 hover:text-orange-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </h3>
              <p className="text-zinc-500 text-sm mt-1">{user?.email}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-zinc-300 font-medium">Account Status</span>
            </div>
            <span className="text-green-500 text-xs font-bold uppercase tracking-widest">Active</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 font-bold py-4 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Terminate Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
