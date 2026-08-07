"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Loader2, UploadCloud, FileImage, ShieldCheck, X, AlertCircle } from "lucide-react";
import { couponCheckSchema, CouponCheckFormValues } from "@/lib/validations/lottery";
import { CouponCheckResult } from "@/types/lottery";
import { checkCouponNumberAction } from "@/lib/actions/lottery";
import { TicketResultCard } from "./ticket-result-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LotteryCheckerForm() {
  const [activeTab, setActiveTab] = React.useState<"manual" | "screenshot">("manual");
  const [isLoading, setIsLoading] = React.useState(false);
  const [singleResult, setSingleResult] = React.useState<CouponCheckResult | null>(null);

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CouponCheckFormValues>({
    resolver: zodResolver(couponCheckSchema),
    defaultValues: {
      couponNumber: "",
    },
  });

  const onSubmitManual = async (data: CouponCheckFormValues) => {
    setIsLoading(true);
    setSingleResult(null);

    try {
      const res = await checkCouponNumberAction(data.couponNumber, "MANUAL");
      setSingleResult(res);
    } catch (e) {
      console.error("Failed to check coupon number:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadMessage("File too large. Maximum file size is 5 MB");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadMessage(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
        setUploadMessage("Unsupported image format. Allowed formats: PNG, JPG, JPEG, WEBP");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadMessage("File too large. Maximum file size is 5 MB");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadMessage(null);
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setUploadMessage(null);

    try {
      const bodyData = new FormData();
      bodyData.append("image", selectedFile);

      const res = await fetch("/api/check-image", {
        method: "POST",
        body: bodyData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setUploadMessage(json.error || "OCR Processing Failed");
      } else {
        setSingleResult({
          couponNumber: json.couponNumber,
          isWinner: json.winner,
          checkedAt: new Date().toISOString(),
          referenceId: `IRD-OCR-${Math.floor(100000 + Math.random() * 900000)}`,
        });
      }
    } catch (err) {
      console.error("Failed to post check-image:", err);
      setUploadMessage("Provider not configured");
    } finally {
      setIsLoading(false);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadMessage(null);
  };

  return (
    <div id="checker" className="w-full max-w-2xl mx-auto space-y-6">
      <Tabs defaultValue="manual" value={activeTab} onValueChange={(v) => setActiveTab(v as "manual" | "screenshot")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="gap-2 text-xs">
            <Search className="h-4 w-4 text-sky-500" />
            <span>Manual Coupon Check</span>
          </TabsTrigger>
          <TabsTrigger value="screenshot" className="gap-2 text-xs">
            <UploadCloud className="h-4 w-4 text-emerald-500" />
            <span>Upload Screenshot</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl transition-all">
            {singleResult ? (
              <TicketResultCard result={singleResult} onReset={() => setSingleResult(null)} />
            ) : (
              <form onSubmit={handleSubmit(onSubmitManual)} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Enter Coupon Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      {...register("couponNumber")}
                      placeholder="e.g. 015585780989 or 014731484426"
                      className="h-12 pl-4 pr-12 text-base font-bold tracking-wider"
                      onChange={(e) => setValue("couponNumber", e.target.value.trim())}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <ShieldCheck className="h-5 w-5 text-sky-500" />
                    </div>
                  </div>
                  {errors.couponNumber && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">
                      {errors.couponNumber.message}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2">
                    Try entering official winning coupons like <strong>&quot;015585780989&quot;</strong>, <strong>&quot;014731484426&quot;</strong>, or <strong>&quot;014972520300&quot;</strong>.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="glow"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-bold tracking-wide shadow-xl"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" /> Verifying Official Winners DB...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Search className="h-5 w-5" /> Check Lottery
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </TabsContent>

        <TabsContent value="screenshot">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Upload Coupon Screenshot
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Upload an image of your IRD taxpayer coupon receipt to extract your coupon details.
                </p>
              </div>

              {!previewUrl ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-8 text-center hover:border-sky-500 transition-colors cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 mb-3">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Drag and drop your screenshot here, or <span className="text-sky-500">browse</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supported formats: PNG, JPG, JPEG, WEBP (Max 5 MB)
                  </p>
                </div>
              ) : (
                <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-950/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl} alt="Coupon preview" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-semibold text-slate-200 truncate max-w-[200px]">
                        {selectedFile?.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearSelectedFile}
                    className="h-8 w-8 text-slate-400 hover:text-slate-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {uploadMessage && (
                <div
                  className={`rounded-xl p-3 text-xs font-bold flex items-center gap-2 ${
                    uploadMessage === "Provider not configured"
                      ? "bg-amber-500/10 border border-amber-500/30 text-amber-500"
                      : "bg-red-500/10 border border-red-500/30 text-red-500"
                  }`}
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{uploadMessage}</span>
                </div>
              )}

              <Button
                onClick={handleUploadSubmit}
                disabled={!selectedFile || isLoading}
                variant="glow"
                className="w-full h-11 text-sm font-bold gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Processing OCR Pipeline...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FileImage className="h-4 w-4" /> Upload Screenshot
                  </span>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
