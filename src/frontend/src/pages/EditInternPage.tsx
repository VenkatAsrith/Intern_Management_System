import {
  InternForm,
  type InternFormData,
} from "@/components/interns/InternForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useDeleteIntern,
  useIntern,
  useUpdateIntern,
} from "@/hooks/use-interns";
import { internUpdatePayload } from "@/lib/backend";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Trash2 } from "lucide-react";

export function EditInternPage() {
  const { id } = useParams({ from: "/protected/layout/interns/$id/edit" });
  const navigate = useNavigate();
  const { data: intern, isLoading } = useIntern(id);
  const updateIntern = useUpdateIntern();
  const deleteIntern = useDeleteIntern();

  const handleSubmit = async (data: InternFormData) => {
    const profilePicCid = data.profilePicBlob
      ? data.profilePicBlob.getDirectURL()
      : intern?.profilePicCid;
    try {
      await updateIntern.mutateAsync({
        id,
        payload: internUpdatePayload({
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
      });
      navigate({ to: "/interns/$id", params: { id } });
    } catch {
      // toast is already fired by onError in useUpdateIntern
    }
  };

  const handleDelete = async () => {
    try {
      await deleteIntern.mutateAsync(id);
      navigate({ to: "/interns" });
    } catch {
      // toast is already fired by onError in useDeleteIntern
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto" data-ocid="edit_intern.page">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/interns/$id" params={{ id }}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              data-ocid="edit_intern.back_button"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isLoading
                ? "Edit Intern"
                : `Edit Intern — ${intern?.name ?? ""}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              Update intern profile and settings
            </p>
          </div>
        </div>

        {/* Delete button */}
        {!isLoading && intern && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                data-ocid="edit_intern.delete_button"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-ocid="edit_intern.delete_dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Intern</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to permanently delete{" "}
                  <strong>{intern.name}</strong>? This will also remove all
                  performance records. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="edit_intern.cancel_button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive hover:bg-destructive/90"
                  data-ocid="edit_intern.confirm_button"
                  disabled={deleteIntern.isPending}
                >
                  {deleteIntern.isPending ? "Deleting…" : "Delete Intern"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <InternForm
        mode="edit"
        initialData={intern}
        isLoading={isLoading}
        isPending={updateIntern.isPending}
        onSubmit={handleSubmit}
        onCancel={() => navigate({ to: "/interns/$id", params: { id } })}
        ocidPrefix="edit_intern"
      />
    </div>
  );
}
