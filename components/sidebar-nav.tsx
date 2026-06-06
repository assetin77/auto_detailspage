"use client"

import { Settings } from "lucide-react"

interface SidebarNavProps {
  activeStep: number
  selectedAiModel: string
  onAiModelChange: (model: string) => void
  selectedImageModel: string
  onImageModelChange: (model: string) => void
}

export function SidebarNav({
  activeStep,
  selectedAiModel,
  onAiModelChange,
  selectedImageModel,
  onImageModelChange,
}: SidebarNavProps) {
  const navItems = [
    { id: 1, label: "01 - 대시보드" },
    { id: 2, label: "02 - 상세페이지 기획" },
    { id: 3, label: "03 - 상세페이지 만들기" },
  ]

  const aiModels = [
    { id: "openai", label: "OpenAI ChatGPT" },
    { id: "gemini", label: "Google Gemini" },
  ]

  const imageModels = [
    { id: "openai-image", label: "OpenAI Image 2.0", description: "Got-image-2-2026-04-21" },
    { id: "nano-banana", label: "Google Nano Banana 2", description: "Gemini-3.1-flash-image-preview" },
  ]

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-background p-6">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center">
          <Settings className="h-8 w-8 text-foreground" strokeWidth={1} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">자유인 AI 자동 생성기</p>
          <h1 className="text-base font-semibold text-foreground">상세페이지 기획</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mb-8 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`rounded-md px-4 py-2.5 text-left text-sm font-medium transition-colors ${
              activeStep === item.id
                ? "bg-sky-500 text-white"
                : "bg-background text-foreground hover:bg-muted border border-border"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* AI Model Selection */}
      <div className="mb-6">
        <div className="mb-1">
          <h2 className="text-sm font-semibold text-foreground">AI 모델 선택</h2>
          <p className="text-xs text-muted-foreground">API를 연결해 주세요</p>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {aiModels.map((model) => (
            <button
              key={model.id}
              onClick={() => onAiModelChange(model.id)}
              className={`rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors ${
                selectedAiModel === model.id
                  ? "border-sky-500 bg-sky-50 text-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              {model.label}
            </button>
          ))}
        </div>
      </div>

      {/* Image Generation Model Selection */}
      <div>
        <div className="mb-1">
          <h2 className="text-sm font-semibold text-foreground">이미지 생성 모델 선택</h2>
          <p className="text-xs text-muted-foreground">API를 연결해 주세요</p>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {imageModels.map((model) => (
            <button
              key={model.id}
              onClick={() => onImageModelChange(model.id)}
              className={`rounded-md border px-4 py-3 text-left transition-colors ${
                selectedImageModel === model.id
                  ? "border-sky-500 bg-sky-50"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              <span className="block text-sm font-medium text-foreground">{model.label}</span>
              <span className="block text-xs text-muted-foreground">{model.description}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
