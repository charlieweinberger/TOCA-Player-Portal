import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "../lib/trpc";

export default function TrainingSessionDetailsPage() {
  const { sessionId } = useParams();

  const {
    data: session,
    isPending,
    error,
  } = useQuery({
    ...trpc.getTrainingSessionById.queryOptions({
      sessionId: sessionId ?? "",
    }),
    enabled: Boolean(sessionId),
  });

  const formatDateTime = (value: string) =>
    new Date(value).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  if (isPending) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-700">
            {error?.message ?? "Training session not found."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center mt-4 text-green-700 font-semibold hover:text-green-800"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const durationHours =
    (new Date(session.endTime).getTime() -
      new Date(session.startTime).getTime()) /
    (1000 * 60 * 60);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/"
        className="inline-flex items-center text-green-700 font-semibold hover:text-green-800"
      >
        ← Back to home
      </Link>

      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-green-600 font-semibold">
              Training Session
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              {session.trainerName}
            </h1>
            <p className="text-gray-600 mt-2">
              {formatDateTime(session.startTime)}
            </p>
          </div>
          <div className="bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            Duration: {durationHours.toFixed(1)} hrs
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">Score</p>
            <p className="text-2xl font-bold text-gray-900">
              {session.score.toFixed(1)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Number of Balls
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {session.numberOfBalls}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Best Streak
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {session.bestStreak}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">Goals</p>
            <p className="text-2xl font-bold text-gray-900">
              {session.numberOfGoals}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Avg Speed of Play
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {session.avgSpeedOfPlay.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Exercises Completed
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {session.numberOfExercises}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
