"use client";

import { toast } from "sonner";
import { useCallback, useState } from "react";

export type Response<T = any> = {
  ok?: boolean;
  error?: string;
  message?: string;
  success?: string;
  data?: T;
  fieldErrors?: Record<string, string[]>;
  formFields?: Record<string, string>;
  formErrors?: string[];
};

export type ClientFormSubmissionProps<T = any> = {
  action: (formData: FormData) => Promise<Response<T>>;
  onSuccessRedirect?: string;
  onErrorRedirect?: string;
  fileKey?: string;
  uploadFileRoute?: string;
};

const useClientFormSubmission = <T = any,>({
  action,
  onSuccessRedirect,
  onErrorRedirect,
  fileKey = "file",
  uploadFileRoute,
}: ClientFormSubmissionProps<T>) => {
  const [state, setState] = useState<Response<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      e?.preventDefault();

      const formData = new FormData(e?.currentTarget);

      const form = e?.currentTarget;

      const fileFromForm = formData.get(fileKey) as File | null;

      try {
        let fileUrl = null;
        let fileName = null;

        // Upload file if route is provided
        if (uploadFileRoute && fileFromForm && fileFromForm.size > 0) {
          try {
            formData.set("fileKey", fileKey); // This is used to identify the file in the backend
            const upload = await fetch(uploadFileRoute, {
              method: "POST",
              body: formData,
            });

            const data = await upload.json();

            if (!data.ok) {
              throw new Error(data.error || "Failed to upload file");
            }

            fileUrl = data.fileUrl;
            fileName = data.fileName;
          } catch (uploadError) {
            console.error("File upload error:", uploadError);
            toast.error("Failed to upload file. Please try again.");
            return;
          }
        }

        // Replace file with URL in form data
        if (fileUrl && fileName) {
          formData.set(fileKey, fileUrl);
        }

        // Submit the form
        const submission = await action(formData);

        if (!submission?.ok) {
          // If form submission fails and we uploaded a file, clean it up
          if (fileName && uploadFileRoute) {
            formData.delete(fileKey);

            await cleanupUploadedFile(uploadFileRoute, formData, fileName);
          }

          toast.error(
            submission?.error ||
              submission?.message ||
              "Form submission failed, please contact support."
          );

          setState((prev) => ({
            ...prev,
            formFields: submission?.formFields,
            formErrors: submission?.formErrors,
            fieldErrors: submission?.fieldErrors,
          }));

          return;
        }

        // Success
        setState({
          ok: true,
          data: submission?.data,
        });

        if (form) {
          form.reset();
        }

        if (onSuccessRedirect) {
          window.location.href = onSuccessRedirect;
        }

        toast.success(submission?.success || "Form submitted successfully.");
      } catch (err) {
        console.error("Form submission error:", err);

        if (onErrorRedirect) {
          window.location.href = onErrorRedirect;
        }

        setState({
          ok: false,
          error: "An unexpected error occurred. Please try again later.",
        });

        toast.error("An unexpected error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      action,
      onSuccessRedirect,
      onErrorRedirect,
      fileKey,
      uploadFileRoute,
      isSubmitting,
    ]
  );

  // Helper function to cleanup uploaded files
  const cleanupUploadedFile = async (
    uploadRoute: string,
    formData: FormData,
    fileName: string
  ) => {
    try {
      const deleteFormData = new FormData();
      const inviteCode = String(formData.get("inviteCode"));

      deleteFormData.set("inviteCode", inviteCode);
      deleteFormData.set("file", fileName);

      await fetch(uploadRoute, {
        method: "DELETE",
        body: deleteFormData,
      });
    } catch (err) {
      console.error("Error cleaning up uploaded file:", err);
    }
  };

  return {
    state,
    handleFormSubmit,
    isSubmitting,
  };
};

export default useClientFormSubmission;
