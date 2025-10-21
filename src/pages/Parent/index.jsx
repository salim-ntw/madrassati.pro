import React, { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import SideBar from "./side/SideBar";
import { parentAPI } from "../../api/parent";

function Index() {
  const { parentId, childId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [parentData, setParentData] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch parent data and children on component mount
  useEffect(() => {
    const fetchParentData = async () => {
      if (!parentId) {
        setError('No parent ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log('👤 Fetching children for parent:', parentId);
        setLoading(true);
        
        // Call the new API endpoint with parentId
        const response = await parentAPI.getChildren(parentId);
        console.log('✅ Parent and children data received:', response.data);
        
        const data = response.data.data;
        
        // Set parent data
        setParentData({
          id: data.parentId,
          name: data.name,
          email: data.email
        });
        
        // Transform children data to match the expected format
        const childrenData = data.children.map(child => ({
          id: child._id,
          name: child.name,
          grade: child.className || child.gradeLevel || 'Not Assigned',
          email: child.email,
          gpa: child.gpa,
          avatar: child.profilePicture
        }));
        
        setChildren(childrenData);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching parent data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load parent data');
      } finally {
        setLoading(false);
      }
    };

    fetchParentData();
  }, [parentId]);

  // Check if we're on a child route OR profile route
  const isChildRoute = childId !== undefined;
  const isProfileRoute = location.pathname.endsWith('/profile') && !childId;
  const shouldShowOutlet = isChildRoute || isProfileRoute;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading parent profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
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

  // Handler for child selection
  const handleChildSelection = (selectedChildId) => {
    console.log('👶 Child selected:', selectedChildId);
    navigate(`/parent/${parentId}/child/${selectedChildId}/dashboard`);
  };

  // Render child selection content
  const renderChildSelection = () => (
    <div className="flex items-center justify-center min-h-screen p-4 lg:p-6">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {parentData?.name || 'Parent'}! 👋
          </h1>
          <p className="text-gray-600 text-lg">Select a child to view their information</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.length > 0 ? (
            children.map((child) => (
              <button
                key={child.id}
                onClick={() => handleChildSelection(child.id)}
                className="text-left bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 hover:-translate-y-2 transform"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl ring-4 ring-blue-100">
                    {child.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="font-bold text-xl text-gray-900 mb-1">
                      {child.name}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      Grade {child.grade}
                    </div>
                    {child.gpa && (
                      <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        GPA: {child.gpa}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-full bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
              <p className="text-yellow-700 text-lg">No children found in your profile.</p>
              <p className="text-yellow-600 text-sm mt-2">Please contact administration to link your children.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Always show sidebar + content (either child selection or child dashboard)
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg p-3 md:p-4 flex items-center justify-between sticky top-0 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors touch-target"
        >
          ☰
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-800">Parent Portal</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-auto lg:flex-shrink-0 transition-transform duration-300 ease-in-out mobile-sidebar`}
        >
          <div className="h-full lg:h-auto">
            <SideBar 
              setSidebarOpen={setSidebarOpen}
              parentData={parentData}
              children={children}
              selectedChild={children.find(c => c.id === childId)}
            />
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content - Show either child selection or nested routes */}
        <div className="flex-1 lg:col-span-9 p-3 md:p-4 lg:p-6 flex flex-col gap-4 md:gap-6 min-h-screen">
          {!shouldShowOutlet ? (
            renderChildSelection()
          ) : (
            <Outlet context={{ parentData, children, selectedChild: children.find(c => c.id === childId) }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
