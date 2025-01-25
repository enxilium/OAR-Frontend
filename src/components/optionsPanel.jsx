'use client';

import { useEffect, useState } from "react";
import CustomSlider from "./customSlider";
import { Separator } from "./ui/separator"
import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import { Cog } from 'lucide-react';
import { Button } from "./ui/button";

export default function OptionsPanel() {

    const [symmetry, setSymmetry] = useState("X");

    useEffect(() => {
        // Handle side effects or updates when symmetry changes
        console.log(`Symmetry changed to: ${symmetry}`);
    }, [symmetry]);

    const handleSymmetryChange = (event, newSymmetry) => {
        if (newSymmetry !== null) {
            setSymmetry(newSymmetry);
        }
    };

    return (
        <div className="flex flex-col w-full items-center justify-between h-full">
            <div>
                <div className="flex justify-center w-full items-center">
                    <CustomSlider label="Polygon Count" defaultValue={50} max={100} step={1} className="w-full"/>
                </div>
                <Separator orientation="horizontal" className="bg-[#222631] w-full my-4"/>
                <div className="flex justify-center w-full items-center">
                    <CustomSlider label="Curvature" defaultValue={50} max={100} step={1} className="w-full" />
                </div>
                <Separator orientation="horizontal" className="bg-[#222631] w-full my-4" />
                <div className="flex justify-center w-full items-center">
                    <CustomSlider label="Edge Limit" defaultValue={50} max={100} step={1} className="w-full" />
                </div>
                <Separator orientation="horizontal" className="bg-[#222631] w-full my-4" />
                <div className="flex justify-center w-full items-center">
                    
                    <Box sx={{ width: 250 }}>
                        <Typography id="input-slider" gutterBottom color='#8b8e9c'>
                            Symmetry
                        </Typography>
                        <div className="flex justify-center w-full items-center">
                            <ToggleButtonGroup
                                color="primary"
                                value={symmetry}
                                exclusive
                                onChange={handleSymmetryChange}
                                aria-label="Platform"
                            >
                                <ToggleButton value="X">X</ToggleButton>
                                <ToggleButton value="Y">Y</ToggleButton>
                                <ToggleButton value="Z">Z</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </Box>
                </div>
            </div>

            <div>
                <Button className="mt-8 border-2 border-[#383d50] w-36 h-16 rounded-24 upload-btn bg-[#242a3c] hover:bg-[#2e3445]">
                    <span className="text-lg text-[#8b8e9c]">Generate</span>
                    <Cog color="#8b8e9c" />
                </Button>
            </div>
        </div>
    )
}