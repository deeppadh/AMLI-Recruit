import React, { useState } from 'react';
import { ArrowLeft, Star, Play, Download, CheckCircle, Clock, User, Mail, Phone, MessageCircle, Calendar, Award, Brain, FileText, Video, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { communicationHistory } from '../data';

const CandidateProfile: React.FC = () => {
  const { selectedCandidate, setCurrentPage, biasMode } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [showInterviewQuestions, setShowInterviewQuestions] = useState(false);

  if (!selectedCandidate) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No candidate selected</p>
      </div>
    );
  }

  const candidate = selectedCandidate;
  const candidateCommunications = communicationHistory.filter(comm => comm.candidateId === candidate.id);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'psychometric', label: 'Psychometric', icon: Brain },
    { id: 'interview', label: 'AI Interview', icon: Video },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const PsychometricChart: React.FC<{ label: string; score: number; color: string }> = ({ label, score, color }) => (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-2">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={`${score}, 100`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-slate-800">{score}</span>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );

  const suggestedQuestions = [
    "Tell me about your experience with IRDAI regulations and how you've ensured compliance in your previous roles.",
    "Describe a challenging situation you faced while working with rural distribution channels.",
    "How do you stay updated with the latest developments in the Indian insurance industry?",
    "Can you walk me through your approach to building and maintaining client relationships?",
    "What strategies would you use to adapt insurance products for Tier 2 and Tier 3 cities?"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentPage('candidates')}
          className="p-2 text-gray-600 hover:text-navy-blue transition-colors rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-navy-blue"
          aria-label="Back to candidates"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {biasMode ? `Candidate #${candidate.id.toString().padStart(5, '0')}` : candidate.name}
          </h1>
          <p className="text-slate-600">Comprehensive candidate assessment and profile</p>
        </div>
      </div>

      {/* Enhanced Candidate Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            {biasMode ? (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={32} className="text-gray-600" />
              </div>
            ) : (
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              {biasMode ? `Candidate #${candidate.id.toString().padStart(5, '0')}` : candidate.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-600">{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-600">{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-600">Applied: {new Date(candidate.appliedDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                candidate.status === 'Hired' ? 'bg-green-100 text-green-800' :
                candidate.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-800' :
                candidate.status === 'Offer Extended' ? 'bg-purple-100 text-purple-800' :
                candidate.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {candidate.status}
              </span>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-yellow-500" />
                <span className="text-sm text-gray-600">
                  {candidate.psychometric.resilience > 85 ? 'High Performer' : 
                   candidate.psychometric.resilience > 75 ? 'Good Fit' : 'Potential'}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-500" size={24} fill="currentColor" />
              <span className="text-3xl font-bold text-slate-800">{candidate.resumeScore}</span>
              <span className="text-gray-500">/100</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">AI Resume Score</p>
            <div className="text-xs text-gray-500">
              {candidate.resumeScore >= 90 ? 'Excellent Match' :
               candidate.resumeScore >= 80 ? 'Good Match' :
               candidate.resumeScore >= 70 ? 'Potential Match' : 'Needs Review'}
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={() => setShowCommunicationModal(true)}
            className="bg-navy-blue text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2"
          >
            <MessageCircle size={16} />
            Contact
          </button>
          <button className="bg-accent-burgundy text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent-burgundy/90 transition-colors focus:ring-2 focus:ring-accent-burgundy focus:ring-offset-2">
            Schedule Interview
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
            Download Resume
          </button>
          <button
            onClick={() => setShowInterviewQuestions(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            AI Questions
          </button>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium text-sm transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-b-2 border-navy-blue text-navy-blue'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">AI Resume Analysis</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{candidate.resumeSummary}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Digital Footprint Analysis</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-semibold text-green-800">{candidate.digitalFootprint.sentimentScore}/100</span>
                    <span className="text-sm text-green-600">Professional Sentiment Score</span>
                  </div>
                  <p className="text-green-700">{candidate.digitalFootprint.sentimentSummary}</p>
                </div>
              </div>

              {/* Key Strengths */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Strengths</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {['Technical Expertise', 'Industry Knowledge', 'Communication Skills', 'Problem Solving'].map((strength, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {['Team Collaboration', 'Adaptability', 'Customer Focus', 'Results Oriented'].map((strength, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'psychometric' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Psychometric Assessment Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <PsychometricChart label="Resilience" score={candidate.psychometric.resilience} color="#3B82F6" />
                <PsychometricChart label="Empathy" score={candidate.psychometric.empathy} color="#10B981" />
                <PsychometricChart label="Drive" score={candidate.psychometric.drive} color="#F59E0B" />
                <PsychometricChart label="Coachability" score={candidate.psychometric.coachability} color="#8B5CF6" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Assessment Summary</h4>
                  <p className="text-gray-700 text-sm">
                    This candidate demonstrates strong overall psychological fitness for the role. 
                    Particularly high scores in resilience and drive suggest excellent potential for 
                    sales performance. The coachability score indicates strong learning potential.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Recommended Role Fit</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Sales Leadership</span>
                      <span className="font-semibold text-blue-800">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Customer Service</span>
                      <span className="font-semibold text-blue-800">88%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Team Management</span>
                      <span className="font-semibold text-blue-800">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">AI Avatar Interview</h3>
                <div className="bg-gradient-to-r from-navy-blue to-blue-600 rounded-lg p-8 text-white text-center">
                  <div className="flex items-center justify-center mb-4">
                    <button className="bg-white text-navy-blue p-6 rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-blue">
                      <Play size={32} />
                    </button>
                  </div>
                  <p className="text-blue-100 mb-4">AI-powered video interview analysis</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{candidate.aiInterview.overallScore}/100</div>
                      <div className="text-sm text-blue-100">Overall Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">8:45</div>
                      <div className="text-sm text-blue-100">Duration</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Interview Transcript</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 italic">"{candidate.aiInterview.transcript}"</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">AI-Generated Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.aiInterview.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">92%</div>
                    <div className="text-sm text-blue-700">Communication Clarity</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">88%</div>
                    <div className="text-sm text-green-700">Confidence Level</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-sm text-purple-700">Technical Knowledge</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Document Verification Status</h3>
              <div className="space-y-3">
                {candidate.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        doc.status === 'Verified' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <FileText size={20} className="text-gray-400" />
                      <span className="font-medium text-gray-800">{doc.docName}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        doc.status === 'Verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-navy-blue hover:text-navy-blue/80 transition-colors focus:ring-2 focus:ring-navy-blue rounded">
                        <Download size={16} />
                      </button>
                      {doc.status === 'Verified' && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Verification Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Verified Documents:</span>
                    <span className="font-semibold text-blue-800 ml-2">
                      {candidate.documents.filter(doc => doc.status === 'Verified').length}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Pending Verification:</span>
                    <span className="font-semibold text-blue-800 ml-2">
                      {candidate.documents.filter(doc => doc.status === 'Pending').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Candidate Analytics & Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <h4 className="font-semibold mb-2">Engagement Score</h4>
                  <div className="text-3xl font-bold mb-2">87%</div>
                  <p className="text-blue-100 text-sm">Above average candidate engagement</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <h4 className="font-semibold mb-2">Cultural Fit</h4>
                  <div className="text-3xl font-bold mb-2">92%</div>
                  <p className="text-green-100 text-sm">Excellent alignment with company values</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <h4 className="font-semibold mb-2">Growth Potential</h4>
                  <div className="text-3xl font-bold mb-2">89%</div>
                  <p className="text-purple-100 text-sm">High potential for career advancement</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-4">Predictive Analytics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Probability of Success</span>
                      <span className="font-semibold text-green-600">91%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Retention Likelihood (2 years)</span>
                      <span className="font-semibold text-blue-600">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Performance Potential</span>
                      <span className="font-semibold text-purple-600">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Communication Modal */}
      {showCommunicationModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowCommunicationModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Communication Hub</h3>
            
            {/* Communication History */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Recent Communications</h4>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {candidateCommunications.map((comm) => (
                  <div key={comm.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      comm.type === 'email' ? 'bg-blue-500' :
                      comm.type === 'sms' ? 'bg-green-500' :
                      comm.type === 'call' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-800 capitalize">{comm.type}</span>
                        <span className="text-xs text-gray-500">{new Date(comm.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600">{comm.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Communication Options */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">Send New Communication</h4>
              <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue">
                <Mail size={20} className="text-blue-500" />
                <div className="text-left">
                  <div className="font-medium text-gray-800">Send Email</div>
                  <div className="text-sm text-gray-600">Interview invitation or follow-up</div>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue">
                <MessageCircle size={20} className="text-green-500" />
                <div className="text-left">
                  <div className="font-medium text-gray-800">Send SMS</div>
                  <div className="text-sm text-gray-600">Quick notification or reminder</div>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue">
                <Phone size={20} className="text-purple-500" />
                <div className="text-left">
                  <div className="font-medium text-gray-800">Schedule Call</div>
                  <div className="text-sm text-gray-600">Personal interview or discussion</div>
                </div>
              </button>
            </div>
            
            <button
              onClick={() => setShowCommunicationModal(false)}
              className="w-full mt-4 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* AI Interview Questions Modal */}
      {showInterviewQuestions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowInterviewQuestions(false)}>
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">AI-Generated Interview Questions</h3>
            <p className="text-gray-600 mb-6">Personalized questions based on candidate profile and job requirements</p>
            
            <div className="space-y-4">
              {suggestedQuestions.map((question, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-navy-blue text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{question}</p>
                      <div className="mt-2 flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Behavioral</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Industry-Specific</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex gap-3">
              <button className="bg-navy-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
                Generate More Questions
              </button>
              <button
                onClick={() => setShowInterviewQuestions(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateProfile;