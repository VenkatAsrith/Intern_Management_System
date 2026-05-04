import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 display */}
        <div className="space-y-2">
          <div className="text-8xl font-black text-primary/20 leading-none select-none">
            404
          </div>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
            data-ocid="notfound.back_button"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
          <Link to="/dashboard">
            <Button
              type="button"
              className="gap-2 bg-primary hover:bg-primary/90"
              data-ocid="notfound.home_button"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          TechMecha Torque — Intern Management System
        </p>
      </div>
    </div>
  );
}
