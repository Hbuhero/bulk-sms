
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepperProps {
  steps: string[]
  currentStep: number
  className?: string
}

const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={cn("flex items-center justify-between mb-12", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                index < currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : index === currentStep
                  ? "bg-primary border-primary text-primary-foreground scale-110"
                  : "bg-background border-muted-foreground/30 text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "mt-3 text-sm font-semibold text-center max-w-24 transition-colors duration-300",
                index <= currentStep 
                  ? index === currentStep 
                    ? "text-primary font-bold" 
                    : "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-1 mx-6 rounded-full transition-all duration-500",
                index < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export { Stepper }
