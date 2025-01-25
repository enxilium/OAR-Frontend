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
import OptionsPanel from "@/components/optionsPanel"

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
                            {!file && <input type="file" id="fileInput" accept=".stl,.obj" style={{ display: 'none' }} onChange={handleFileUpload}/>}
                            {!file && <span className="text-[#4c505f]">Upload file</span>}
                            {file && <ModelViewer file={file} />}
                        </div>
                        <Separator orientation="vertical" className="bg-[#4c505f]" />
                        <div className="flex-1 flex bg-[#1e2333] items-center justify-center cursor-pointer">
                            <span className="text-[#4c505f]">Generate Mesh</span>
                        </div>
                        <div className="flex flex-col flex-none h-full py-16 bg-[#02050D] w-[20em]">
                            {!file && <span className="text-[#4c505f]">Upload a file to get started</span>}
                            {file && <OptionsPanel/>}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}