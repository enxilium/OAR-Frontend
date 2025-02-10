'use client';

import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import ModelViewer from "@/components/modelViewer";
import OptionsPanel from "@/components/optionsPanel";
import CircularProgress from "@mui/material/CircularProgress";

export default function Page() {
    const [file, setFile] = useState(null);
    const [output, setOutput] = useState(null);
    const [generatedMesh, setGeneratedMesh] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    async function getGeneration() {
        if (!file) return;
        
        try {
            setIsGenerating(true);
            const formData = new FormData();
            formData.append("file", file);

            // Call the API route to run your local model
            const res = await fetch('/api/model', {
                method: 'POST',
                body: formData
            });
            if (!res.ok) throw new Error('Model execution failed');
            const data = await res.json();
            // Display the command stdout (or process data as needed)
            setOutput(data.stdout || "No output obtained");
        } catch (err) {
            console.error(err);
            setOutput("Error encountered");
        } finally {
            setIsGenerating(false);
            setGeneratedMesh('/result.stl');
        }
    }

    function saveModel() {
        if (!generatedMesh) return;
        // Create a temporary link element and trigger a download.
        const a = document.createElement('a');
        a.href = generatedMesh;
        a.download = "model.stl"; // adjust filename and extension as needed.
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <div className="flex h-screen bg-[#1e2333]">
            <SidebarProvider
                style={{
                    "--sidebar-width": "20rem",
                    "--sidebar-width-mobile": "20rem",
                }}
            >
                <AppSidebar />
                <SidebarInset>
                    <div className="flex h-full w-full bg-[#1e2333]">
                        <div
                            className="flex-1 bg-[#1e2333] h-full w-full flex items-center justify-center cursor-pointer"
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            {!file && (
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept=".stl,.obj"
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                />
                            )}
                            {!file && <span className="text-[#4c505f]">Upload file</span>}
                            {file && <ModelViewer file={file} />}
                        </div>
                        <Separator orientation="vertical" className="bg-[#4c505f]" />
                        <div className="flex-1 flex bg-[#1e2333] items-center justify-center">
                            {isGenerating ? (
                                <CircularProgress color="secondary" />
                            ) : output ? (
                                    <ModelViewer file={generatedMesh} />
                            ) : (
                                <span className="text-[#4c505f]">Generated mesh will appear here</span>
                            )}
                        </div>
                        <div className="flex flex-col flex-none h-full py-16 bg-[#02050D] w-[20em]">
                            {!file && <span className="text-[#4c505f]">Upload a file to get started</span>}
                            {file && <OptionsPanel onGenerate={getGeneration} generatedMesh={generatedMesh} onSave={saveModel} />}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}