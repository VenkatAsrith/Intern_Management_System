import { useAuth } from "@/hooks/use-auth";

interface PermissionGateProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function PermissionGate({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { hasPermission } = useAuth();
  return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
}
