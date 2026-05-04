import {
  InternForm,
  type InternFormData,
} from "@/components/interns/InternForm";
import { Button } from "@/components/ui/button";
import { useCreateIntern } from "@/hooks/use-interns";
import { internCreatePayload } from "@/lib/backend";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function NewInternPage() {
  const navigate = useNavigate();
  const createIntern = useCreateIntern();

  const handleSubmit = async (data: InternFormData) => {
    const profilePicCid = data.profilePicBlob
      ? data.profilePicBlob.getDirectURL()
      : undefined;
    try {
      const result = await createIntern.mutateAsync(
        internCreatePayload({
          name: data.name,
          email: data.email,
          phone: data.phone,
          department: data.department,
          space: data.space,
          status: data.status,
          experienceLevel: data.experienceLevel,
          joiningDate: new Date(data.joiningDate),
          adminNotes: data.adminNotes,
          profilePicCid,
        }),
      );
      navigate({ to: "/interns/$id", params: { id: result.id } });
    } catch {
      // toast is already fired by onError in useCreateIntern
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto" data-ocid="new_intern.page">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/interns">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            data-ocid="new_intern.back_button"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Intern</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details to onboard a new intern
          </p>
        </div>
      </div>

      <InternForm
        mode="create"
        isPending={createIntern.isPending}
        onSubmit={handleSubmit}
        onCancel={() => navigate({ to: "/interns" })}
        ocidPrefix="new_intern"
      />
    </div>
  );
}
