import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { parentAPI } from '../../../api/parent';

export default function Homework() {
  const outletContext = useOutletContext();
  const { selectedChild: child } = outletContext || {};
  const { childId, parentId } = useParams();
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomework = async () => {
      if (!parentId || !childId) {
        setError('Missing parent or child ID');
        setLoading(false);
        return;
      }

      try {
        console.log('📝 Fetching homework for parent:', parentId, 'child:', childId);
        setLoading(true);
        const response = await parentAPI.getChildHomework(parentId, childId);
        console.log('✅ Homework data received:', response.data);
        setHomework(response.data.data.homework || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching homework:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load homework');
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();
  }, [parentId, childId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading homework...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center m-6">
        <p className="text-red-600 font-semibold">⚠️ {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const activeHomework = homework.filter(hw => hw.status === 'active');
  const overdueHomework = homework.filter(hw => hw.status === 'overdue');
  const upcomingHomework = homework.filter(hw => hw.status === 'upcoming');

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">📝 {child?.name || 'Child'}'s Homework</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slideInUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-3xl font-bold text-green-600">{activeHomework.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-2xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-3xl font-bold text-red-600">{overdueHomework.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-2xl">⚠️</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-3xl font-bold text-blue-600">{upcomingHomework.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-2xl">📅</div>
          </div>
        </div>
      </div>

      {homework.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500 text-lg">No homework assignments yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {homework.map((hw, index) => {
            const daysRemaining = getDaysRemaining(hw.dueDate);
            return (
              <div key={hw._id || index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-slideInUp" style={{animationDelay: `${(index + 4) * 0.1}s`}}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{hw.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(hw.status)}`}>{hw.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">📚 Subject: <span className="font-medium">{hw.subject}</span></p>
                    <p className="text-sm text-gray-700 mb-3">{hw.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div><span className="font-medium">Start:</span> {formatDate(hw.startDate)}</div>
                      <div><span className="font-medium">Due:</span> {formatDate(hw.dueDate)}</div>
                      <div><span className="font-medium">Duration:</span> {hw.durationDays} days</div>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end gap-3">
                    <div className={`w-3 h-3 ${getPriorityColor(hw.priority)} rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-600 capitalize">{hw.priority} Priority</span>
                    {daysRemaining >= 0 ? (
                      <div className="text-center mt-2">
                        <div className="text-2xl font-bold text-blue-600">{daysRemaining}</div>
                        <div className="text-xs text-gray-500">days left</div>
                      </div>
                    ) : (
                      <div className="text-center mt-2">
                        <div className="text-2xl font-bold text-red-600">{Math.abs(daysRemaining)}</div>
                        <div className="text-xs text-gray-500">days overdue</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

