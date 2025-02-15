import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          if (error.message === 'Invalid login credentials') {
            throw new Error('Incorrect email or password. Please try again.');
          }
          throw error;
        }
        toast.success('Welcome back!');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          if (error.message.includes('password')) {
            throw new Error('Password must be at least 6 characters long.');
          }
          throw error;
        }
        toast.success('Account created successfully! You can now sign in.');
        setIsLogin(true); // Switch to login view after successful registration
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-xl"
    >
      <div className="flex justify-center mb-8">
        <Lock className="h-12 w-12 text-blue-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-center mb-8">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>

      <form onSubmit={handleAuth} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder={isLogin ? "Enter your password" : "Choose a password (min. 6 characters)"}
            minLength={6}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            'Please wait...'
          ) : isLogin ? (
            <>
              <LogIn className="h-5 w-5" />
              Sign In
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              Sign Up
            </>
          )}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </motion.div>
  );
}