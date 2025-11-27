import React, { useEffect, useState } from 'react';
import { studentAPI, teacherAPI, parentAPI } from '../api/index.js';

// Example component showing how to use the API services
const APIExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Example: Fetch student profile
  const fetchStudentProfile = async () => {
    setLoading(true);
    try {
      const response = await studentAPI.getProfile();
      setData(response.data);
      console.log('✅ Student Profile:', response.data);
    } catch (error) {
      console.error('❌ Error fetching student profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Example: Fetch teacher grades for a specific class
  const fetchTeacherGrades = async (classId) => {
    setLoading(true);
    try {
      const response = await teacherAPI.getGradesByClass(classId);
      setData(response.data);
      console.log('✅ Teacher Grades:', response.data);
    } catch (error) {
      console.error('❌ Error fetching teacher grades:', error);
    } finally {
      setLoading(false);
    }
  };

  // Example: Fetch parent dashboard
  const fetchParentDashboard = async () => {
    setLoading(true);
    try {
      const response = await parentAPI.getDashboard();
      setData(response.data);
      console.log('✅ Parent Dashboard:', response.data);
    } catch (error) {
      console.error('❌ Error fetching parent dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">API Usage Examples</h3>
      
      <div className="space-y-2">
        <button 
          onClick={fetchStudentProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Student Profile'}
        </button>
        
        <button 
          onClick={() => fetchTeacherGrades('class123')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Teacher Grades'}
        </button>
        
        <button 
          onClick={fetchParentDashboard}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Parent Dashboard'}
        </button>
      </div>

      {data && (
        <div className="mt-4 p-4 bg-white rounded border">
          <h4 className="font-semibold mb-2">Response Data:</h4>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default APIExample;
















