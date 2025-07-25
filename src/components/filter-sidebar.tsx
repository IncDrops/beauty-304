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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type FilterSidebarProps = {
  isFeatured: boolean;
  setIsFeatured: (value: boolean) => void;
};

export function FilterSidebar({
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
          <SidebarGroupLabel>Special Picks</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-2 flex items-center justify-between">
              <Label htmlFor="featured-switch">Featured Posts Only</Label>
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
