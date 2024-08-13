"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon, XIcon, FileIcon, LoadingIcon } from "./Icons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useFileUploader } from "@/hooks/useFileUploader";
import { APIKeyInput } from "./APIKeyInput";

export function FileUploader({
  onUploadComplete,
}: {
  onUploadComplete: () => void;
}) {
  const {
    files,
    uploading,
    error,
    apiKey,
    setApiKey,
    getRootProps,
    getInputProps,
    isDragActive,
    handleUpload,
    handleRemoveFile,
  } = useFileUploader(onUploadComplete);

  return (
    <div className="flex flex-col gap-8 mb-8 w-full max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center sm:text-left text-primary">
        Upload Files
      </h2>

      <div className="mb-6">
        <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />
      </div>

      <AnimatePresence mode="wait">
        {apiKey && (
          <motion.div
            key="file-uploader"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {!files.length ? (
              <div
                {...getRootProps()}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-in-out",
                  isDragActive
                    ? "border-primary bg-primary/10"
                    : "border-input hover:border-primary hover:bg-accent/50"
                )}
              >
                <input {...getInputProps()} />
                <UploadIcon className="w-16 h-16 mb-4 text-muted-foreground" />
                <p className="text-sm text-foreground text-center">
                  <span className="font-semibold text-primary">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Max file size: 3 GB
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center gap-3 bg-card rounded-lg p-4 border border-input shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <FileIcon className="w-6 h-6 text-primary flex-shrink-0" />
                      <p className="text-sm text-foreground truncate flex-grow">
                        {file.name}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFile(file.name)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                        aria-label={`Remove ${file.name}`}
                      >
                        <XIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button
                    onClick={handleUpload}
                    disabled={files.length === 0 || uploading}
                    className={cn(
                      "w-full py-4 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out",
                      files.length > 0 && !uploading
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {uploading ? (
                      <span className="flex items-center justify-center">
                        <LoadingIcon className="mr-3 h-6 w-6 animate-spin" />
                        Uploading...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <UploadIcon className="w-6 h-6 mr-2" /> Upload Files
                      </span>
                    )}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm mt-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}