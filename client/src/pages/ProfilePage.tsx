import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { trpc } from "../lib/trpc";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();

  const {
    data: profile,
    isPending,
    error,
  } = useQuery({
    ...trpc.getMyProfile.queryOptions(),
    enabled: Boolean(user),
  });

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert variant="destructive">
          <AlertDescription>
            {error?.message ?? "Failed to load profile"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert>
          <AlertDescription>
            No profile information available for your account.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const age = new Date().getFullYear() - new Date(profile.dob).getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Player Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Card */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {/* Header with name and avatar */}
            <div className="flex items-center gap-6 mb-2 pb-8 border-b">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-900 mt-1">{profile.gender}</p>
                <p className="text-sm text-gray-900 mt-2">
                  Age: {age} years old
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Contact Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wide">
                      Email
                    </label>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wide">
                      Phone
                    </label>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>
              </Card>

              {/* Personal Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wide">
                      Date of Birth
                    </label>
                    <p className="font-medium">
                      {new Date(profile.dob).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wide">
                      Gender
                    </label>
                    <p className="font-medium">{profile.gender}</p>
                  </div>
                </div>
              </Card>

              {/* Membership Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">Membership</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wide">
                      Training Center
                    </label>
                    <p className="font-medium">{profile.centerName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wide">
                      Member Since
                    </label>
                    <p className="font-medium">
                      {new Date(profile.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="bg-blue-50 border-blue-200 p-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Player ID
              </h3>
              <Badge
                variant="outline"
                className="font-mono text-xs break-all bg-white"
              >
                {profile.id}
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
