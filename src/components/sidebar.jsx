'use client';

import * as React from "react"
import { FolderOpen, MoreHorizontal, PanelLeft } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import Image from "next/image";

// This is sample data.
const projects = [
    {
        name: "Human face",
        id: "project-1",
    },
    {
        name: "elf",
        id: "project-2",
    },
    {
        name: "flying dragon",
        id: "project-3",
    },
    {
        name: "Ancient Ruins",
        id: "project-4",
    },
    {
        name: "Space Station",
        id: "project-5",
    },
    {
        name: "Medieval Castle",
        id: "project-6",
    },
    {
        name: "Fantasy Forest",
        id: "project-7",
    },
    {
        name: "Cyberpunk City",
        id: "project-8",
    },
    {
        name: "Underwater World",
        id: "project-9",
    },
    {
        name: "Desert Oasis",
        id: "project-10",
    },
    {
        name: "Haunted Mansion",
        id: "project-11",
    },
    {
        name: "Alien Planet",
        id: "project-12",
    },
    {
        name: "Steampunk Airship",
        id: "project-13",
    },
    {
        name: "Mystic Cave",
        id: "project-14",
    },
    {
        name: "Robot Factory",
        id: "project-15",
    },
    {
        name: "Pirate Ship",
        id: "project-16",
    },
    {
        name: "Jungle Temple",
        id: "project-17",
    },
    {
        name: "Snowy Mountain",
        id: "project-18",
    },
    {
        name: "Volcanic Island",
        id: "project-19",
    },
    {
        name: "Crystal Palace",
        id: "project-20",
    },
    {
        name: "Floating Island",
        id: "project-21",
    },
    {
        name: "Abandoned Mine",
        id: "project-22",
    },
    {
        name: "Sunken Ship",
        id: "project-23",
    },
    {
        name: "Mystical Swamp",
        id: "project-24",
    },
    {
        name: "Hidden Valley",
        id: "project-25",
    },
    {
        name: "Lunar Base",
        id: "project-26",
    },
    {
        name: "Ancient Library",
        id: "project-27",
    },
    {
        name: "Crystal Cavern",
        id: "project-28",
    },
    {
        name: "Enchanted Garden",
        id: "project-29",
    },
    {
        name: "Ghost Town",
        id: "project-30",
    },
];

export function AppSidebar() {
    const { state, toggleSidebar } = useSidebar();
    const isCollapsed = state === "collapsed";
    
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex flex-col items-center px-4 py-4">
                    <div className={!isCollapsed ? "flex justify-between w-full" : ""}>
                        {!isCollapsed && <div className="flex flex-col place-items-start ">
                            {/* RAFT Logo Section */}
                            <Image
                                src="/assets/images/logo.png"
                                alt="CTA"
                                width={150}
                                height={150}
                                className = "z-50 opacity-[100]"
                            />

                            <Image
                                src="/assets/images/OAR.png"
                                alt="Logo"
                                width={100}
                                height={100}
                                className="mt-4"
                            />
                        </div>}
                        <div className="flex justify-items-end">
                            <Button onClick={toggleSidebar} className="button-icon p-0">
                                <PanelLeft className="icon sidebarIcon"/>
                            </Button>
                        </div>
                    </div>
                    {!isCollapsed && <Button className="mt-8 border-2 border-[#383d50] rounded-24 upload-btn bg-[#242a3c] hover:bg-[#2e3445]">
                        <span className="text-sm text-[#8b8e9c]">New Project</span>
                        <FolderOpen color="#8b8e9c"/>
                    </Button>}
                </div>
            </SidebarHeader>

            <SidebarContent className="mb-8 mx-4">
                <SidebarGroup>
                    <SidebarGroupLabel>RECENT</SidebarGroupLabel>
                        {!isCollapsed && <SidebarGroupContent>
                            {projects.map((item) => (
                                <SidebarMenuItem key={item.id} className="list-none">
                                    <SidebarMenuButton>
                                        <span>{item.name}</span>
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
                            ))}
                        </SidebarGroupContent>}
                    </SidebarGroup>
                </SidebarContent>
        </Sidebar>
    )
}
