import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-stone-200 text-stone-800",
        primary:
          "border-transparent bg-aegean/20 text-aegean-text",
        secondary:
          "border-transparent bg-terracotta/20 text-terracotta-text",
        success:
          "border-transparent bg-olive/20 text-olive-text",
        warning:
          "border-transparent bg-honey/20 text-honey-text",
        error:
          "border-transparent bg-incorrect/20 text-incorrect",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-stone-300 bg-white text-stone-700 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs",
        sm: "px-2 py-1 text-xs",
        md: "px-2.5 py-1.5 text-sm",
        lg: "px-3 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xs",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
