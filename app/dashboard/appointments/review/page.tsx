"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PendingAppointment = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  age: number | null;
  heightCm: number | null;
  reason: string | null;
  userNotes: string | null;
  status: string;
  requestDate: string | null;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    role: string;
    profile: unknown | null;
  };
};

export default function ReviewAppointmentsPage() {
  const [appointments, setAppointments] = useState<PendingAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  async function updateAppointmentStatus(
    appointmentId: string,
    status: "APPROVED" | "REJECTED",
  ) {
    try {
      setProcessingId(appointmentId);
      setError(null);

      const res = await fetch(
        `${mainAppUrl}/api/admin/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update appointment.");
      }

      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== appointmentId),
      );
    } catch (err) {
      console.error("UPDATE_APPOINTMENT_STATUS_ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while updating appointment.",
      );
    } finally {
      setProcessingId(null);
    }
  }

  const mainAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL;

  async function fetchPendingAppointments() {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${mainAppUrl}/api/admin/appointments/pending`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch appointments");
      }

      setAppointments(data.appointments || []);
    } catch (err) {
      console.error("FETCH_PENDING_APPOINTMENTS_ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading appointments.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPendingAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="page-title">Review Pending Appointments</h1>
          <p className="page-subtitle">
            Review and approve pending appointment requests from users.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={fetchPendingAppointments}
          disabled={isLoading}
          className="rounded-full"
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-5 w-48 rounded bg-muted/30" />
                <div className="h-4 w-72 rounded bg-muted/30" />
                <div className="h-4 w-60 rounded bg-muted/30" />
                <div className="flex gap-3">
                  <div className="h-9 w-24 rounded bg-muted/30" />
                  <div className="h-9 w-24 rounded bg-muted/30" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <Card className="p-6 border-accent/30">
          <p className="text-sm text-accent font-medium mb-3">{error}</p>
          <Button onClick={fetchPendingAppointments} variant="outline">
            Try Again
          </Button>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !error && appointments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="stat-card text-center py-12"
        >
          <p className="text-muted-foreground">
            All pending appointments have been reviewed!
          </p>
        </motion.div>
      )}

      {/* Appointments List */}
      {!isLoading && !error && appointments.length > 0 && (
        <div className="space-y-4">
          {appointments.map((appointment, index) => {
            const displayName =
              `${appointment.firstName || ""} ${appointment.lastName || ""}`.trim() ||
              appointment.user.fullName;

            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
                    {/* Left: Basic Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {displayName}
                        </h3>

                        <Badge variant="outline" className="text-xs">
                          {appointment.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {appointment.email || appointment.user.email}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {appointment.phone ||
                          appointment.user.phoneNumber ||
                          "No phone added"}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          Age: {appointment.age ?? "N/A"}
                        </Badge>

                        <Badge variant="outline" className="text-xs">
                          Height:{" "}
                          {appointment.heightCm
                            ? `${appointment.heightCm} cm`
                            : "N/A"}
                        </Badge>

                        <Badge variant="outline" className="text-xs">
                          {appointment.user.role}
                        </Badge>
                      </div>
                    </div>

                    {/* Middle: Request Details */}
                    <div className="lg:col-span-2">
                      <p className="text-sm font-medium text-foreground mb-2">
                        Reason
                      </p>

                      <p className="text-sm text-muted-foreground mb-3">
                        {appointment.reason || "No reason provided"}
                      </p>

                      {appointment.userNotes && (
                        <p className="text-xs text-muted-foreground italic">
                          {appointment.userNotes}
                        </p>
                      )}

                      <p className="text-xs text-muted-foreground mt-3">
                        Requested:{" "}
                        {appointment.requestDate
                          ? new Date(appointment.requestDate).toLocaleString()
                          : new Date(appointment.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Right: Actions - not functional yet */}
                    <div className="flex gap-2 lg:flex-col">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          onClick={() =>
                            updateAppointmentStatus(appointment.id, "APPROVED")
                          }
                          disabled={processingId === appointment.id}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4" />
                          {processingId === appointment.id
                            ? "Processing..."
                            : "Approve"}
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          onClick={() =>
                            updateAppointmentStatus(appointment.id, "REJECTED")
                          }
                          disabled={processingId === appointment.id}
                          variant="outline"
                          className="w-full text-accent hover:text-accent border-accent/30 flex items-center gap-2"
                          size="sm"
                        >
                          <XCircle className="h-4 w-4" />
                          {processingId === appointment.id
                            ? "Processing..."
                            : "Reject"}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
