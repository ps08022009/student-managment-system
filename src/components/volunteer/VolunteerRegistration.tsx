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
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox component
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVolunteers } from '@/contexts/VolunteerContext';
import * as z from 'zod';

// Define the schema with an array for preferredTeams
const formSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyPhone: z.string().min(1, 'Emergency phone number is required'),
  role: z.enum(['teacher', 'ta']),
  preferredTeams: z.array(z.string()).min(1, 'Please select at least one preferred team'),
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

  // Helper function to handle checkbox changes
  function handleCheckboxChange(field, value) {
    const currentValues = field.value || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value) // Remove if already selected
      : [...currentValues, value]; // Add new value
    field.onChange(newValues);
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
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredTeams"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Teams</FormLabel>
                    <div className="flex flex-col space-y-2">
                      {['Teacher', 'Teaching Assistant', 'Event Volunteer', 'Tech Intern', 'Attendance'].map((team) => (
                        <Checkbox
                          key={team}
                          checked={field.value.includes(team)}
                          onCheckedChange={() => handleCheckboxChange(field, team)}
                        >
                          {team}
                        </Checkbox>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Add other fields here */}
            </div>
            <Button type="submit">Register Volunteer</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
