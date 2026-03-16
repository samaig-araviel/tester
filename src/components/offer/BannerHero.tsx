"use client";

import Image from "next/image";

interface BannerHeroProps {
  bannerUrl: string | null;
  vendorName: string;
}

export default function BannerHero({ bannerUrl, vendorName }: BannerHeroProps) {
  return (
    <div className="w-full h-[260px] rounded-2xl overflow-hidden">
      {bannerUrl ? (
        <div className="relative w-full h-full">
          <Image
            src={bannerUrl}
            alt={`${vendorName} banner`}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
      ) : (
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, #F7F4EF 0%, #F0D5BF 50%, #E8E4DE 100%)",
          }}
        />
      )}
    </div>
  );
}
