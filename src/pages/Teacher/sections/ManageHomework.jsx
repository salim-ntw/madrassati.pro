import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { teacherAPI } from '../../../api/teacher';

export default function ManageHomework() {
  const { teacherId } = useParams();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homeworksLoading, setHomeworksLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);

  // Form states
  const [addForm, setAddForm] = useState({
    className: '',
    subject: '',
    title: '',
    description: '',
    startDate: '',
    dueDate: ''
  });

  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    startDate: '',
    dueDate: ''
  });

  // Fetch teacher's classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await teacherAPI.getClasses(teacherId);
        if (response.data.success) {
          setClasses(response.data.data.classes || []);
          if (response.data.data.classes && response.data.data.classes.length > 0) {
            setSelectedClass(response.data.data.classes[0].className);
          }
        } else {
          setError(response.data.error || 'Failed to fetch classes');
        }
      } catch (err) {
        console.error('Error fetching classes:', err);
        setError('Failed to fetch classes');
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchClasses();
    }
  }, [teacherId]);

  // Fetch homeworks when selected class changes
  useEffect(() => {
    if (selectedClass && teacherId) {
      fetchHomeworksForClass(selectedClass);
    }
  }, [selectedClass, teacherId]);

  const fetchHomeworksForClass = async (className) => {
    try {
      setHomeworksLoading(true);
      const response = await teacherAPI.getHomeworksByClass(teacherId, className);
      if (response.data.success) {
        setHomeworks(response.data.data.homeworks || []);
      } else {
        setError(response.data.error || 'Failed to fetch homeworks');
      }
    } catch (err) {
      console.error('Error fetching homeworks:', err);
      setError('Failed to fetch homeworks');
    } finally {
      setHomeworksLoading(false);
    }
  };

  const handleClassChange = (className) => {
    setSelectedClass(className);
    setError(null);
  };

  const handleAddHomework = () => {
    setAddForm({
      className: selectedClass,
      subject: 'Mathematics', // Default subject, can be made dynamic
      title: '',
      description: '',
      startDate: '',
      dueDate: ''
    });
    setShowAddModal(true);
    setError(null);
  };

  const handleEditHomework = (homework) => {
    setSelectedHomework(homework);
    setEditForm({
      title: homework.title,
      description: homework.description,
      startDate: homework.startDate.split('T')[0], // Convert to YYYY-MM-DD format
      dueDate: homework.dueDate.split('T')[0]
    });
    setShowEditModal(true);
    setError(null);
  };

  const handleDeleteHomework = (homework) => {
    setSelectedHomework(homework);
    setShowDeleteModal(true);
    setError(null);
  };

  const submitAddHomework = async () => {
    try {
      // Validate form data
      if (!addForm.title || !addForm.description || !addForm.startDate || !addForm.dueDate) {
        setError('Please fill in all required fields');
        return;
      }

      // Validate dates
      const startDate = new Date(addForm.startDate);
      const dueDate = new Date(addForm.dueDate);
      if (startDate >= dueDate) {
        setError('Due date must be after start date');
        return;
      }

      const response = await teacherAPI.addHomework(teacherId, addForm);
      if (response.data.success) {
        // Refresh homeworks list
        fetchHomeworksForClass(selectedClass);
        setShowAddModal(false);
        setError(null);
      } else {
        setError(response.data.error || 'Failed to add homework');
      }
    } catch (err) {
      console.error('Error adding homework:', err);
      setError('Failed to add homework');
    }
  };

  const submitEditHomework = async () => {
    try {
      // Validate form data
      if (!editForm.title || !editForm.description || !editForm.startDate || !editForm.dueDate) {
        setError('Please fill in all required fields');
        return;
      }

      // Validate dates
      const startDate = new Date(editForm.startDate);
      const dueDate = new Date(editForm.dueDate);
      if (startDate >= dueDate) {
        setError('Due date must be after start date');
        return;
      }

      const response = await teacherAPI.updateHomework(teacherId, selectedHomework.id, editForm);
      if (response.data.success) {
        // Refresh homeworks list
        fetchHomeworksForClass(selectedClass);
        setShowEditModal(false);
        setError(null);
      } else {
        setError(response.data.error || 'Failed to update homework');
      }
    } catch (err) {
      console.error('Error updating homework:', err);
      setError('Failed to update homework');
    }
  };

  const submitDeleteHomework = async () => {
    try {
      const response = await teacherAPI.deleteHomework(teacherId, selectedHomework.id);
      if (response.data.success) {
        // Refresh homeworks list
        fetchHomeworksForClass(selectedClass);
        setShowDeleteModal(false);
        setError(null);
      } else {
        setError(response.data.error || 'Failed to delete homework');
      }
    } catch (err) {
      console.error('Error deleting homework:', err);
      setError('Failed to delete homework');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading classes...</p>
        </div>
      </div>
    );
  }

  if (error && !classes.length) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">Manage Homework</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Class Selection */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {classes.map((cls, index) => (
          <button
            key={cls.className}
            onClick={() => handleClassChange(cls.className)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
              selectedClass === cls.className
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            Class {cls.className}
          </button>
        ))}
      </div>

      {/* Homework Management Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{ animationDelay: '0.3s' }}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Class {selectedClass} - Homework Assignments
            </h2>
            <button
              onClick={handleAddHomework}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              + Add Homework
            </button>
          </div>
        </div>

        <div className="p-6">
          {homeworksLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Loading homeworks...</p>
              </div>
            </div>
          ) : homeworks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Homework Found</h3>
              <p className="text-gray-500 mb-4">No homework assignments have been created for this class yet.</p>
              <button
                onClick={handleAddHomework}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create First Homework
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {homeworks.map((homework, idx) => (
                <div key={homework.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{homework.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{homework.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📅 Start: {formatDate(homework.startDate)}</span>
                        <span>⏰ Due: {formatDate(homework.dueDate)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(homework.status)}`}>
                          {homework.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-4">
                        <div className="text-sm text-gray-500">Days left</div>
                        <div className={`text-lg font-bold ${
                          homework.daysLeft < 0 
                            ? 'text-red-600' 
                            : homework.daysLeft <= 1 
                            ? 'text-yellow-600' 
                            : 'text-green-600'
                        }`}>
                          {homework.daysLeft < 0 ? 'Overdue' : homework.daysLeft}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditHomework(homework)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteHomework(homework)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>ID: {homework.homeworkId}</span>
                    <span>Duration: {homework.durationDays} days</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Homework Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-xl font-semibold mb-4">➕ Add New Homework</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <input
                    type="text"
                    value={addForm.className}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={addForm.subject}
                    onChange={(e) => setAddForm({ ...addForm, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mathematics"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Homework title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the homework"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={addForm.startDate}
                    onChange={(e) => setAddForm({ ...addForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={addForm.dueDate}
                    onChange={(e) => setAddForm({ ...addForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => { setShowAddModal(false); setError(null); }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitAddHomework}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Homework
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Homework Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-xl font-semibold mb-4">✏️ Edit Homework</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={editForm.startDate}
                    onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={editForm.dueDate}
                    onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => { setShowEditModal(false); setError(null); }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitEditHomework}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Homework Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">🗑️ Delete Homework</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the homework "{selectedHomework?.title}"? 
              This action cannot be undone.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => { setShowDeleteModal(false); setError(null); }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitDeleteHomework}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}