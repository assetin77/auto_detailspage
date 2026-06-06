"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { MainContent } from "@/components/main-content"

interface UploadFiles {
  imageA: File | null
  imageB: File | null
  imageC: File | null
  excelA: File | null
  excelB: File | null
  excelC: File | null
}

export default function Home() {
  const [activeStep] = useState(2)
  const [selectedAiModel, setSelectedAiModel] = useState("openai")
  const [selectedImageModel, setSelectedImageModel] = useState("nano-banana")
  const [additionalRequirements, setAdditionalRequirements] = useState("")
  const [files, setFiles] = useState<UploadFiles>({
    imageA: null,
    imageB: null,
    imageC: null,
    excelA: null,
    excelB: null,
    excelC: null,
  })

  const handleFileChange = (key: keyof UploadFiles, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }))
  }

  const handleGenerate = () => {
    console.log("Generating with:", {
      aiModel: selectedAiModel,
      imageModel: selectedImageModel,
      files,
      additionalRequirements,
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav
        activeStep={activeStep}
        selectedAiModel={selectedAiModel}
        onAiModelChange={setSelectedAiModel}
        selectedImageModel={selectedImageModel}
        onImageModelChange={setSelectedImageModel}
      />
      <MainContent
        files={files}
        onFileChange={handleFileChange}
        additionalRequirements={additionalRequirements}
        onAdditionalRequirementsChange={setAdditionalRequirements}
        onGenerate={handleGenerate}
      />
    </div>
  )
}
