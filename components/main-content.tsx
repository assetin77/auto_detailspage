"use client"

import { Sparkles } from "lucide-react"
import { UploadCard } from "./upload-card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface UploadFiles {
  imageA: File | null
  imageB: File | null
  imageC: File | null
  excelA: File | null
  excelB: File | null
  excelC: File | null
}

interface MainContentProps {
  files: UploadFiles
  onFileChange: (key: keyof UploadFiles, file: File | null) => void
  additionalRequirements: string
  onAdditionalRequirementsChange: (value: string) => void
  onGenerate: () => void
}

export function MainContent({
  files,
  onFileChange,
  additionalRequirements,
  onAdditionalRequirementsChange,
  onGenerate,
}: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto bg-muted/30 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">경쟁사 상세페이지 자료 업로드</h2>
          <p className="text-sm text-muted-foreground">
            {"이미지(상세페이지)+리뷰(엑셀)를 첨부하하세요"}
          </p>
        </div>

        {/* Upload Grid */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <UploadCard
            type="image"
            title="이미지를 여기에 놓기"
            description="A 경쟁업체 상세페이지"
            file={files.imageA}
            onFileChange={(file) => onFileChange("imageA", file)}
          />
          <UploadCard
            type="image"
            title="이미지를 여기에 놓기"
            description="B 경쟁업체 상세페이지"
            file={files.imageB}
            onFileChange={(file) => onFileChange("imageB", file)}
          />
          <UploadCard
            type="image"
            title="이미지를 여기에 놓기"
            description="C 경쟁업체 상세페이지"
            file={files.imageC}
            onFileChange={(file) => onFileChange("imageC", file)}
          />
          <UploadCard
            type="excel"
            title="리뷰 엑셀 파일"
            description="A 경쟁업체 상세페이지"
            file={files.excelA}
            onFileChange={(file) => onFileChange("excelA", file)}
          />
          <UploadCard
            type="excel"
            title="리뷰 엑셀 파일"
            description="B 경쟁업체 상세페이지"
            file={files.excelB}
            onFileChange={(file) => onFileChange("excelB", file)}
          />
          <UploadCard
            type="excel"
            title="리뷰 엑셀 파일"
            description="C 경쟁업체 상세페이지"
            file={files.excelC}
            onFileChange={(file) => onFileChange("excelC", file)}
          />
        </div>

        {/* Additional Requirements */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            추가 요청사항
          </label>
          <Textarea
            placeholder="첫 화면에서 제품의 차별점이 바로 보이게 하고, 구매 불안을 줄이는 근거 섹션을 강화해주세요. 과장 표현은 피하고 스마트스토어에 맞춰 스캔이 쉬운 구성으로 정리해주세요."
            className="min-h-28 resize-none bg-background"
            value={additionalRequirements}
            onChange={(e) => onAdditionalRequirementsChange(e.target.value)}
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-end">
          <Button
            onClick={onGenerate}
            className="bg-sky-500 px-6 py-2.5 text-white hover:bg-sky-600"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            기획서 생성하기
          </Button>
        </div>
      </div>
    </main>
  )
}
