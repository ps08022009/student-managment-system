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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const formSchema = z.object({
  volunteerId: z.string().min(1, {
    message: 'Please select a volunteer.',
  }),
  date: z.string().min(1, {
    message: 'Date is required.',
  }),
  hours: z.string().min(1, {
    message: 'Hours are required.',
  }),
  grade: z.enum(["K", "1", "2", "3", "4", "5", "6", "7", "8"], {
    required_error: "Please select a grade.",
  }),
  notes: z.string().optional(),
});

type HoursEntry = z.infer<typeof formSchema> & {
  volunteerName: string;
};

export default function HoursTracking() {
  const { volunteers } = useVolunteers();
  const [hoursEntries, setHoursEntries] = useState<HoursEntry[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      volunteerId: '',
      date: '',
      hours: '',
      grade: 'K',
      notes: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const volunteer = volunteers.find((v) => v.id === values.volunteerId);
    if (!volunteer) return;

    const entry: HoursEntry = {
      ...values,
      volunteerName: volunteer.fullName,
    };

    setHoursEntries([...hoursEntries, entry]);
    toast.success('Hours logged successfully!', {
      description: `${entry.hours} hours recorded for ${entry.volunteerName}.`,
    });
    form.reset();
  }

  const downloadHours = () => {
    const headers = ['Date', 'Volunteer', 'Grade', 'Hours', 'Notes'];
    const csvContent = [
      headers.join(','), // Join headers with commas
      ...hoursEntries.map(entry => 
        [
          `"${entry.date}"`, // Wrap date in quotes
          `"${entry.volunteerName}"`,
          `Grade ${entry.grade}`,
          entry.hours,
          `"${entry.notes || ''}"`, // Wrap notes in quotes and handle optional
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `hours_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Log Hours</CardTitle>
          <CardDescription>Record volunteer hours and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="volunteerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volunteer</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select volunteer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {volunteers.map((volunteer) => (
                            <SelectItem key={volunteer.id} value={volunteer.id}>
                              {volunteer.fullName} ({volunteer.role} - Grade {volunteer.grade})
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
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any notes about the work performed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Log Hours</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Recent Hours</CardTitle>
            <CardDescription>View recently logged hours</CardDescription>
          </div>
          <Button variant="outline" onClick={downloadHours}>Download CSV</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Volunteer</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hoursEntries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.volunteerName}</TableCell>
                  <TableCell>Grade {entry.grade}</TableCell>
                  <TableCell>{entry.hours}</TableCell>
                  <TableCell>{entry.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
