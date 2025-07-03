'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type FilterSidebarProps = {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedRating: number;
  setSelectedRating: (value: number) => void;
  isFeatured: boolean;
  setIsFeatured: (value: boolean) => void;
};

export function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  isFeatured,
  setIsFeatured,
}: FilterSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-2xl">Filters</h2>
          <SidebarTrigger className="hidden md:flex" />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Price Range</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                step={1}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel>Minimum Rating</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-2">
              <RadioGroup
                value={String(selectedRating)}
                onValueChange={(val) => setSelectedRating(Number(val))}
                className="mt-2"
              >
                {[4, 3, 2, 1, 0].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={String(rating)}
                      id={`r${rating}`}
                    />
                    <Label htmlFor={`r${rating}`} className="flex items-center">
                      {rating === 0 ? 'Any' : `${rating} Stars & Up`}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel>Special Picks</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-2 flex items-center justify-between">
              <Label htmlFor="featured-switch">Featured Picks Only</Label>
              <Switch
                id="featured-switch"
                checked={isFeatured}
                onCheckedChange={setIsFeatured}
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
