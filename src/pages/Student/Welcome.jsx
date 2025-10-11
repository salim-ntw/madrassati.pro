import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { studentAPI } from '../../api/student';
import picture from "../../assets/welcome.jpg";

export default function Welcome() {
  const { id: studentId } = useParams();
  const [studentName, setStudentName] = useState('Student');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        console.log('👋 Welcome: Fetching name for student:', studentId);
        const response = await studentAPI.getProfile(studentId);
        const name = response.data.data.name || 'Student';
        // Extract first name only
        const firstName = name.split(' ')[0];
        setStudentName(firstName);
        setLoading(false);
      } catch (err) {
        console.error('❌ Welcome: Error fetching name:', err);
        setStudentName('Student');
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentName();
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
                    📚 4 Classes Today
                </div>
                <div className='bg-white/20 px-3 py-1 rounded-full text-sm'>
                    📝 3 Assignments Due
                </div>
            </div>
        </div>
        <div className='flex-shrink-0'>
            <img className='w-48 h-32 md:w-56 md:h-40 rounded-lg shadow-lg object-cover' src={picture} alt="welcome img" />
        </div>
    </div>
  );
}