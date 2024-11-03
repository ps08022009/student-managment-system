import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useVolunteers } from '@/contexts/VolunteerContext';
import { Download } from 'lucide-react';

const formSchema = z.object({
  date: z.string().min(1, { message: 'Date is required.' }),
  grade: z.enum(["K", "1", "2", "3", "4", "5", "6", "7", "8"], {
    required_error: "Please select a grade.",
  }),
  session: z.string().min(1, { message: 'Please select a session.' }),
  hours: z.string().min(1, { message: 'Hours are required.' }),
});

type AttendanceEntry = {
  date: string;
  grade: string;
  session: string;
  volunteers: string[];
  hours: string;
};

export default function AttendanceTracking() {
  const { volunteers } = useVolunteers();
  const [attendanceEntries, setAttendanceEntries] = useState<AttendanceEntry[]>([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: '',
      grade: 'K',
      session: '',
      hours: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newEntry = {
      ...values,
      volunteers: selectedVolunteers,
    };
    setAttendanceEntries([...attendanceEntries, newEntry]);
    toast.success('Attendance recorded successfully!', {
      description: `Recorded attendance for ${selectedVolunteers.length} volunteers.`,
    });
    form.reset();
    setSelectedVolunteers([]);
  }

  const downloadAttendance = () => {
    const headers = ['Date', 'Grade', 'Session', 'Hours', 'Volunteers'];
    const csvContent = [
      headers.join(','),
      ...attendanceEntries.map(entry => 
        [
          entry.date,
          `Grade ${entry.grade}`,
          entry.session,
          entry.hours,
          `"${entry.volunteers.join(', ')}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Record Attendance</CardTitle>
          <CardDescription>Track volunteer attendance by session</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["K", "1", "2", "3", "4", "5", "6", "7", "8"].map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              Grade {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hours</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.5"
                          placeholder="Enter hours"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Volunteers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {volunteers
                    .filter(v => v.grade === form.watch('grade'))
                    .map((volunteer) => (
                      <div
                        key={volunteer.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={volunteer.id}
                          checked={selectedVolunteers.includes(volunteer.fullName)}
                          onCheckedChange={(checked) => {
                            setSelectedVolunteers(
                              checked
                                ? [...selectedVolunteers, volunteer.fullName]
                                : selectedVolunteers.filter(
                                    (name) => name !== volunteer.fullName
                                  )
                            );
                          }}
                        />
                        <label
                          htmlFor={volunteer.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {volunteer.fullName} ({volunteer.role})
                        </label>
                      </div>
                    ))}
                </div>
              </div>

              <Button type="submit">Record Attendance</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>View recorded attendance</CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={downloadAttendance}
            className="ml-auto"
          >
            <Download className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Volunteers Present</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceEntries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>Grade {entry.grade}</TableCell>
                  <TableCell>{entry.session}</TableCell>
                  <TableCell>{entry.hours}</TableCell>
                  <TableCell>{entry.volunteers.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
