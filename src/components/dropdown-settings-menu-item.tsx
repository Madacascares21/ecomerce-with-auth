"use client";
import { Settings2 } from "lucide-react";
import React, { JSX, useState } from "react";
import SettingsDialog, {
  DialogContentType,
} from "./settingsDialog/settings-dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const DropdownSettingsMenuItem = ({
  dialogContent,
}: {
  dialogContent: DialogContentType[];
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault(); // previne comportamentul implicit
          setOpenDialog(true);
        }}
      >
        <Settings2 />
        <span>Settings</span>
      </DropdownMenuItem>
      <SettingsDialog
        dialogContent={dialogContent}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </>
  );
};

export default DropdownSettingsMenuItem;
