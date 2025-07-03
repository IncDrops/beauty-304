'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import {
  BedDouble,
  Car,
  MapPin,
  Package,
  Plane,
  Search,
  Ship,
  Users,
  Bed,
  Calendar as CalendarIcon,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const bookingTypes = [
  { type: 'Hotels', icon: BedDouble },
  { type: 'Flights', icon: Plane },
  { type: 'Packages', icon: Package },
  { type: 'Cars', icon: Car },
  { type: 'Cruises', icon: Ship },
];

const categoryIcons: Record<string, LucideIcon> = {
  'travel-getaways': Plane,
};

type BookingWidgetProps = {
  category: {
    name: string;
    slug: string;
    description: string;
  };
};

export function BookingWidget({ category }: BookingWidgetProps) {
  const [activeType, setActiveType] = useState('Hotels');
  const [date, setDate] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState('2');
  const [rooms, setRooms] = useState('1');

  const Icon = categoryIcons[category.slug] || Plane;

  return (
    <Card className="w-full overflow-hidden border-2 border-primary/20 bg-primary/10 shadow-lg">
      <CardHeader className="flex-col md:flex-row items-start md:items-center gap-4 p-6">
        <div className="p-3 rounded-full bg-primary/20">
          <Icon className="w-12 h-12 text-accent" />
        </div>
        <div>
          <CardTitle className="font-headline text-3xl">
            {category.name}
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            {category.description}
          </CardDescription>
          <Link
            href="/travel-deals"
            className="text-accent hover:underline font-headline text-xl mt-2 inline-block"
          >
            Name Your Price: Hotels, Flights & More
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="bg-card p-4 rounded-lg shadow-inner">
          <div className="flex flex-wrap gap-2 mb-4">
            {bookingTypes.map(({ type, icon: Icon }) => (
              <Button
                key={type}
                variant={activeType === type ? 'default' : 'secondary'}
                className="flex-1 min-w-[100px]"
                onClick={() => setActiveType(type)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {type}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="destination" className="sr-only">
                Destination
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="destination"
                  placeholder="Where are you going?"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal bg-background/50',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'LLL dd, y')} -{' '}
                          {format(date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(date.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="adults" className="sr-only">
                Adults
              </Label>
              <Select value={adults} onValueChange={setAdults}>
                <SelectTrigger id="adults" className="w-full bg-background/50">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Adults" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(8)].map((_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1} Adult{i > 0 && 's'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="rooms" className="sr-only">
                Rooms
              </Label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger id="rooms" className="w-full bg-background/50">
                  <Bed className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Rooms" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(4)].map((_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1} Room{i > 0 && 's'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button size="lg" className="w-full font-bold text-lg">
          <Search className="mr-2 h-5 w-5" />
          Find My Trip
        </Button>
      </CardFooter>
    </Card>
  );
}
