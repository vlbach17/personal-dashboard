import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useGuides } from "../state/GuidesContext";

/** Long-reading surface -- rendered on Ground variant B (halftone over dye) via AppShell's route match. */
export function GuideDetailScreen() {
  const { id } = useParams();
  const { guides } = useGuides();
  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return (
      <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
        <Link
          to="/guides"
          aria-label="Back to Guides"
          title="Guides"
          className="flex w-fit items-center gap-1.5 font-mono text-xs text-label"
        >
          <ArrowLeftIcon size={22} weight="duotone" />
        </Link>
        <p className="mt-[34px] text-[18px] text-body">This guide no longer exists.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <Link
        to="/guides"
        aria-label="Back to Guides"
        title="Guides"
        className="flex w-fit items-center gap-1.5 font-mono text-xs text-label"
      >
        <ArrowLeftIcon size={22} weight="duotone" />
      </Link>
      <div className="mt-[18px] font-mono text-xs tracking-[0.1em] text-label uppercase">
        {guide.category} · {guide.updatedLabel}
      </div>
      <h1 className="mt-2 text-[28px] leading-[1.2] font-semibold text-ink">{guide.title}</h1>
      <p className="mt-[26px] max-w-[62ch] text-[15px] leading-[23px] text-pretty text-body">{guide.body}</p>
    </div>
  );
}
