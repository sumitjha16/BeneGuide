import React, { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function HelpButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border hover:bg-elev-1 hover:border-brand-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-background",
          className
        )}
        aria-label="Help"
      >
        <HelpCircle className="h-5 w-5 text-brand-700 dark:text-white" />
      </button>

      {/* Help Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface border border-border rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-h2 text-text-strong">How to Use BeneGuide</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-elev-1 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-text-muted" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-h3 text-text-strong mb-2">Quick Start</h3>
                <p className="text-body text-text-muted">
                  Describe your health concern or benefit question in the text box. Be specific about symptoms, body parts, or services you need.
                </p>
              </div>
              <div>
                <h3 className="text-h3 text-text-strong mb-2">Examples</h3>
                <ul className="text-body text-text-muted space-y-1">
                  <li>• "I have tooth pain and need a dental cleaning"</li>
                  <li>• "Chest pain and want heart screening"</li>
                  <li>• "Need blood work and lab tests"</li>
                  <li>• "Feeling anxious and need therapy sessions"</li>
                </ul>
              </div>
              <div>
                <h3 className="text-h3 text-text-strong mb-2">Categories Covered</h3>
                <p className="text-body text-text-muted">
                  We cover 15+ medical specialties including Cardiology, Dermatology, Mental Health, Dental, Vision, Laboratory, Pharmacy, Emergency, and more.
                </p>
              </div>
              <div>
                <h3 className="text-h3 text-text-strong mb-2">Process</h3>
                <ol className="text-body text-text-muted space-y-1">
                  <li>1. Describe your health concern</li>
                  <li>2. AI analyzes and categorizes your query</li>
                  <li>3. Get matched with relevant benefits</li>
                  <li>4. Receive a step-by-step action plan</li>
                </ol>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <Button onClick={() => setIsOpen(false)} className="w-full text-white">
                Got it!
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}