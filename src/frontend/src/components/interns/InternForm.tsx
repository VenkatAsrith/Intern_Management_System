import { ExperienceLevel, ExternalBlob, Space, Status } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { Intern } from "@/types";
import { Camera, Loader2, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export interface InternFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  space: Space;
  status: Status;
  experienceLevel: ExperienceLevel;
  joiningDate: string;
  adminNotes: string;
  profilePicBlob?: ExternalBlob | null;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  joiningDate?: string;
  profilePic?: string;
}

interface InternFormProps {
  mode: "create" | "edit";
  initialData?: Intern | null;
  isLoading?: boolean;
  isPending: boolean;
  onSubmit: (data: InternFormData) => Promise<void>;
  onCancel: () => void;
  ocidPrefix: string;
}

function validateEmail(v: string): string | undefined {
  if (!v) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return "Enter a valid email address";
}

function validatePhone(v: string): string | undefined {
  if (!v.trim()) return "Phone is required";
  const stripped = v.replace(/[\s\-()]/g, "");
  if (stripped.length < 6 || stripped.length > 15 || !/^\+?\d+$/.test(stripped))
    return "Enter a valid phone number";
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function InternForm({
  mode,
  initialData,
  isLoading,
  isPending,
  onSubmit,
  onCancel,
  ocidPrefix,
}: InternFormProps) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState<InternFormData>(() => ({
    name: initialData?.name ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    department: initialData?.department ?? "",
    space: initialData?.space ?? Space.Org,
    status: initialData?.status ?? Status.Active,
    experienceLevel: initialData?.experienceLevel ?? ExperienceLevel.Junior,
    joiningDate: initialData?.joiningDate
      ? initialData.joiningDate.toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    adminNotes: initialData?.adminNotes ?? "",
    profilePicBlob: null,
  }));

  const [errors, setErrors] = useState<FieldErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.profilePicCid ?? null,
  );
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if initialData loads after mount (edit page)
  const [synced, setSynced] = useState(false);
  if (isEdit && initialData && !synced) {
    setForm({
      name: initialData.name,
      email: initialData.email,
      phone: initialData.phone,
      department: initialData.department,
      space: initialData.space,
      status: initialData.status,
      experienceLevel: initialData.experienceLevel,
      joiningDate: initialData.joiningDate.toISOString().split("T")[0],
      adminNotes: initialData.adminNotes,
      profilePicBlob: null,
    });
    setPreviewUrl(initialData.profilePicCid ?? null);
    setSynced(true);
  }

  const set = useCallback(
    (k: keyof InternFormData, v: string) => setForm((f) => ({ ...f, [k]: v })),
    [],
  );

  const validateField = (field: keyof FieldErrors, value: string) => {
    let error: string | undefined;
    if (field === "name" && !value.trim()) error = "Name is required";
    if (field === "email") error = validateEmail(value);
    if (field === "phone") error = validatePhone(value);
    if (field === "department" && !value.trim())
      error = "Department is required";
    if (field === "joiningDate" && !value) error = "Joining date is required";
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, profilePic: "File exceeds 5MB limit" }));
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        profilePic: "Only image files allowed",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, profilePic: undefined }));
    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      blob.withUploadProgress((pct) => setUploadProgress(pct));
      setPreviewUrl(
        URL.createObjectURL(new Blob([bytes], { type: file.type })),
      );
      setForm((f) => ({ ...f, profilePicBlob: blob }));
      setUploadProgress(null);
    };
    reader.readAsArrayBuffer(file);
  };

  const removePhoto = () => {
    setPreviewUrl(null);
    setForm((f) => ({ ...f, profilePicBlob: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateAll = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;
    const phoneErr = validatePhone(form.phone);
    if (phoneErr) newErrors.phone = phoneErr;
    if (!form.department.trim())
      newErrors.department = "Department is required";
    if (!form.joiningDate) newErrors.joiningDate = "Joining date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    await onSubmit(form);
  };

  const isFormValid =
    form.name.trim() &&
    !validateEmail(form.email) &&
    !validatePhone(form.phone) &&
    form.department.trim() &&
    form.joiningDate;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Profile picture */}
      <Card className="mb-5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Profile Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            {/* Upload area / preview */}
            <div className="relative">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="h-24 w-24 rounded-full object-cover border-2 border-primary/40"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/80 transition-colors"
                    aria-label="Remove photo"
                    data-ocid={`${ocidPrefix}.remove_photo_button`}
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-24 w-24 rounded-full border-2 border-dashed border-border hover:border-primary/60 bg-muted/40 flex flex-col items-center justify-center gap-1 transition-colors group"
                  aria-label="Upload photo"
                  data-ocid={`${ocidPrefix}.upload_photo_button`}
                >
                  <Camera className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              )}
              {uploadProgress !== null && (
                <div className="absolute inset-0 rounded-full bg-background/60 flex items-center justify-center">
                  <span className="text-xs font-mono text-primary">
                    {uploadProgress}%
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                data-ocid={`${ocidPrefix}.upload_button`}
              >
                {previewUrl ? "Change photo" : "Upload photo"}
              </button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or WebP · max 5 MB
              </p>
              {errors.profilePic && (
                <p
                  className="text-xs text-destructive"
                  data-ocid={`${ocidPrefix}.photo_error`}
                >
                  {errors.profilePic}
                </p>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              data-ocid={`${ocidPrefix}.photo_input`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Main info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Intern Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor={`${ocidPrefix}-name`}>
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${ocidPrefix}-name`}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                onBlur={(e) => validateField("name", e.target.value)}
                placeholder="Arjun Sharma"
                className={
                  errors.name
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                data-ocid={`${ocidPrefix}.name_input`}
              />
              {errors.name && (
                <p
                  className="text-xs text-destructive"
                  data-ocid={`${ocidPrefix}.name_error`}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor={`${ocidPrefix}-email`}>
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${ocidPrefix}-email`}
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                onBlur={(e) => validateField("email", e.target.value)}
                placeholder="arjun@example.com"
                className={
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                data-ocid={`${ocidPrefix}.email_input`}
              />
              {errors.email && (
                <p
                  className="text-xs text-destructive"
                  data-ocid={`${ocidPrefix}.email_error`}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor={`${ocidPrefix}-phone`}>
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${ocidPrefix}-phone`}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={(e) => validateField("phone", e.target.value)}
                placeholder="9876543210"
                maxLength={15}
                className={
                  errors.phone
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                data-ocid={`${ocidPrefix}.phone_input`}
              />
              {errors.phone && (
                <p
                  className="text-xs text-destructive"
                  data-ocid={`${ocidPrefix}.phone_error`}
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <Label htmlFor={`${ocidPrefix}-dept`}>
                Department <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${ocidPrefix}-dept`}
                value={form.department}
                onChange={(e) => set("department", e.target.value)}
                onBlur={(e) => validateField("department", e.target.value)}
                placeholder="Engineering"
                className={
                  errors.department
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                data-ocid={`${ocidPrefix}.department_input`}
              />
              {errors.department && (
                <p
                  className="text-xs text-destructive"
                  data-ocid={`${ocidPrefix}.dept_error`}
                >
                  {errors.department}
                </p>
              )}
            </div>

            {/* Joining Date */}
            <div className="space-y-1.5">
              <Label htmlFor={`${ocidPrefix}-joining`}>
                Joining Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${ocidPrefix}-joining`}
                type="date"
                value={form.joiningDate}
                onChange={(e) => set("joiningDate", e.target.value)}
                onBlur={(e) => validateField("joiningDate", e.target.value)}
                className={
                  errors.joiningDate
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                data-ocid={`${ocidPrefix}.joining_date_input`}
              />
              {errors.joiningDate && (
                <p
                  className="text-xs text-destructive"
                  data-ocid={`${ocidPrefix}.joining_date_error`}
                >
                  {errors.joiningDate}
                </p>
              )}
            </div>

            {/* Space */}
            <div className="space-y-1.5">
              <Label>
                Space <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.space}
                onValueChange={(v) => set("space", v as Space)}
              >
                <SelectTrigger data-ocid={`${ocidPrefix}.space_select`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Space.Org}>Org</SelectItem>
                  <SelectItem value={Space.Marketing}>Marketing</SelectItem>
                  <SelectItem value={Space.Learning}>Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <Label>
                Status <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.status}
                onValueChange={(v) => set("status", v as Status)}
              >
                <SelectTrigger data-ocid={`${ocidPrefix}.status_select`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Status.Active}>Active</SelectItem>
                  <SelectItem value={Status.Completed}>Completed</SelectItem>
                  <SelectItem value={Status.OnHold}>On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Experience Level */}
            <div className="space-y-1.5">
              <Label>
                Experience Level <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.experienceLevel}
                onValueChange={(v) =>
                  set("experienceLevel", v as ExperienceLevel)
                }
              >
                <SelectTrigger data-ocid={`${ocidPrefix}.exp_level_select`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ExperienceLevel.Junior}>Junior</SelectItem>
                  <SelectItem value={ExperienceLevel.Mid}>Mid</SelectItem>
                  <SelectItem value={ExperienceLevel.Senior}>Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Admin Notes — full width */}
          <div className="space-y-1.5">
            <Label htmlFor={`${ocidPrefix}-notes`}>Admin Notes</Label>
            <Textarea
              id={`${ocidPrefix}-notes`}
              value={form.adminNotes}
              onChange={(e) => set("adminNotes", e.target.value)}
              placeholder="Internal notes about this intern…"
              rows={3}
              data-ocid={`${ocidPrefix}.notes_textarea`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between mt-5">
        <p className="text-xs text-muted-foreground">
          Fields marked <span className="text-destructive">*</span> are required
        </p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            data-ocid={`${ocidPrefix}.cancel_button`}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 min-w-[130px]"
            disabled={isPending || !isFormValid}
            data-ocid={`${ocidPrefix}.submit_button`}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isEdit ? "Saving…" : "Creating…"}
              </span>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Create Intern"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
