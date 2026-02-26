import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { trpc } from "../lib/trpc";

export default function HomePage() {
  const { email } = useAuth();

  const {
    data: profile,
    isPending: isProfilePending,
    error: profileError,
  } = useQuery({
    ...trpc.getProfileByEmail.queryOptions({ email: email ?? "" }),
    enabled: Boolean(email),
  });

  const playerId = profile?.id;

  const {
    data: trainingSessions,
    isPending: isSessionsPending,
    error: sessionsError,
  } = useQuery({
    ...trpc.getTrainingSessionsByPlayerId.queryOptions({
      playerId: playerId ?? "",
    }),
    enabled: Boolean(playerId),
  });

  const {
    data: appointments,
    isPending: isAppointmentsPending,
    error: appointmentsError,
  } = useQuery({
    ...trpc.getAppointmentsByPlayerId.queryOptions({
      playerId: playerId ?? "",
    }),
    enabled: Boolean(playerId),
  });

  const timeSort = (a: { startTime: string }, b: { startTime: string }) =>
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime();

  const pastSessions = useMemo(() => {
    return trainingSessions ? [...trainingSessions].sort(timeSort) : [];
  }, [trainingSessions]);

  const upcomingAppointments = useMemo(() => {
    return appointments ? [...appointments].sort(timeSort) : [];
  }, [appointments]);

  const formatDateTime = (value: string) =>
    new Date(value).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  if (isProfilePending || (playerId && isSessionsPending)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your training data...</p>
        </div>
      </div>
    );
  }

  if (profileError || sessionsError || appointmentsError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-700">
            {profileError?.message ||
              sessionsError?.message ||
              appointmentsError?.message ||
              "Failed to load training data."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <p className="text-sm uppercase tracking-wide text-green-600 font-semibold">
            Player Home
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Welcome back{profile?.firstName ? `, ${profile.firstName}` : ""}!
          </h1>
          <p className="text-gray-600 mt-3">
            Review your past training sessions and manage upcoming appointments.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Signed in as</p>
          <p className="font-semibold text-gray-900">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Past Training Sessions
                </h2>
                <p className="text-gray-500">
                  Click a session to view performance details.
                </p>
              </div>
              <span className="bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                {pastSessions.length} total
              </span>
            </div>

            {pastSessions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No completed training sessions yet.
              </div>
            ) : (
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <Link
                    key={session.id}
                    to={`/sessions/${session.id}`}
                    className="block border border-gray-100 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Trainer</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {session.trainerName}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDateTime(session.startTime)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400">
                            Score
                          </p>
                          <p className="font-semibold text-gray-900">
                            {session.score.toFixed(1)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400">
                            Goals
                          </p>
                          <p className="font-semibold text-gray-900">
                            {session.numberOfGoals}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400">
                            Best Streak
                          </p>
                          <p className="font-semibold text-gray-900">
                            {session.bestStreak}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Upcoming Appointments
              </h2>
              <p className="text-gray-500">
                Keep an eye on your next sessions.
              </p>
            </div>

            {isAppointmentsPending ? (
              <div className="text-center py-10 text-gray-500">
                Loading appointments...
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No upcoming appointments scheduled.
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-100 rounded-xl p-4"
                  >
                    <p className="text-sm text-gray-500">Trainer</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {appointment.trainerName}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {formatDateTime(appointment.startTime)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Ends {formatDateTime(appointment.endTime)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
