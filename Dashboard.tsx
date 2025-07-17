import React from 'react';
import { TrendingUp, Users, Briefcase, Clock, Brain, Target, Shield, Award, ArrowUp, ArrowDown, Activity, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { dashboardMetrics, recentActivities } from '../data';

const Dashboard: React.FC = () => {
  const { overview, aiInsights, channelPerformance } = dashboardMetrics;

  const MetricCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: React.ElementType; 
    change?: string; 
    color: string;
    trend?: 'up' | 'down' | 'neutral';
    actionText?: string;
  }> = ({ title, value, icon: Icon, change, color, trend = 'up', actionText }) => (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mb-2">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              {trend === 'up' ? (
                <ArrowUp size={16} className="text-green-600" />
              ) : trend === 'down' ? (
                <ArrowDown size={16} className="text-red-600" />
              ) : (
                <Activity size={16} className="text-blue-600" />
              )}
              <p className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {change}
              </p>
            </div>
          )}
          {actionText && (
            <p className="text-xs text-gray-500 mt-1">{actionText}</p>
          )}
        </div>
        <div className={`p-4 rounded-full ${color} flex-shrink-0`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hire': return CheckCircle;
      case 'interview': return Users;
      case 'application': return Briefcase;
      case 'offer': return Award;
      case 'job_posting': return Calendar;
      case 'screening': return Brain;
      default: return Activity;
    }
  };

  const getActivityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-green-500 bg-green-50';
      case 'medium': return 'border-blue-500 bg-blue-50';
      case 'low': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening with your talent pipeline.</p>
      </div>

      {/* Key Performance Indicators */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Applications"
            value={overview.totalApplications.toLocaleString()}
            icon={Users}
            change="+18% this month"
            color="bg-navy-blue"
            actionText="Target: 1,500 by month-end"
          />
          <MetricCard
            title="Active Job Postings"
            value={overview.activeJobs}
            icon={Briefcase}
            change="+5 new this week"
            color="bg-green-500"
            actionText="12 closing this month"
          />
          <MetricCard
            title="Hired This Month"
            value={overview.hiredThisMonth}
            icon={Award}
            change="+40% vs last month"
            color="bg-accent-burgundy"
            actionText="Goal: 45 hires"
          />
          <MetricCard
            title="Avg. Time to Hire"
            value={`${overview.avgTimeToHire} days`}
            icon={Clock}
            change="-3 days improved"
            color="bg-blue-500"
            actionText="Industry avg: 25 days"
          />
        </div>
      </section>

      {/* Additional Metrics */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Recruitment Efficiency</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Offer Acceptance Rate"
            value={`${overview.offerAcceptanceRate}%`}
            icon={Target}
            change="+5% this quarter"
            color="bg-purple-500"
            actionText="Industry benchmark: 85%"
          />
          <MetricCard
            title="Diversity Score"
            value={`${overview.diversityScore}%`}
            icon={Shield}
            change="+8% improvement"
            color="bg-indigo-500"
            actionText="Target: 80% by Q2"
          />
          <MetricCard
            title="Avg. Time to Fill"
            value={`${overview.avgTimeToFill} days`}
            icon={Calendar}
            change="-5 days vs Q4"
            color="bg-orange-500"
            actionText="Critical roles: 21 days"
          />
        </div>
      </section>

      {/* AI Performance Insights */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">AI Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Resume Screening Accuracy"
            value={`${aiInsights.resumeScreeningAccuracy}%`}
            icon={Brain}
            change="+3% this week"
            color="bg-purple-600"
            actionText="Excellent performance"
          />
          <MetricCard
            title="Interview Prediction Rate"
            value={`${aiInsights.interviewPredictionRate}%`}
            icon={Target}
            change="+2% this week"
            color="bg-indigo-600"
            actionText="Above industry standard"
          />
          <MetricCard
            title="Bias Reduction Score"
            value={`${aiInsights.biasReductionScore}%`}
            icon={Shield}
            change="Excellent"
            color="bg-green-600"
            trend="neutral"
            actionText="Leading industry practice"
          />
          <MetricCard
            title="Candidate Match Rate"
            value={`${aiInsights.candidateMatch}%`}
            icon={TrendingUp}
            change="+4% this month"
            color="bg-orange-600"
            actionText="Quality over quantity"
          />
        </div>
      </section>

      {/* Channel Performance */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Channel Performance Analysis</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(channelPerformance).map(([channel, data]) => (
              <div key={channel} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">{channel}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-2xl font-bold text-navy-blue">{data.applications}</span>
                    <p className="text-sm text-gray-600">Applications</p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-green-600">{data.hires}</span>
                    <p className="text-sm text-gray-600">Hires</p>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-accent-burgundy">{data.successRate}%</span>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      {channel === 'Online/Digital' ? 'Highest conversion' : 
                       channel === 'Agency Network' ? 'Largest volume' :
                       channel === 'Bancassurance Partnerships' ? 'Quality candidates' :
                       'Steady performance'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity Feed */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div 
                  key={activity.id} 
                  className={`flex items-center gap-4 p-4 border-l-4 rounded-lg transition-all hover:shadow-sm ${getActivityColor(activity.priority)}`}
                >
                  <div className={`p-2 rounded-full ${
                    activity.priority === 'high' ? 'bg-green-500' :
                    activity.priority === 'medium' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{activity.message}</p>
                    <p className="text-sm text-gray-600">{formatTimestamp(activity.timestamp)}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    activity.priority === 'high' ? 'bg-green-100 text-green-800' :
                    activity.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.priority.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="text-navy-blue hover:text-navy-blue/80 font-medium text-sm transition-colors focus:ring-2 focus:ring-navy-blue rounded">
              View All Activities →
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-navy-blue to-blue-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">AI Candidate Sourcing</h3>
            <p className="text-blue-100 mb-4">Find top candidates using AI-powered search</p>
            <button className="bg-white text-navy-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-blue">
              Start Sourcing
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-accent-burgundy to-red-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Bulk Interview Scheduling</h3>
            <p className="text-red-100 mb-4">Schedule interviews for multiple candidates</p>
            <button className="bg-white text-accent-burgundy px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent-burgundy">
              Schedule Now
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Generate Reports</h3>
            <p className="text-green-100 mb-4">Create comprehensive hiring analytics</p>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500">
              Generate Report
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;