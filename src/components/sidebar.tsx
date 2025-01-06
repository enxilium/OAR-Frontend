'use client';

import Home from "@/app/page"
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export function AppSidebar() {
    
    
    return(
        <SidebarProvider>
            <Sidebar collapsible="offcanvas" side="left">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="#">
                                    <span>Home</span>
                                </a>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction>
                                        <MoreHorizontal />
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start">
                                    <DropdownMenuItem>
                                        <span>Edit Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Delete Project</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
            </Sidebar>
        </SidebarProvider>
    )
}
