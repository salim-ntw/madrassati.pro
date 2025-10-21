import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { teacherAPI } from '../../../api/teacher';

export default function ManageGrades() {
  const { teacherId } = useParams();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradesLoading, setGradesLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Form states
  const [addForm, setAddForm] = useState({
    studentId: '',
    className: '',
    subject: '',
    homework: '',
    test: '',
    exam: ''
  });
  const [editForm, setEditForm] = useState({
    homework: '',
    test: '',
    exam: ''
  });

  // Fetch teacher's classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        console.log('📚 Fetching classes for teacher:', teacherId);
        setLoading(true);
        const response = await teacherAPI.getClasses(teacherId);
        console.log('✅ Classes data received:', response.data);
        setClasses(response.data.data.classes || []);
        setError(null);
        
        // Set first class as selected by default
        if (response.data.data.classes && response.data.data.classes.length > 0) {
          setSelectedClass(response.data.data.classes[0].className);
        }
      } catch (err) {
        console.error('❌ Error fetching classes:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load classes');
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchClasses();
    }
  }, [teacherId]);

  // Fetch grades when selected class changes
  useEffect(() => {
    if (selectedClass && teacherId) {
      fetchGradesForClass(selectedClass);
      fetchStudentsForClass(selectedClass);
    }
  }, [selectedClass, teacherId]);

  const fetchGradesForClass = async (className) => {
    try {
      console.log('📊 Fetching grades for class:', className);
      setGradesLoading(true);
      const response = await teacherAPI.getGradesByClass(teacherId, className);
      console.log('✅ Grades data received:', response.data);
      setGrades(response.data.data.grades || []);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching grades:', err);
      if (err.response?.status === 404) {
        // No grades found for this class - this is normal
        setGrades([]);
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to load grades');
      }
    } finally {
      setGradesLoading(false);
    }
  };

  const fetchStudentsForClass = async (className) => {
    try {
      console.log('👥 Fetching students for class:', className);
      
      const response = await teacherAPI.getStudentsByClass(teacherId, className);
      console.log('✅ Students data received:', response.data);
      
      const students = response.data.data.students.map(student => ({
        _id: student._id,
        name: student.name,
        studentId: student._id, // Use _id as studentId for grade submission
        email: student.email,
        gpa: student.gpa,
        attendance: student.attendance
      }));
      
      setStudents(students);
      console.log(`✅ Loaded ${students.length} real students for class ${className}`);
    } catch (err) {
      console.error('❌ Error fetching students:', err);
      // Fallback to empty array if API fails
      setStudents([]);
    }
  };

  const handleClassChange = (className) => {
    setSelectedClass(className);
    setGrades([]);
  };

  const handleAddGrade = () => {
    setAddForm({
      studentId: '',
      className: selectedClass,
      subject: classes.find(c => c.className === selectedClass)?.subject || '',
      homework: '',
      test: '',
      exam: ''
    });
    setShowAddModal(true);
  };

  const handleEditGrade = (grade) => {
    setSelectedGrade(grade);
    setEditForm({ 
      homework: grade.homework,
      test: grade.test,
      exam: grade.exam
    });
    setShowEditModal(true);
  };

  const handleDeleteGrade = (grade) => {
    setSelectedGrade(grade);
    setShowDeleteModal(true);
  };

  const submitAddGrade = async () => {
    try {
      // Validate form data
      if (!addForm.studentId || !addForm.homework || !addForm.test || !addForm.exam) {
        setError('Please fill in all required fields');
        return;
      }

      // Convert string values to numbers
      const gradeData = {
        ...addForm,
        homework: parseFloat(addForm.homework),
        test: parseFloat(addForm.test),
        exam: parseFloat(addForm.exam)
      };

      console.log('➕ Adding new grade:', gradeData);
      const response = await teacherAPI.addGrade(teacherId, gradeData);
      console.log('✅ Grade added successfully:', response.data);
      
      // Refresh grades list
      await fetchGradesForClass(selectedClass);
      setShowAddModal(false);
      setAddForm({ studentId: '', className: '', subject: '', homework: '', test: '', exam: '' });
      setError(null);
    } catch (err) {
      console.error('❌ Error adding grade:', err);
      setError(err.response?.data?.error || err.message || 'Failed to add grade');
    }
  };

  const submitEditGrade = async () => {
    try {
      // Convert string values to numbers
      const gradeData = {
        homework: parseFloat(editForm.homework),
        test: parseFloat(editForm.test),
        exam: parseFloat(editForm.exam)
      };

      console.log('✏️ Updating grade:', selectedGrade.id, gradeData);
      const response = await teacherAPI.updateGrade(teacherId, selectedGrade.id, gradeData);
      console.log('✅ Grade updated successfully:', response.data);
      
      // Refresh grades list
      await fetchGradesForClass(selectedClass);
      setShowEditModal(false);
      setSelectedGrade(null);
      setError(null);
    } catch (err) {
      console.error('❌ Error updating grade:', err);
      setError(err.response?.data?.error || err.message || 'Failed to update grade');
    }
  };

  const submitDeleteGrade = async () => {
    try {
      console.log('🗑️ Deleting grade:', selectedGrade.id);
      const response = await teacherAPI.deleteGrade(teacherId, selectedGrade.id);
      console.log('✅ Grade deleted successfully:', response.data);
      
      // Refresh grades list
      await fetchGradesForClass(selectedClass);
      setShowDeleteModal(false);
      setSelectedGrade(null);
    } catch (err) {
      console.error('❌ Error deleting grade:', err);
      setError(err.response?.data?.error || err.message || 'Failed to delete grade');
    }
  };

  const calculateFinalGrade = (homework, test, exam) => {
    return Math.round((homework * 0.3) + (test * 0.3) + (exam * 0.4) * 100) / 100;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading classes...</p>
        </div>
      </div>
    );
  }

  if (error && !classes.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
          <p className="text-red-600 font-semibold mb-4">⚠️ {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">
        📊 Manage Grades
      </h1>

      {/* Class Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Class:
        </label>
        <div className="flex flex-wrap gap-2">
          {classes.map((cls, idx) => (
            <button
              key={cls.className}
              onClick={() => handleClassChange(cls.className)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
                selectedClass === cls.className
                ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              🏫 {cls.className}
          </button>
        ))}
        </div>
      </div>

      {selectedClass && (
        <>
          {/* Grades Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                📚 Grades for {selectedClass} - {classes.find(c => c.className === selectedClass)?.subject}
              </h2>
              <button
                onClick={handleAddGrade}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                ➕ Add Student Grade
            </button>
        </div>

            {gradesLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading grades...</p>
              </div>
            ) : grades.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Grades Found</h3>
                <p className="text-gray-600">No grades have been entered for this class yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        📝 Homework (30%)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        📋 Test (30%)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        📄 Exam (40%)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        📊 Final Grade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
              </tr>
            </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {grades.map((grade, idx) => (
                      <tr key={grade.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              👩‍🎓 {grade.studentName}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {grade.studentNumber || grade.studentId}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {grade.homework}/20
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {grade.test}/20
                  </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {grade.exam}/20
                  </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            grade.finalGrade >= 10 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {grade.finalGrade}/20
                    </span>
                  </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            grade.status === 'Pass' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {grade.status}
                    </span>
                  </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditGrade(grade)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                            >
                              ✏️ Edit
                      </button>
                            <button
                              onClick={() => handleDeleteGrade(grade)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
            )}
      </div>
        </>
      )}

      {/* Add Grade Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">➕ Add New Grade</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  👩‍🎓 Select Student:
                </label>
                <select
                  value={addForm.studentId}
                  onChange={(e) => setAddForm({ ...addForm, studentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose a student...</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name} ({student.email})
                    </option>
                  ))}
                </select>
                {students.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    No students found for this class. Make sure students are enrolled in {selectedClass}.
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📝 Homework (0-20):
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={addForm.homework}
                  onChange={(e) => setAddForm({ ...addForm, homework: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📋 Test (0-20):
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={addForm.test}
                  onChange={(e) => setAddForm({ ...addForm, test: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📄 Exam (0-20):
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={addForm.exam}
                  onChange={(e) => setAddForm({ ...addForm, exam: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setError(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                  Cancel
                </button>
              <button
                onClick={submitAddGrade}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Grade
                </button>
              </div>
          </div>
        </div>
      )}

      {/* Edit Grade Modal */}
      {showEditModal && selectedGrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ✏️ Edit Grade - {selectedGrade.studentName}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📝 Homework (0-20):
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={editForm.homework}
                  onChange={(e) => setEditForm({ ...editForm, homework: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📋 Test (0-20):
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={editForm.test}
                  onChange={(e) => setEditForm({ ...editForm, test: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📄 Exam (0-20):
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={editForm.exam}
                  onChange={(e) => setEditForm({ ...editForm, exam: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                  Cancel
                </button>
              <button
                onClick={submitEditGrade}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Grade
                </button>
              </div>
          </div>
        </div>
      )}

      {/* Delete Grade Modal */}
      {showDeleteModal && selectedGrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🗑️ Delete Grade
            </h3>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the grade for <strong>{selectedGrade.studentName}</strong>?
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitDeleteGrade}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}