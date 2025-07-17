import React from 'react';
import { CheckCircle, Clock, AlertCircle, Users, TrendingUp, BookOpen, Award, Target, Calendar, BarChart3 } from 'lucide-react';
import { candidates, learningModules } from '../data';

const OnboardingDashboard: React.FC = () => {
  const hiredCandidates = candidates.filter(candidate => candidate.status === 'Hired');

  const ProgressBar: React.FC<{ progress: number; color: string }> = ({ progress, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className={`h-3 rounded-full transition-all duration-500 ease-out ${color}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={20} className="text-green-500" />;
      case 'In Progress': return <Clock size={20} className="text-blue-500" />;
      default: return <AlertCircle size={20} className="text-gray-400" />;
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Required': return 'bg-red-100 text-red-800';
      case 'Recommended': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Regulatory': return <Shield className="text-red-600" size={20} />;
      case 'Product': return <Award className="text-blue-600" size={20} />;
      case 'Sales': return <Target className="text-green-600" size={20} />;
      case 'Technology': return <BarChart3 className="text-purple-600" size={20} />;
      case 'Service': return <Users className="text-orange-600" size={20} />;
      case 'Operations': return <BookOpen className="text-indigo-600" size={20} />;
      default: return <BookOpen className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Onboarding Dashboard</h1>
        <p className="text-slate-600">Track new hire progress, skill development, and learning outcomes</p>
      </div>

      {/* Enhanced Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Onboarding</p>
              <p className="text-3xl font-bold text-slate-800">{hiredCandidates.length}</p>
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp size={16} />
                +2 this week
              </p>
            </div>
            <div className="p-4 rounded-full bg-navy-blue">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg. Progress</p>
              <p className="text-3xl font-bold text-slate-800">
                {Math.round(hiredCandidates.reduce((sum, c) => sum + (c.onboarding?.onboardingProgress || 0), 0) / hiredCandidates.length)}%
              </p>
              <p className="text-sm text-blue-600 mt-1">On track</p>
            </div>
            <div className="p-4 rounded-full bg-green-500">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completion Rate</p>
              <p className="text-3xl font-bold text-slate-800">92%</p>
              <p className="text-sm text-green-600 mt-1">Excellent</p>
            </div>
            <div className="p-4 rounded-full bg-accent-burgundy">
              <Award size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg. Time to Productive</p>
              <p className="text-3xl font-bold text-slate-800">21 days</p>
              <p className="text-sm text-green-600 mt-1">-3 days improved</p>
            </div>
            <div className="p-4 rounded-full bg-purple-500">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Onboarding Programs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Active Onboarding Programs</h2>
            <div className="flex gap-2">
              <button className="bg-navy-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
                Generate Report
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
                Export Data
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {hiredCandidates.map((candidate) => (
            <div key={candidate.id} className="border border-gray-200 rounded-lg p-6 mb-6 last:mb-0 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.email}</p>
                      <p className="text-xs text-gray-500">Started: {new Date(candidate.lastActivity).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-navy-blue mb-1">
                        {candidate.onboarding?.onboardingProgress || 0}%
                      </div>
                      <p className="text-sm text-gray-600">Complete</p>
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          (candidate.onboarding?.onboardingProgress || 0) >= 80 ? 'bg-green-100 text-green-800' :
                          (candidate.onboarding?.onboardingProgress || 0) >= 60 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {(candidate.onboarding?.onboardingProgress || 0) >= 80 ? 'Excellent' :
                           (candidate.onboarding?.onboardingProgress || 0) >= 60 ? 'Good' : 'Needs Attention'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <ProgressBar
                      progress={candidate.onboarding?.onboardingProgress || 0}
                      color={getProgressColor(candidate.onboarding?.onboardingProgress || 0)}
                    />
                  </div>

                  {/* Enhanced Skill Gap Analysis */}
                  {candidate.onboarding?.skillGapAnalysis && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                          <CheckCircle size={16} />
                          Strengths
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {candidate.onboarding.skillGapAnalysis.strengths.map((strength, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                          <Target size={16} />
                          Development Areas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {candidate.onboarding.skillGapAnalysis.weaknesses.map((weakness, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full border border-orange-200"
                            >
                              {weakness}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Onboarding Tasks */}
                  {candidate.onboarding?.onboardingPlan && (
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Calendar size={16} />
                        Onboarding Plan Progress
                      </h4>
                      <div className="space-y-3">
                        {candidate.onboarding.onboardingPlan.map((task, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            {getTaskStatusIcon(task.status)}
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{task.task}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getTaskStatusColor(task.status)}`}>
                                  {task.status}
                                </span>
                              </div>
                            </div>
                            {task.status === 'Pending' && (
                              <button className="text-navy-blue hover:text-navy-blue/80 text-sm font-medium transition-colors focus:ring-2 focus:ring-navy-blue rounded">
                                Mark Complete
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Learning Modules */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Learning Management System</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              Add New Module
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningModules.map((module) => {
              const Icon = getCategoryIcon(module.category);
              return (
                <div key={module.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      {Icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{module.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium text-gray-700">{module.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(module.priority)}`}>
                        {module.priority}
                      </span>
                      <button className="text-navy-blue hover:text-navy-blue/80 font-medium text-sm transition-colors focus:ring-2 focus:ring-navy-blue rounded">
                        View Details
                      </button>
                    </div>
                    
                    {module.topics && (
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Key Topics:</p>
                        <div className="flex flex-wrap gap-1">
                          {module.topics.slice(0, 2).map((topic, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                              {topic}
                            </span>
                          ))}
                          {module.topics.length > 2 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                              +{module.topics.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Learning Analytics */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-slate-800">Learning Analytics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-2">Module Completion Rate</h3>
              <div className="text-3xl font-bold mb-2">87%</div>
              <p className="text-blue-100 text-sm">Across all active learners</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-2">Avg. Learning Time</h3>
              <div className="text-3xl font-bold mb-2">4.2h</div>
              <p className="text-green-100 text-sm">Per week per learner</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-2">Knowledge Retention</h3>
              <div className="text-3xl font-bold mb-2">92%</div>
              <p className="text-purple-100 text-sm">30-day retention rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDashboard;