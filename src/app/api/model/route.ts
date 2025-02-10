import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Save the uploaded file into the models/uploads folder.
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${Date.now()}-${file.name}`;
        const uploadsDir = path.join(process.cwd(), 'models', 'uploads');
        await fs.mkdir(uploadsDir, { recursive: true });
        const filePath = path.join(uploadsDir, fileName);
        await fs.writeFile(filePath, buffer);

        console.log("Saved file to:", filePath);

        // Build the command using the saved file path.
        const command = `python main.py --input_path "${filePath}" --out_dir public --input_type mesh --mc`;
        console.log("Running command:", command);

        return new Promise((resolve) => {
            exec(command, { cwd: path.join(process.cwd(), 'model') }, async (error, stdout, stderr) => {
                console.log("Command stdout:", stdout);
                console.log("Command stderr:", stderr);
                // Always attempt to delete the file
                try {
                    await fs.unlink(filePath);
                    console.log("Deleted file:", filePath);
                } catch (delErr) {
                    console.error("File deletion error:", delErr);
                }
                if (error) {
                    console.error("Execution error:", error);
                    resolve(NextResponse.json({ error: error.message, stderr }, { status: 500 }));
                    return;
                }
                resolve(NextResponse.json({ stdout, stderr }));
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
    }
}