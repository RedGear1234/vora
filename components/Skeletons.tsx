
import React from 'react';

export const ProductSkeleton = () => (
  <div className="flex flex-col gap-8 animate-pulse">
    <div className="aspect-[3/4] bg-neutral-100 border border-neutral-50" />
    <div className="flex flex-col gap-3 px-1">
      <div className="flex justify-between items-start gap-6">
        <div className="h-6 bg-neutral-100 w-2/3" />
        <div className="h-6 bg-neutral-100 w-12" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-3 bg-neutral-50 w-24" />
        <div className="w-8 h-[1px] bg-neutral-100" />
      </div>
    </div>
  </div>
);

export const FeedbackSkeleton = () => (
  <div className="space-y-8 p-12 bg-neutral-50 border border-neutral-100 flex flex-col items-center text-center animate-pulse">
    <div className="w-20 h-20 rounded-full bg-neutral-100" />
    <div className="space-y-3 w-full">
      <div className="h-4 bg-neutral-100 w-full mx-auto" />
      <div className="h-4 bg-neutral-100 w-5/6 mx-auto" />
      <div className="h-4 bg-neutral-100 w-4/6 mx-auto" />
    </div>
    <div className="space-y-2 w-24">
      <div className="h-2 bg-neutral-100" />
      <div className="h-2 bg-neutral-50" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <section className="relative min-h-screen flex items-center px-6 lg:px-12 pt-20 animate-pulse">
    <div className="absolute inset-0 -z-10 bg-neutral-50 overflow-hidden" />
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-10">
        <div className="h-3 bg-neutral-100 w-32 tracking-[0.6em]" />
        <div className="space-y-4">
          <div className="h-24 md:h-32 bg-neutral-100 w-full" />
          <div className="h-24 md:h-32 bg-neutral-100 w-3/4" />
        </div>
        <div className="h-8 bg-neutral-100 w-48 border-b border-neutral-200" />
      </div>
      <div className="hidden lg:flex justify-end">
        <div className="w-[450px] aspect-[4/5] bg-neutral-100 p-3 shadow-sm" />
      </div>
    </div>
  </section>
);
