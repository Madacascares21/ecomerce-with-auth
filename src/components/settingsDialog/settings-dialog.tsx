"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React, { JSX } from "react";
import { Separator } from "../ui/separator";
export type DialogContentType = {
  label: string;
  children?: JSX.Element;
  icon?: React.ReactNode;
  description?: string;
};
const SettingsDialog = ({
  open,
  onOpenChange,
  dialogContent,
}: {
  open: any;
  onOpenChange: any;
  dialogContent: DialogContentType[];
}) => {
  const [activeTab, setActiveTab] = React.useState<DialogContentType>(
    dialogContent[0]
  );
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger className="hidden">Open</DialogTrigger>
        <DialogContent className="max-h-[90vh] min-w-[45vw] overflow-auto p-0  ">
          <Sheet>
            <div className="h-14 flex items-center bg-secondary w-full">
              <SheetTrigger asChild>
                <Button variant={"ghost"} className="w-min">
                  <Menu />
                  Account
                </Button>
              </SheetTrigger>
            </div>

            <SheetContent
              side="left"
              disablePortal
              className="w-48 border-r p-4"
            >
              <SheetHeader className="mb-4">
                <DialogTitle className="text-left text-lg">
                  Settings
                </DialogTitle>
              </SheetHeader>

              <div className="space-y-2">
                {dialogContent.map((item) => (
                  <Button
                    key={item.label}
                    variant={
                      activeTab.label === item.label ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setActiveTab({ label: item.label })}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          {/* Main Panel Content To do make it children*/}
          <div className="flex-1 p-6 overflow-auto space-y-7">
            {dialogContent.map(
              (item) =>
                activeTab.label === item.label && (
                  <React.Fragment key={"profile"}>
                    <DialogHeader className="">
                      <DialogTitle className="text-left flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </DialogTitle>
                      <DialogDescription>{item.description}</DialogDescription>
                    </DialogHeader>
                    <Separator />
                    {item.children}
                  </React.Fragment>
                )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsDialog;
