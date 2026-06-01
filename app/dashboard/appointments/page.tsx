"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { useAuth } from "@clerk/nextjs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Calendar,
  Clock,
  Phone,
  MoreHorizontal,
  CheckCircle,
  Clock3,
  XCircle,
} from "lucide-react";

import Link from "next/link";

type AppointmentUI = {
  id: string;
  clientName: string;
  phone: string;
  date: string;
  time: string;
  type: string;
  duration: string;
  status: string;

  rawAppointment: any;

  scheduledStart?: string;
  adminNotes?: string;
};

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const [appointments, setAppointments] = useState<
    AppointmentUI[]
  >([]);

  const [filteredAppointments, setFilteredAppointments] =
    useState<AppointmentUI[]>([]);

  const [loading, setLoading] = useState(true);

  const [scheduleModalOpen, setScheduleModalOpen] =
    useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentUI | null>(null);

  const [scheduledDateTime, setScheduledDateTime] =
    useState("");

  const [adminNotes, setAdminNotes] =
    useState("");

  const [scheduling, setScheduling] =
    useState(false);

  const { getToken } = useAuth();

  const mainAppUrl =
    process.env.NEXT_PUBLIC_MAIN_APP_URL;

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const response = await fetch(
        `${mainAppUrl}/api/admin/appointments`,
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          credentials: "include",
        }
      );

      const data = await response.json();

      if (!data.success) {
        console.error(data.message);
        return;
      }

      const normalizedAppointments: AppointmentUI[] =
        data.appointments.map((appointment: any) => {
          const scheduledStart =
            appointment.scheduledStart
              ? new Date(
                  appointment.scheduledStart
                )
              : null;

          const scheduledEnd =
            appointment.scheduledEnd
              ? new Date(
                  appointment.scheduledEnd
                )
              : null;

          let duration = "--";

          if (
            scheduledStart &&
            scheduledEnd
          ) {
            const diffMs =
              scheduledEnd.getTime() -
              scheduledStart.getTime();

            const diffMinutes = Math.floor(
              diffMs / 1000 / 60
            );

            duration = `${diffMinutes} mins`;
          }

          return {
            id: appointment.id,

            clientName:
              `${appointment.firstName || ""} ${
                appointment.lastName || ""
              }`.trim() ||
              appointment.user?.fullName ||
              "Unknown Client",

            phone:
              appointment.phone ||
              appointment.user?.phoneNumber ||
              "--",

            date: scheduledStart
              ? scheduledStart.toLocaleDateString()
              : appointment.requestDate
              ? new Date(
                  appointment.requestDate
                ).toLocaleDateString()
              : "--",

            time: scheduledStart
              ? scheduledStart.toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "Not Scheduled",

            type:
              appointment.consultationType,

            duration,

            status: appointment.status,

            rawAppointment: appointment,
          };
        });

      setAppointments(
        normalizedAppointments
      );

      setFilteredAppointments(
        normalizedAppointments
      );
    } catch (error) {
      console.error(
        "FETCH_APPOINTMENTS_ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const openScheduleModal = (
    appointment: AppointmentUI
  ) => {
    setSelectedAppointment(
      appointment
    );

    setScheduledDateTime("");

    setAdminNotes("");

    setScheduleModalOpen(true);
  };

  const scheduleAppointment =
    async () => {
      if (!selectedAppointment) return;

      try {
        setScheduling(true);

        const token =
          await getToken();

        const response =
          await fetch(
            `${mainAppUrl}/api/admin/appointments/${selectedAppointment.id}/schedule`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${token}`,
              },

              credentials: "include",

              body: JSON.stringify({
                scheduledStart:
                  scheduledDateTime,

                adminNotes,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to schedule appointment."
          );
        }

        setScheduleModalOpen(false);

        await fetchAppointments();
      } catch (error) {
        console.error(
          "SCHEDULE_APPOINTMENT_ERROR:",
          error
        );
      } finally {
        setScheduling(false);
      }
    };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const term =
      e.target.value.toLowerCase();

    setSearchTerm(term);

    setFilteredAppointments(
      appointments.filter(
        (apt) =>
          apt.clientName
            .toLowerCase()
            .includes(term) ||
          apt.type
            .toLowerCase()
            .includes(term)
      )
    );
  };

  const getStatusIcon = (
    status: string
  ) => {
    switch (status) {
      case "SCHEDULED":
        return (
          <CheckCircle className="h-4 w-4 text-green-600" />
        );

      case "PENDING":
        return (
          <Clock3 className="h-4 w-4 text-yellow-600" />
        );

      case "PAYMENT_PENDING":
        return (
          <Clock3 className="h-4 w-4 text-orange-600" />
        );

      case "PAID":
        return (
          <CheckCircle className="h-4 w-4 text-purple-600" />
        );

      case "COMPLETED":
        return (
          <CheckCircle className="h-4 w-4 text-blue-600" />
        );

      case "CANCELLED":
      case "REJECTED":
        return (
          <XCircle className="h-4 w-4 text-red-600" />
        );

      default:
        return null;
    }
  };

  const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-green-100 text-green-800";

      case "PENDING":
        return "bg-yellow-100 text-yellow-800";

      case "PAYMENT_PENDING":
        return "bg-orange-100 text-orange-800";

      case "PAID":
        return "bg-purple-100 text-purple-800";

      case "COMPLETED":
        return "bg-blue-100 text-blue-800";

      case "CANCELLED":
      case "REJECTED":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">
            Appointments
          </h1>

          <p className="page-subtitle">
            Manage client consultations
            and bookings
          </p>
        </div>

        <Link
          href="/dashboard/appointments/review"
          className="gap-2"
        >
          <Button className="gap-2">
            Review and Schedule
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6 bg-white border border-border rounded-lg px-4 py-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search by client name or type..."
            value={searchTerm}
            onChange={handleSearch}
            className="border-0 focus:outline-none focus:ring-0 bg-transparent"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Client Name
                </TableHead>

                <TableHead>
                  Phone
                </TableHead>

                <TableHead>
                  Date
                </TableHead>

                <TableHead>
                  Time
                </TableHead>

                <TableHead>
                  Type
                </TableHead>

                <TableHead>
                  Duration
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10"
                  >
                    Loading appointments...
                  </TableCell>
                </TableRow>
              ) : filteredAppointments.length ===
                0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10"
                  >
                    No appointments found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map(
                  (apt) => (
                    <TableRow
                      key={apt.id}
                      className="hover:bg-secondary/5"
                    >
                      <TableCell className="font-medium">
                        {apt.clientName}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />

                          {apt.phone}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />

                          {apt.date}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />

                          {apt.time}
                        </div>
                      </TableCell>

                      <TableCell>
                        {apt.type}
                      </TableCell>

                      <TableCell>
                        {apt.duration}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(
                            apt.status
                          )}

                          <Badge
                            className={getStatusColor(
                              apt.status
                            )}
                          >
                            {apt.status.replaceAll(
                              "_",
                              " "
                            )}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              View Details
                            </DropdownMenuItem>

                            {apt.status ===
                              "PAID" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  openScheduleModal(
                                    apt
                                  )
                                }
                              >
                                Schedule Appointment
                              </DropdownMenuItem>
                            )}

                            {apt.status ===
                              "SCHEDULED" && (
                              <DropdownMenuItem>
                                Reschedule
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuItem>
                              Send Reminder
                            </DropdownMenuItem>

                            <DropdownMenuItem className="text-red-600">
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog
        open={scheduleModalOpen}
        onOpenChange={
          setScheduleModalOpen
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Schedule Appointment
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">
                Date & Time
              </label>

              <Input
                type="datetime-local"
                value={
                  scheduledDateTime
                }
                onChange={(e) =>
                  setScheduledDateTime(
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Admin Notes
              </label>

              <Input
                placeholder="Optional notes"
                value={adminNotes}
                onChange={(e) =>
                  setAdminNotes(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setScheduleModalOpen(
                  false
                )
              }
            >
              Cancel
            </Button>

            <Button
              onClick={
                scheduleAppointment
              }
              disabled={
                scheduling ||
                !scheduledDateTime
              }
            >
              {scheduling
                ? "Scheduling..."
                : "Schedule Appointment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}