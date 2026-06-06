"use client"

import { ImagePlus, FileUp } from "lucide-react"

interface UploadCardProps {
  type: "image" | "excel"
  title: string
  description: string
  file?: File | null
  onFileChange: (file: File | null) => void
}

export function UploadCard({ type, title, description, file, onFileChange }: UploadCardProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      onFileChange(droppedFile)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileChange(selectedFile)
    }
  }

  const inputId = `file-${type}-${title.replace(/\s/g, "-")}`

  return (
    <label
      htmlFor={inputId}
      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-border bg-background p-6 transition-colors hover:bg-muted"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        id={inputId}
        type="file"
        className="sr-only"
        accept={type === "image" ? "image/*" : ".xlsx,.xls,.csv"}
        onChange={handleFileInput}
      />
      
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-md border border-border">
        {type === "image" ? (
          <ImagePlus className="h-7 w-7 text-foreground" strokeWidth={1.5} />
        ) : (
          <FileUp className="h-7 w-7 text-foreground" strokeWidth={1.5} />
        )}
      </div>

      {file ? (
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{file.name}</p>
          <p className="text-xs text-muted-foreground">파일 선택됨</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      )}
    </label>
  )
}
