import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createRole } from "@/network/Api";
import { toast } from "sonner";

const CreateRole = ({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    setLoading(true);
    try {
      await createRole({ name });
      toast.success("Role created successfully");
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        className="text-black"
        placeholder="Role name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CreateRole;
