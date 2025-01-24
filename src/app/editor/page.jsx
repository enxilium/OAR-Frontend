'use client';

import { AppSidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"
import ModelViewer from "@/components/modelViewer"


export default function Page() {
    const [file, setFile] = useState(null)

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setFile(file)
        }
    }

    return (
        <div className="flex h-screen bg-[#1e2333]">
            <SidebarProvider
                style={{
                    "--sidebar-width": "20rem",
                    "--sidebar-width-mobile": "20rem",
                }}>
                <AppSidebar />
                <SidebarInset>
                    <div className="flex h-full w-full bg-[#1e2333]">
                        <div className="flex-1 bg-[#1e2333] h-full w-full flex items-center justify-center cursor-pointer" onClick={() => document.getElementById('fileInput')?.click()}>
                            <input type="file" id="fileInput" accept=".stl,.obj" style={{ display: 'none' }} onChange={handleFileUpload}/>
                            <span>Upload file</span>
                            <ModelViewer file={file} />
                        </div>
                        <Separator orientation="vertical" className="bg-[#4c505f]" />
                        <div className="flex-1 bg-[#1e2333]">
                            {/* Right panel content goes here */}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}