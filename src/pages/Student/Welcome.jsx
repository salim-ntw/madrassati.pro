import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { studentAPI } from '../../api/student';
import picture from "../../assets/welcome.jpg";

export default function Welcome() {
  const { id: studentId } = useParams();
  const [studentName, setStudentName] = useState('Student');
  const [classesToday, setClassesToday] = useState(0);
  const [pendingAssignments, setPendingAssignments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        console.log('👋 Welcome: Fetching data for student:', studentId);
        
        // Fetch both profile and dashboard data
        const [profileResponse, dashboardResponse] = await Promise.all([
          studentAPI.getProfile(studentId),
          studentAPI.getDashboard(studentId)
        ]);
        
        // Get student name
        const name = profileResponse.data.data.name || 'Student';
        const firstName = name.split(' ')[0];
        setStudentName(firstName);
        
        // Get dashboard counts
        const dashboardData = dashboardResponse.data.data;
        
        // Get pending homework count
        const homeworkCount = dashboardData.counts?.pendingHomework || 0;
        setPendingAssignments(homeworkCount);
        
        // Count classes today (from schedule grouped by day)
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        
        // Try to get schedule to count classes today
        try {
          const scheduleResponse = await studentAPI.getSchedule(studentId);
          const schedule = scheduleResponse.data.data.schedule || {};
          const todayClasses = schedule[today] || [];
          setClassesToday(todayClasses.length);
        } catch (err) {
          console.log('Could not fetch schedule, using 0');
          setClassesToday(0);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('❌ Welcome: Error fetching data:', err);
        setStudentName('Student');
        setClassesToday(0);
        setPendingAssignments(0);
        setLoading(false);
      }
    };

    if (studentId) {
      fetchWelcomeData();
    }
  }, [studentId]);

  return (
    <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6 items-center animate-slideInUp' style={{animationDelay: '0.2s'}}>
        <div className='flex flex-col gap-4 max-w-lg'>
            <h1 className='text-2xl font-bold'>
              Welcome back, {loading ? 'loading...' : studentName}! 👋
            </h1>
            <p className='text-blue-100 leading-relaxed'>Here you can quickly check your schedule, view grades, follow announcements, and stay updated with everything happening in your school.</p>
            <div className='flex gap-4 mt-2'>
                <div className='bg-white/20 px-3 py-1 rounded-full text-sm'>
                    📚 {loading ? '...' : classesToday} {classesToday === 1 ? 'Class' : 'Classes'} Today
                </div>
                <div className='bg-white/20 px-3 py-1 rounded-full text-sm'>
                    📝 {loading ? '...' : pendingAssignments} Assignment{pendingAssignments === 1 ? '' : 's'} Due
                </div>
            </div>
        </div>
        <div className='flex-shrink-0'>
            <img className='w-48 h-32 md:w-56 md:h-40 rounded-lg shadow-lg object-cover' src={picture} alt="welcome img" />
        </div>
    </div>
  );
}