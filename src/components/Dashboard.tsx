import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModeToggle } from './mode-toggle';
import { Users, Clock, ClipboardCheck } from 'lucide-react';
import VolunteerRegistration from './volunteer/VolunteerRegistration';
import HoursTracking from './tracking/HoursTracking';
import AttendanceTracking from './tracking/AttendanceTracking';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('volunteers');

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground">
            Here's an overview of your volunteer management system
          </p>
        </div>
        <div className="flex items-center space-x-2 pl-7"> 
          <ModeToggle />
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="volunteers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Volunteers
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Hours
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Attendance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="volunteers" className="space-y-4">
          <VolunteerRegistration />
        </TabsContent>
        <TabsContent value="hours" className="space-y-4">
          <HoursTracking />
        </TabsContent>
        <TabsContent value="attendance" className="space-y-4">
          <AttendanceTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
}
