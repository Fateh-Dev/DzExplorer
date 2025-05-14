import React from "react";

const AdminPage = () => (
  <div className="max-w-2xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
    <p className="mb-6">Welcome to the admin panel. Here you can manage trips, users, and view analytics.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>Manage trips (add, edit, delete)</li>
      <li>View and manage user accounts</li>
      <li>Access analytics and reports</li>
    </ul>
    <p>More admin features coming soon!</p>
  </div>
);

export default AdminPage;