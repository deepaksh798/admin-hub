"use client"

import React, { useState } from 'react';
import { Users, Shield, UserPlus, Mail, Phone, MessageCircle } from 'lucide-react';

const HelpComponent = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      setFeedbackSubmitted(true);
      setFeedback('');
      // setTimeout(() => setFeedbackSubmitted(false), 3000);
    }
  };

  return (
    <div className="h-full">
    <div className="h-full max-w-4xl mx-auto bg-gray-50 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">AdminHub Help</h1>
        <p className="text-lg opacity-90">Community Management Made Simple</p>
      </div>

      {/* About AdminHub */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About AdminHub</h2>
        <p className="text-gray-600 mb-4">
          AdminHub is a community management platform that helps you organize users into communities, 
          assign roles, and manage member permissions. Built with Next.js, Tailwind CSS, and TypeScript.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Users className="mx-auto mb-2 text-blue-600" size={24} />
            <h3 className="font-semibold">Communities</h3>
            <p className="text-sm text-gray-600">Create and manage multiple communities</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Shield className="mx-auto mb-2 text-purple-600" size={24} />
            <h3 className="font-semibold">Roles</h3>
            <p className="text-sm text-gray-600">Define custom roles with permissions</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <UserPlus className="mx-auto mb-2 text-green-600" size={24} />
            <h3 className="font-semibold">Members</h3>
            <p className="text-sm text-gray-600">Add users and assign roles</p>
          </div>
        </div>
      </div>

      {/* Quick Guide */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Start Guide</h2>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-lg">1. Create Communities</h3>
            <p className="text-gray-600">Go to Communities → Create new communities for different groups or projects.</p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-lg">2. Set Up Roles</h3>
            <p className="text-gray-600">Visit Roles → Create custom roles like Admin, Moderator, Member with specific permissions.</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-lg">3. Add Members</h3>
            <p className="text-gray-600">Go to Users → Invite existing users to communities and assign them roles.</p>
          </div>
        </div>
      </div>

      {/* Common Questions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Questions</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">How do I add someone to a community?</h3>
            <p className="text-gray-600">Users must be registered first. Then go to Communities, select your community, and add existing users as members.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Can one person have multiple roles?</h3>
            <p className="text-gray-600">Each member has one role per community, but can have different roles in different communities.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">What does the dashboard show?</h3>
            <p className="text-gray-600">Total users, communities, active roles, and recent activity like new members and role changes.</p>
          </div>
        </div>
      </div>

      {/* Developer Contact */}
      <div className="grid md:grid-cols-2 gap-6 pb-4">
        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Developer Contact</h2>
          <p className="text-gray-600 mb-4">Need help or found a bug? Contact me directly:</p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" size={20} />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:deepak.sh798@gmail.com" className="text-blue-600 hover:underline">
                  deepak.sh798@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="text-green-600" size={20} />
              <div>
                <p className="font-semibold">Phone</p>
                <a href="tel:+919876543210" className="text-green-600 hover:underline">
                  +91 7987887538
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Response Time:</strong> I typically respond within 24 hours. 
              For urgent issues, please call directly.
            </p>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Feedback</h2>
          
          {feedbackSubmitted ? (
            <div className="text-center py-8">
              <div className="text-green-600 mb-2">
                <MessageCircle size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-green-600">Thank you!</h3>
              <p className="text-gray-600">Your feedback has been sent. I'll get back to you soon.</p>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={4}
                  placeholder="Share your thoughts, report bugs, or suggest improvements..."
                />
              </div>
              
              <button
                onClick={handleFeedbackSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Send Feedback
              </button>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-500">
            <p>You can also reach me via email or phone for detailed discussions.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HelpComponent;