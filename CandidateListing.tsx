import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Clock, User, ChevronRight, Download, CheckSquare, Square, MoreVertical } from 'lucide-react';
import { candidates } from '../data';
import { useApp } from '../context/AppContext';

const CandidateListing: React.FC = () => {
  const { setCurrentPage, setSelectedCandidate, biasMode } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('resumeScore');
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
        // Note: department and experience filters would need job data integration
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'resumeScore') return b.resumeScore - a.resumeScore;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'appliedDate') return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        return 0;
      });
  }, [searchTerm, statusFilter, departmentFilter, experienceFilter, sortBy]);

  const handleCandidateClick = (candidate: any) => {
    setSelectedCandidate(candidate);
    setCurrentPage('candidate-profile');
  };

  const handleSelectCandidate = (candidateId: number) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for candidates:`, selectedCandidates);
    setSelectedCandidates([]);
    setShowBulkActions(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hired': return 'bg-green-100 text-green-800';
      case 'Interview Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Offer Extended': return 'bg-purple-100 text-purple-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Average';
    return 'Below Average';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Candidates</h1>
          <p className="text-slate-600">Review and manage your talent pipeline with AI-powered insights</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
            <Download size={16} />
            Export Data
          </button>
          <button className="bg-navy-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
            Import Candidates
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800">{candidates.length}</p>
            <p className="text-sm text-gray-600">Total Candidates</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{candidates.filter(c => c.status === 'Under Review').length}</p>
            <p className="text-sm text-gray-600">Under Review</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{candidates.filter(c => c.status === 'Interview Scheduled').length}</p>
            <p className="text-sm text-gray-600">Interviews Scheduled</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{candidates.filter(c => c.status === 'Hired').length}</p>
            <p className="text-sm text-gray-600">Hired</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{Math.round(candidates.reduce((sum, c) => sum + c.resumeScore, 0) / candidates.length)}</p>
            <p className="text-sm text-gray-600">Avg AI Score</p>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search candidates by name, email, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-navy-blue focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Extended">Offer Extended</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent"
            >
              <option value="resumeScore">AI Score (High to Low)</option>
              <option value="name">Name (A-Z)</option>
              <option value="appliedDate">Applied Date (Recent)</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2 flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>
        
        {/* Saved Filters */}
        <div className="mt-4 flex gap-2">
          <span className="text-sm text-gray-600">Quick Filters:</span>
          <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors">
            High Performers (90+)
          </button>
          <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full hover:bg-green-200 transition-colors">
            Ready for Interview
          </button>
          <button className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full hover:bg-purple-200 transition-colors">
            Recent Applications
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCandidates.length > 0 && (
        <div className="bg-navy-blue text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold">{selectedCandidates.length} candidates selected</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('interview')}
                  className="bg-white text-navy-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Schedule Interviews
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Send Rejection
                </button>
                <button
                  onClick={() => handleBulkAction('talent-pool')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Add to Talent Pool
                </button>
              </div>
            </div>
            <button
              onClick={() => setSelectedCandidates([])}
              className="text-white hover:text-gray-200 transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Candidates Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0 ? (
                      <CheckSquare size={18} />
                    ) : (
                      <Square size={18} />
                    )}
                  </button>
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-800">Candidate</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-800">AI Score</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-800">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-800">Applied</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-800">Last Activity</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleCandidateClick(candidate)}
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCandidate(candidate.id);
                      }}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {selectedCandidates.includes(candidate.id) ? (
                        <CheckSquare size={18} className="text-navy-blue" />
                      ) : (
                        <Square size={18} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {biasMode ? (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-600" />
                        </div>
                      ) : (
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium text-slate-800">
                          {biasMode ? `Candidate #${candidate.id.toString().padStart(5, '0')}` : candidate.name}
                        </div>
                        <div className="text-sm text-gray-600">{candidate.email}</div>
                        <div className="text-xs text-gray-500">{candidate.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Star className={`${getScoreColor(candidate.resumeScore)}`} size={16} fill="currentColor" />
                      <div>
                        <span className={`font-semibold ${getScoreColor(candidate.resumeScore)}`}>
                          {candidate.resumeScore}
                        </span>
                        <span className="text-gray-500 text-sm">/100</span>
                        <div className="text-xs text-gray-500">{getScoreBadge(candidate.resumeScore)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock size={16} />
                      <div>
                        <div>{new Date(candidate.appliedDate).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">
                          {Math.floor((new Date().getTime() - new Date(candidate.appliedDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      <div>{new Date(candidate.lastActivity).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">
                        {Math.floor((new Date().getTime() - new Date(candidate.lastActivity).getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCandidateClick(candidate);
                        }}
                        className="text-navy-blue hover:text-navy-blue/80 transition-colors focus:ring-2 focus:ring-navy-blue rounded"
                        aria-label={`View ${biasMode ? 'candidate' : candidate.name} profile`}
                      >
                        <ChevronRight size={20} />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-gray-600 transition-colors focus:ring-2 focus:ring-gray-400 rounded"
                        aria-label="More actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <User size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
          <button className="bg-navy-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
            Clear All Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredCandidates.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredCandidates.length} of {candidates.length} candidates
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
                Previous
              </button>
              <span className="px-3 py-1 bg-navy-blue text-white rounded">1</span>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateListing;