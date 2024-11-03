import { createContext, useContext, useState } from 'react';
import { z } from 'zod';

export const volunteerSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  role: z.enum(["teacher", "ta"]),
  grade: z.enum(["K", "1", "2", "3", "4", "5", "6", "7", "8"]),
});

export type Volunteer = z.infer<typeof volunteerSchema>;

interface VolunteerContextType {
  volunteers: Volunteer[];
  addVolunteer: (volunteer: Omit<Volunteer, 'id'>) => void;
}

const VolunteerContext = createContext<VolunteerContextType | undefined>(
  undefined
);

export function VolunteerProvider({ children }: { children: React.ReactNode }) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  const addVolunteer = (volunteerData: Omit<Volunteer, 'id'>) => {
    const newVolunteer = {
      ...volunteerData,
      id: crypto.randomUUID(),
    };
    setVolunteers([...volunteers, newVolunteer]);
  };

  return (
    <VolunteerContext.Provider value={{ volunteers, addVolunteer }}>
      {children}
    </VolunteerContext.Provider>
  );
}

export const useVolunteers = () => {
  const context = useContext(VolunteerContext);
  if (context === undefined) {
    throw new Error('useVolunteers must be used within a VolunteerProvider');
  }
  return context;
};