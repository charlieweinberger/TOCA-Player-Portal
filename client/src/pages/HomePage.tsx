import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { trpc } from "../lib/trpc";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import {
  getScoreColor,
  getGoalsColor,
  getStreakColor,
} from "../lib/trainingStats";

export default function HomePage() {
  const { user } = useUser();

  const {
    data: profile,
    isPending: isProfilePending,
    error: profileError,
  } = useQuery({
    ...trpc.getMyProfile.queryOptions(),
    enabled: Boolean(user),
  });

  const {
    data: trainingSessions,
    isPending: isSessionsPending,
    error: sessionsError,
  } = useQuery({
    ...trpc.getMyTrainingSessions.queryOptions(),
    enabled: Boolean(profile),
  });

  const {
    data: appointments,
    isPending: isAppointmentsPending,
    error: appointmentsError,
  } = useQuery({
    ...trpc.getMyAppointments.queryOptions(),
    enabled: Boolean(profile),
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

  if (isProfilePending || (profile && isSessionsPending)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading your training data...</p>
        </div>
      </div>
    );
  }

  if (profileError || sessionsError || appointmentsError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert variant="destructive">
          <AlertDescription>
            {profileError?.message ||
              sessionsError?.message ||
              appointmentsError?.message ||
              "Failed to load training data."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <p className="text-sm uppercase tracking-wide text-blue-700 font-semibold">
            Player Home
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Welcome back{profile?.firstName ? `, ${profile.firstName}` : ""}!
          </h1>
          <p className="text-gray-600 mt-3">
            Review your past training sessions and manage upcoming appointments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    Past Training Sessions
                  </CardTitle>
                  <CardDescription className="text-gray-900">
                    Click a session to view performance details.
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700"
                >
                  {pastSessions.length} total
                </Badge>
              </div>
            </CardHeader>
            {pastSessions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No completed training sessions yet.
              </div>
            ) : (
              <div className="px-4 space-y-4">
                {pastSessions.map((session) => (
                  <Link
                    key={session.id}
                    to={`/sessions/${session.id}`}
                    className="block"
                  >
                    <Card className="hover:border-blue-400 hover:shadow-md transition p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-900">
                            Trainer
                          </p>
                          <p className="text-lg font-semibold text-blue-700">
                            {session.trainerName}
                          </p>
                          <p className="text-sm text-gray-900 mt-1">
                            {formatDateTime(session.startTime)}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                              Score
                            </p>
                            <p className={`font-semibold ${getScoreColor(session.score)}`}>
                              {session.score.toFixed(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                              Goals
                            </p>
                            <p className={`font-semibold ${getGoalsColor(session.numberOfGoals)}`}>
                              {session.numberOfGoals}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                              Best Streak
                            </p>
                            <p className={`font-semibold ${getStreakColor(session.bestStreak)}`}>
                              {session.bestStreak}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Upcoming Appointments</CardTitle>
              <CardDescription className="text-gray-900">
                Keep an eye on your next sessions.
              </CardDescription>
            </CardHeader>
            {isAppointmentsPending ? (
              <div className="text-center py-10 text-muted-foreground">
                Loading appointments...
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No upcoming appointments scheduled.
              </div>
            ) : (
              <div className="px-4 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="p-4">
                    <div>
                      <p className="text-sm text-gray-900">Trainer</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {appointment.trainerName}
                      </p>
                      <p className="text-sm text-gray-900 mt-2">
                        {formatDateTime(appointment.startTime)}
                      </p>
                      <p className="text-xs text-gray-900 mt-1">
                        Ends {formatDateTime(appointment.endTime)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
