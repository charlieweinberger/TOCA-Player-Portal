import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "../lib/trpc";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import {
  getScoreColor,
  getGoalsColor,
  getStreakColor,
  getBallsColor,
  getSpeedOfPlayColor,
  getExercisesColor,
} from "../lib/trainingStats";

export default function TrainingSessionDetailsPage() {
  const { sessionId } = useParams();

  const {
    data: session,
    isPending,
    error,
  } = useQuery({
    ...trpc.getMyTrainingSessionById.queryOptions({
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
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert variant="destructive">
          <AlertDescription>
            {error?.message ?? "Training session not found."}
          </AlertDescription>
        </Alert>
        <Button variant="link" asChild className="mt-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    );
  }

  const durationHours =
    (new Date(session.endTime).getTime() -
      new Date(session.startTime).getTime()) /
    (1000 * 60 * 60);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button variant="link" asChild className="mb-6">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </Button>

      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-blue-700 font-semibold">
              Training Session
            </p>
            <h1 className="text-3xl font-bold mt-2">{session.trainerName}</h1>
            <p className="text-gray-900 mt-2">
              {formatDateTime(session.startTime)}
            </p>
          </div>
          <Badge className="bg-blue-50 text-blue-800">
            Duration: {durationHours.toFixed(1)} hrs
          </Badge>
        </div>

        <div className="grid grid-cols-1 min-[460px]:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Score
            </p>
            <p className={`text-2xl font-bold ${getScoreColor(session.score)}`}>{session.score.toFixed(1)}</p>
          </Card>
          <Card className="bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Number of Balls
            </p>
            <p className={`text-2xl font-bold ${getBallsColor(session.numberOfBalls)}`}>{session.numberOfBalls}</p>
          </Card>
          <Card className="bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Best Streak
            </p>
            <p className={`text-2xl font-bold ${getStreakColor(session.bestStreak)}`}>{session.bestStreak}</p>
          </Card>
          <Card className="bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Goals
            </p>
            <p className={`text-2xl font-bold ${getGoalsColor(session.numberOfGoals)}`}>{session.numberOfGoals}</p>
          </Card>
          <Card className="bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Avg Speed of Play
            </p>
            <p className={`text-2xl font-bold ${getSpeedOfPlayColor(session.avgSpeedOfPlay)}`}>
              {session.avgSpeedOfPlay.toFixed(2)}
            </p>
          </Card>
          <Card className="bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Exercises Completed
            </p>
            <p className={`text-2xl font-bold ${getExercisesColor(session.numberOfExercises)}`}>{session.numberOfExercises}</p>
          </Card>
        </div>
      </Card>
    </div>
  );
}
