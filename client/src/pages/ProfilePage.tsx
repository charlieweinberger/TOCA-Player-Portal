import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "../lib/trpc";

export default function ProfilePage() {
  const { email } = useAuth();

  const {
    data: profile,
    isPending,
    error,
  } = useQuery({
    ...trpc.getProfileByEmail.queryOptions({ email: email ?? "" }),
    enabled: Boolean(email),
  });

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-700">
            {error?.message ?? "Failed to load profile"}
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-yellow-700">
            No profile information available for {email}
          </p>
        </div>
      </div>
    );
  }

  const age = new Date().getFullYear() - new Date(profile.dob).getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Player Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header with name and avatar */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b">
              <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl font-bold">
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600 mt-1">{profile.gender}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Age: {age} years old
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500 uppercase tracking-wide">
                    Email
                  </label>
                  <p className="text-gray-900 font-medium">{profile.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 uppercase tracking-wide">
                    Phone
                  </label>
                  <p className="text-gray-900 font-medium">{profile.phone}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500 uppercase tracking-wide">
                    Date of Birth
                  </label>
                  <p className="text-gray-900 font-medium">
                    {new Date(profile.dob).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 uppercase tracking-wide">
                    Gender
                  </label>
                  <p className="text-gray-900 font-medium">{profile.gender}</p>
                </div>
              </div>
            </div>

            {/* Membership Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Membership
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500 uppercase tracking-wide">
                    Training Center
                  </label>
                  <p className="text-gray-900 font-medium">
                    {profile.centerName}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 uppercase tracking-wide">
                    Member Since
                  </label>
                  <p className="text-gray-900 font-medium">
                    {new Date(profile.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4">
              Player ID
            </h3>
            <p className="text-green-800 text-sm break-all font-mono bg-white p-3 rounded">
              {profile.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
