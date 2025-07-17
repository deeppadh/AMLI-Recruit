import React, { useState } from 'react';
import { Plus, MapPin, Users, Calendar, AlertCircle, X, Wand2, Building, GraduationCap, Star, TrendingUp } from 'lucide-react';
import { jobPostings } from '../data';

const JobPostings: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    channel: '',
    location: '',
    department: '',
    experienceLevel: '',
    educationRequired: '',
    description: '',
    requirements: '',
    keySkills: '',
    salary: '',
    urgency: 'Medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit logic here
      setShowModal(false);
      setCurrentStep(1);
      setFormData({
        title: '',
        channel: '',
        location: '',
        department: '',
        experienceLevel: '',
        educationRequired: '',
        description: '',
        requirements: '',
        keySkills: '',
        salary: '',
        urgency: 'Medium'
      });
    }
  };

  const generateWithAI = () => {
    if (formData.title && formData.channel) {
      // Simulate AI generation
      const sampleDescriptions = {
        'Actuarial': 'Lead actuarial analysis and pricing strategies for life insurance products. Ensure compliance with IRDAI regulations while optimizing profitability and risk assessment.',
        'Sales': 'Drive sales growth through strategic planning and team leadership. Build strong customer relationships and achieve ambitious revenue targets.',
        'Operations': 'Manage operational excellence in insurance processes. Ensure efficient workflow and high-quality service delivery.',
        'IT': 'Develop and maintain robust insurance technology solutions. Work with modern frameworks and ensure system reliability.',
        'HR': 'Partner with business leaders to drive talent strategy and organizational development. Focus on employee engagement and performance management.'
      };
      
      const sampleRequirements = {
        'Actuarial': 'FIAI certification, 5+ years experience, Strong analytical skills, IRDAI knowledge',
        'Sales': 'MBA preferred, Sales leadership experience, Target achievement record, Team management skills',
        'Operations': 'Process improvement experience, Quality management, Customer service focus, Attention to detail',
        'IT': 'Technical degree, Programming skills, Insurance domain knowledge, Problem-solving abilities',
        'HR': 'MBA HR, SHRM certification, Business partnering experience, Change management skills'
      };

      const department = formData.title.includes('Actuarial') ? 'Actuarial' :
                        formData.title.includes('Sales') || formData.title.includes('Agency') ? 'Sales' :
                        formData.title.includes('Claims') || formData.title.includes('Customer') ? 'Operations' :
                        formData.title.includes('IT') || formData.title.includes('Developer') ? 'IT' : 'HR';

      setFormData({
        ...formData,
        description: sampleDescriptions[department as keyof typeof sampleDescriptions] || 'Professional role in insurance industry with growth opportunities.',
        requirements: sampleRequirements[department as keyof typeof sampleRequirements] || 'Relevant experience and qualifications required.'
      });
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'Agency': return 'bg-navy-blue text-white';
      case 'Bancassurance': return 'bg-accent-burgundy text-white';
      case 'Direct': return 'bg-blue-500 text-white';
      case 'Online/Digital': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const JobCard: React.FC<{ job: any }> = ({ job }) => (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{job.title}</h3>
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Building size={16} />
              {job.department}
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap size={16} />
              {job.experienceLevel}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Users size={16} />
              {job.applicantIds.length} applicants
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              Posted {new Date(job.postedDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            job.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {job.status}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getUrgencyColor(job.urgency)}`}>
            {job.urgency} Priority
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getChannelColor(job.channel)}`}>
          {job.channel}
        </span>
        {job.keySkills && job.keySkills.slice(0, 2).map((skill: string, index: number) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {skill}
          </span>
        ))}
      </div>

      <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
      <p className="text-sm font-semibold text-slate-800 mb-4">{job.salary}</p>

      {/* Key Skills */}
      {job.keySkills && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">Key Skills Required:</p>
          <div className="flex flex-wrap gap-1">
            {job.keySkills.slice(0, 3).map((skill: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                {skill}
              </span>
            ))}
            {job.keySkills.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                +{job.keySkills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button className="flex-1 bg-navy-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
          View Details
        </button>
        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          <Wand2 size={16} />
          AI Source
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Job Postings</h1>
          <p className="text-slate-600">Manage your open positions and track applications across all channels</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-navy-blue text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition-transform focus:ring-2 focus:ring-navy-blue focus:ring-offset-2"
        >
          <Plus size={20} />
          Create Job Posting
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Briefcase size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-xl font-bold text-slate-800">{jobPostings.filter(job => job.status === 'Active').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-xl font-bold text-slate-800">
                {jobPostings.reduce((sum, job) => sum + job.applicantIds.length, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-xl font-bold text-slate-800">
                {jobPostings.filter(job => job.urgency === 'High').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Applications</p>
              <p className="text-xl font-bold text-slate-800">
                {Math.round(jobPostings.reduce((sum, job) => sum + job.applicantIds.length, 0) / jobPostings.length)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobPostings.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Enhanced Multi-step Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Create Job Posting</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-navy-blue rounded"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              {[1, 2, 3].map(step => (
                <React.Fragment key={step}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep ? 'bg-navy-blue text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-4 ${
                      step < currentStep ? 'bg-navy-blue' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                        placeholder="e.g., Senior Actuarial Analyst"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="Sales">Sales</option>
                        <option value="Operations">Operations</option>
                        <option value="Actuarial">Actuarial</option>
                        <option value="IT">Information Technology</option>
                        <option value="HR">Human Resources</option>
                        <option value="Product">Product Management</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                      <select
                        value={formData.channel}
                        onChange={(e) => setFormData({...formData, channel: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                        required
                      >
                        <option value="">Select Channel</option>
                        <option value="Agency">Agency Network</option>
                        <option value="Bancassurance">Bancassurance Partnerships</option>
                        <option value="Direct">Direct Sales</option>
                        <option value="Online/Digital">Online/Digital</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                      <select
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                        required
                      >
                        <option value="">Select Level</option>
                        <option value="Entry-Level">Entry-Level (0-2 years)</option>
                        <option value="Mid-Senior">Mid-Senior (3-7 years)</option>
                        <option value="Lead">Lead (8-12 years)</option>
                        <option value="Director">Director (12+ years)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                        placeholder="e.g., Mumbai, Maharashtra"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Education Required</label>
                      <input
                        type="text"
                        value={formData.educationRequired}
                        onChange={(e) => setFormData({...formData, educationRequired: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                        placeholder="e.g., MBA, B.Tech, FIAI"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">Job Details</h3>
                    <button
                      type="button"
                      onClick={generateWithAI}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      <Wand2 size={16} />
                      Generate with AI
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                      placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                      placeholder="List key requirements, qualifications, and skills needed..."
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Key Skills (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.keySkills}
                        onChange={(e) => setFormData({...formData, keySkills: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                        placeholder="e.g., Risk Assessment, IRDAI Compliance, Leadership"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={(e) => setFormData({...formData, salary: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                        placeholder="e.g., ₹ 8,00,000 - ₹ 12,00,000 P.A."
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Publishing Options</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                    >
                      <option value="Low">Low Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                    </select>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="text-blue-500 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold text-blue-800">AI-Powered Job Distribution</h4>
                        <p className="text-blue-700 text-sm mb-3">This job will be automatically optimized and distributed across your selected channels using AI insights for maximum reach and quality candidates.</p>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• Automatic posting to relevant job boards</li>
                          <li>• AI-optimized job descriptions for better visibility</li>
                          <li>• Smart candidate matching and recommendations</li>
                          <li>• Real-time performance analytics and optimization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Estimated Results</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-green-700">Expected Applications:</p>
                        <p className="font-semibold text-green-800">15-25 candidates</p>
                      </div>
                      <div>
                        <p className="text-green-700">Time to Fill:</p>
                        <p className="font-semibold text-green-800">18-25 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-auto bg-navy-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2"
                >
                  {currentStep === 3 ? 'Publish Job' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostings;