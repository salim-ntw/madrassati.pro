import React, { useState } from "react";

const TestTeacherForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    subject: '',
    classes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log('Form data updated:', { ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Test Teacher Form</h1>
        
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">👨‍🏫 Teacher</option>
            <option value="parent">Parent</option>
          </select>

          {/* Teacher fields - should appear when role is teacher */}
          {formData.role === 'teacher' && (
            <div className="border-2 border-blue-500 p-4 rounded-lg bg-blue-50">
              <h3 className="text-lg font-bold text-blue-950 mb-3">Teacher Information</h3>
              
              <input
                type="text"
                name="subject"
                placeholder="Subject (e.g., Mathematics, Science)"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border-2 border-blue-300 rounded-md mb-3"
              />
              
              <input
                type="text"
                name="classes"
                placeholder="Classes (comma-separated, e.g., 3A, 3B, 4A)"
                value={formData.classes}
                onChange={handleChange}
                className="w-full p-3 border-2 border-blue-300 rounded-md"
              />
              
              <p className="text-sm text-blue-600 mt-2">
                💡 Enter classes separated by commas
              </p>
            </div>
          )}

          {/* Debug info */}
          <div className="bg-gray-100 p-3 rounded text-sm">
            <strong>Debug Info:</strong><br/>
            Role: "{formData.role}"<br/>
            Subject: "{formData.subject}"<br/>
            Classes: "{formData.classes}"<br/>
            Should show teacher fields: {formData.role === 'teacher' ? 'YES' : 'NO'}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestTeacherForm;






