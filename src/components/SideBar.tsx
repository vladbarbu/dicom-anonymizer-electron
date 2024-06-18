import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Files, FolderPlus } from "lucide-react";
export default function SideBar() {
    return (
        <div className="flex min-w-40 flex-col justify-between">
            <div className="flex w-full flex-col gap-4">
                <Button variant="secondary" size="xl" className="flex flex-col items-center gap-4">
                    <Files className="mr-2 h-4 w-4" /> Single/Multiple Files
                </Button>
                <Button variant="outline" size="xl" className="flex flex-col items-center gap-4">
                    <FolderPlus className="mr-2 h-4 w-4" /> Whole directory
                </Button>
            </div>
            <div className="flex w-full flex-col">
                <Button variant="outline" size="xl">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
            </div>
        </div>
    );
}
