import React, { useState } from 'react';
import { Shield, Bell, Users, Brain, Globe, Save, Eye, EyeOff, Key, Database, Zap, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { teamMembers, integrations } from '../data';

const Settings: React.FC = () => {
  const { biasMode, setBiasMode } = useApp();
  const [activeSection, setActiveSection] = useState('bias');

  const sections = [
    { id: 'bias', label: 'Bias Mitigation', icon: Shield },
    { id: 'ai', label: 'AI Configuration', icon: Brain },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'security', label: 'Security', icon: Key }
  ];

  const getIntegrationStatusColor = (status: string) => {
    return status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getIntegrationIcon = (category: string) => {
    switch (category) {
      case 'Sourcing': return '🔍';
      case 'HRIS': return '👥';
      case 'Payroll': return '💰';
      case 'Learning': return '📚';
      case 'Verification': return '✅';
      case 'Assessment': return '🎯';
      default: return '🔧';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-600">Configure your AMLI TalentEdge AI platform preferences and integrations</p>
      </div>

      <div className="flex gap-6">
        {/* Settings Navigation */}
        <div className="w-64 bg-white rounded-lg shadow-md p-4">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-navy-blue ${
                    activeSection === section.id
                      ? 'bg-navy-blue text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeSection === 'bias' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Shield className="text-green-600" size={24} />
                  <h2 className="text-xl font-semibold text-slate-800">Bias Mitigation Framework</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Anonymous Review Mode</h3>
                    <p className="text-gray-600">Hide candidate photos and names during initial screening to reduce unconscious bias</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={biasMode}
                      onChange={(e) => setBiasMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-navy-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-blue"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Hide Demographics</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-navy-blue focus:ring-navy-blue" />
                        <span className="text-sm text-gray-700">Age Information</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-navy-blue focus:ring-navy-blue" />
                        <span className="text-sm text-gray-700">Gender Indicators</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300 text-navy-blue focus:ring-navy-blue" />
                        <span className="text-sm text-gray-700">Educational Institution Names</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">AI Model Sensitivity</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Demographic Bias Detection</label>
                        <input type="range" min="1" max="10" defaultValue="8" className="w-full" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Language Bias Filtering</label>
                        <input type="range" min="1" max="10" defaultValue="7" className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Shield size={20} />
                    Current Bias Reduction Score: 94%
                  </h4>
                  <p className="text-green-700 text-sm">Excellent! Your hiring process demonstrates industry-leading bias reduction practices. This puts you in the top 5% of organizations for fair hiring practices.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ai' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Brain className="text-purple-600" size={24} />
                  <h2 className="text-xl font-semibold text-slate-800">AI Configuration</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Resume Screening</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Screening Sensitivity</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        defaultValue="7"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Conservative</span>
                        <span>Balanced</span>
                        <span>Aggressive</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Score Threshold</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        defaultValue="70"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Interview Analysis</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Analysis Depth</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent">
                        <option>Basic (Speech & Content)</option>
                        <option>Standard (+ Sentiment Analysis)</option>
                        <option>Advanced (+ Behavioral Insights)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language Processing</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-navy-blue focus:ring-navy-blue" />
                          <span className="text-sm text-gray-700">Multi-language Support</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-navy-blue focus:ring-navy-blue" />
                          <span className="text-sm text-gray-700">Regional Accent Recognition</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Scoring Weights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-gray-600">Resume Analysis</label>
                      <input type="number" defaultValue="40" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-blue focus:border-transparent" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">AI Interview</label>
                      <input type="number" defaultValue="35" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-blue focus:border-transparent" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Psychometric</label>
                      <input type="number" defaultValue="20" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-blue focus:border-transparent" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Digital Footprint</label>
                      <input type="number" defaultValue="5" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-blue focus:border-transparent" />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">AI Performance Metrics</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Accuracy:</span>
                      <span className="font-semibold text-blue-800 ml-2">96.2%</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Processing Speed:</span>
                      <span className="font-semibold text-blue-800 ml-2">2.3s avg</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Model Version:</span>
                      <span className="font-semibold text-blue-800 ml-2">v2.1.4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Bell className="text-yellow-600" size={24} />
                  <h2 className="text-xl font-semibold text-slate-800">Notification Preferences</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Email Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">New Applications</span>
                          <p className="text-sm text-gray-600">Get notified when new candidates apply</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">AI Screening Complete</span>
                          <p className="text-sm text-gray-600">Notification when AI finishes candidate analysis</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">Interview Reminders</span>
                          <p className="text-sm text-gray-600">Reminders for scheduled interviews</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Push Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">High-Priority Candidates</span>
                          <p className="text-sm text-gray-600">Immediate alerts for top-scoring candidates</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">System Alerts</span>
                          <p className="text-sm text-gray-600">Important system updates and maintenance</p>
                        </div>
                        <input type="checkbox" className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">Weekly Reports</span>
                          <p className="text-sm text-gray-600">Weekly hiring analytics and insights</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-slate-800 mb-3">Notification Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours Start</label>
                      <input type="time" defaultValue="22:00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours End</label>
                      <input type="time" defaultValue="08:00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'team' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-slate-800">Team Management</h2>
                  </div>
                  <button className="bg-navy-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
                    Invite Team Member
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <img src={member.photoUrl} alt={member.name} className="w-12 h-12 rounded-full" />
                        <div>
                          <h3 className="font-medium text-slate-800">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {member.status}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {member.permissions}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-navy-blue hover:text-navy-blue transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
                    + Invite New Team Member
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-slate-800 mb-4">Role Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Admin</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Full system access</li>
                        <li>• User management</li>
                        <li>• Settings configuration</li>
                        <li>• Data export</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Recruiter</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Candidate management</li>
                        <li>• Interview scheduling</li>
                        <li>• Communication tools</li>
                        <li>• Basic reporting</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Department Head</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Department candidates</li>
                        <li>• Approval workflows</li>
                        <li>• Team analytics</li>
                        <li>• Budget oversight</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="text-indigo-600" size={24} />
                    <h2 className="text-xl font-semibold text-slate-800">System Integrations</h2>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    Browse Marketplace
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                            {getIntegrationIcon(integration.category)}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-800">{integration.name}</h3>
                            <p className="text-sm text-gray-600">{integration.category}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getIntegrationStatusColor(integration.status)}`}>
                          {integration.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Last sync: {new Date(integration.lastSync).toLocaleDateString()}
                        </span>
                        <button className={`px-3 py-1 rounded text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 ${
                          integration.status === 'Connected' 
                            ? 'text-red-600 hover:bg-red-50 focus:ring-red-500' 
                            : 'text-green-600 hover:bg-green-50 focus:ring-green-500'
                        }`}>
                          {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-slate-800 mb-4">API Configuration</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Key size={16} className="text-gray-600" />
                      <span className="font-medium text-gray-800">API Key Management</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Manage API keys for custom integrations and third-party services.</p>
                    <button className="bg-navy-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
                      Manage API Keys
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Key className="text-red-600" size={24} />
                  <h2 className="text-xl font-semibold text-slate-800">Security & Privacy</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Data Protection</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">Data Encryption</span>
                          <p className="text-sm text-gray-600">Encrypt all candidate data at rest</p>
                        </div>
                        <input type="checkbox" defaultChecked disabled className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">GDPR Compliance</span>
                          <p className="text-sm text-gray-600">Automatic data retention policies</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">Audit Logging</span>
                          <p className="text-sm text-gray-600">Track all user actions and data access</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Access Control</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent">
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                          <option>8 hours</option>
                        </select>
                      </div>
                      
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">Two-Factor Authentication</span>
                          <p className="text-sm text-gray-600">Require 2FA for all users</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">IP Restrictions</span>
                          <p className="text-sm text-gray-600">Limit access to specific IP ranges</p>
                        </div>
                        <input type="checkbox" className="w-4 h-4 text-navy-blue bg-gray-100 border-gray-300 rounded focus:ring-navy-blue focus:ring-2" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-red-800">Security Alert</h4>
                      <p className="text-red-700 text-sm">Your system is secure. Last security scan completed on {new Date().toLocaleDateString()}. No vulnerabilities detected.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-green-700">Uptime</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">256-bit</div>
                    <div className="text-sm text-blue-700">Encryption</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">SOC 2</div>
                    <div className="text-sm text-purple-700">Compliant</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-navy-blue text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
          <Save size={20} />
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;