import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVolunteers } from '@/contexts/VolunteerContext';
import * as z from 'zod';

// Updated the schema to accommodate an array of preferred teams
const formSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyPhone: z.string().min(1, 'Emergency phone number is required'),
  role: z.enum(['teacher', 'ta']),
  preferredTeams: z.array(z.string()).min(1, 'Please select at least one preferred team'), // Updated for multi-select
  grade: z.enum(["K", "1", "2", "3", "4", "5", "6", "7", "8"]),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  availability: z.string().optional(),
  skills: z.string().optional(),
  additionalComments: z.string().optional(),
});

export default function VolunteerRegistration() {
  const { addVolunteer } = useVolunteers();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      emergencyContactName: '',
      emergencyPhone: '',
      role: 'teacher',
      preferredTeams: [], // Initialize as an empty array for multi-select
      grade: 'K',
      dateOfBirth: '',
      availability: '',
      skills: '',
      additionalComments: '',
    },
  });

  function onSubmit(values) {
    addVolunteer(values);
    toast.success('Volunteer registered successfully!', {
      description: `${values.fullName} has been added as a ${values.role} for grade ${values.grade}.`,
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Other form fields remain the same */}
              
              <FormField
                control={form.control}
                name="preferredTeams"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Teams</FormLabel>
                    <Select multiple onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Preferred Teams" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="ta">Teaching Assistant</SelectItem>
                        <SelectItem value="event-volunteer">Event Volunteer</SelectItem>
                        <SelectItem value="tech-intern">Tech Intern</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Other form fields remain the same */}
            </div>
            <Button type="submit">Register Volunteer</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
