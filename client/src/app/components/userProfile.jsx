import Image from "next/image";

export default function UserProfile({ user }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center space-x-4">
        <Image src={"/blank-avatar.png"} alt="User Avatar" width={80} height={80} className="rounded-full" />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Contact:</strong> {[user.contactNumber1, user.contactNumber2].filter(Boolean).join(", ")}
        </p>
        <p>
          <strong>Area of Work:</strong> {user.areaOfWork}
        </p>
      </div>

      <div className="mt-6 text-right">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Profile</button>
      </div>
    </div>
  );
}
