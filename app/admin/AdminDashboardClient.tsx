"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Project, ContentType } from "@/lib/projects";

interface Props {
  initialProjects: Project[];
}

export default function AdminDashboardClient({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showPublished, setShowPublished] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState<ContentType>("link");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [videoFile, setVideoFile] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formRef = useRef<HTMLElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const togglePublished = () => {
    setShowPublished((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  const handleStartEdit = (proj: Project) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setDescription(proj.description);
    setContentType(proj.contentType);
    setLinkUrl(proj.linkUrl || "");
    setImageFile(proj.imageFile || "");
    setVideoFile(proj.videoFile || "");
    setError(null);
    setSuccess(null);
    setShowPublished(false); // Switch to the form view to edit the project

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      titleInputRef.current?.focus();
    }, 50);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setContentType("link");
    setLinkUrl("");
    setImageFile("");
    setVideoFile("");
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim()) {
      setError("Please enter a project title.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a project description.");
      return;
    }

    if (contentType === "link" && !linkUrl.trim()) {
      setError("Please enter a destination URL for the link.");
      return;
    }
    if (contentType === "image" && !imageFile.trim()) {
      setError("Please enter the image filename located in the public folder.");
      return;
    }
    if (contentType === "video" && !videoFile.trim()) {
      setError("Please enter the video filename located in the public folder.");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        // Edit / Update existing project
        const res = await fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            title: title.trim(),
            description: description.trim(),
            contentType,
            linkUrl: contentType === "link" ? linkUrl.trim() : undefined,
            imageFile: contentType === "image" ? imageFile.trim() : undefined,
            videoFile: contentType === "video" ? videoFile.trim() : undefined,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setProjects((prev) =>
            prev.map((p) => (p.id === editingId ? data.project : p))
          );
          handleCancelEdit();
          setSuccess("Project updated successfully!");
          setTimeout(() => setSuccess(null), 4000);
        } else {
          setError(data.error || "Failed to update project.");
        }
      } else {
        // Create new project
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            contentType,
            linkUrl: contentType === "link" ? linkUrl.trim() : undefined,
            imageFile: contentType === "image" ? imageFile.trim() : undefined,
            videoFile: contentType === "video" ? videoFile.trim() : undefined,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setProjects((prev) => [...prev, data.project]);
          handleCancelEdit();
          setSuccess("Project published successfully to your Works page!");
          setTimeout(() => setSuccess(null), 4000);
        } else {
          setError(data.error || "Failed to publish project.");
        }
      }
    } catch {
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string, projectTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        if (editingId === id) {
          handleCancelEdit();
        }
      } else {
        alert("Failed to delete project.");
      }
    } catch {
      alert("Network error while deleting project.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center pt-12 sm:pt-16 pb-24 px-4 sm:px-6 md:px-8 bg-obsidian text-text-primary antialiased">
      {/* Ambient Red Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-110 overflow-hidden z-0 select-none"
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-180 h-65 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(140,8,8,0.18)_0%,rgba(140,8,8,0.05)_45%,transparent_75%)] blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-3xl lg:max-w-4xl mx-auto space-y-10 sm:space-y-12">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/8 gap-4">
          <div>
            <h1 className="font-oswald text-2xl sm:text-3xl font-normal text-text-primary tracking-tight">
              Manage Projects
            </h1>
          </div>

          {/* 3 Buttons: Aligned horizontally on Desktop, stacked vertically on Mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            {/* Button 1: Published Projects (Brand Red) */}
            <button
              type="button"
              onClick={togglePublished}
              aria-expanded={showPublished}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-1.5 rounded-full bg-brand-red text-white border border-white/20 shadow-[0_4px_15px_-2px_rgba(140,8,8,0.6)] hover:bg-[#a30b0b] hover:shadow-[0_0_20px_rgba(140,8,8,0.85)] font-sans text-xs sm:text-sm font-medium transition-all cursor-pointer w-full sm:w-auto"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Published Projects</span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/30 text-white text-[0.7rem] font-mono">
                {projects.length}
              </span>
            </button>

            {/* Button 2: View Works */}
            <Link
              href="/works"
              target="_blank"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs sm:text-sm font-sans text-text-secondary hover:text-white transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>View Works</span>
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            {/* Button 3: Log Out */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-950/20 text-xs sm:text-sm font-sans text-text-secondary hover:text-red-300 transition-all cursor-pointer w-full sm:w-auto"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: Published Projects (Displayed ONLY when showPublished is true) */}
        {showPublished && (
          <section id="published-projects" className="space-y-4 pt-2">
            <div className="flex items-center justify-between pb-3 border-b border-white/8">
              <div className="flex items-center gap-2.5">
                <h2 className="font-sans text-lg sm:text-xl font-semibold text-text-primary">
                  Published Projects
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white/8 text-xs font-mono text-white/80">
                  {projects.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPublished(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-red text-white border border-white/20 shadow-[0_4px_15px_-2px_rgba(140,8,8,0.6)] hover:bg-[#a30b0b] hover:shadow-[0_0_20px_rgba(140,8,8,0.85)] font-sans text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                <span>+ Add Project</span>
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/8 text-center">
                <p className="font-sans text-sm text-text-secondary">
                  No published projects yet. Use the form below to publish your first work!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                {projects.map((proj) => {
                  const isCurrentEdit = editingId === proj.id;
                  return (
                    <div
                      key={proj.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl transition-all ${
                        isCurrentEdit
                          ? "bg-brand-red/10 border border-brand-red/50 shadow-[0_0_20px_rgba(140,8,8,0.25)]"
                          : "bg-white/[0.02] border border-white/8 hover:border-white/15"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-sans text-base sm:text-lg font-semibold text-text-primary truncate">
                          {proj.title}
                        </h3>
                        <p className="mt-1 font-sans text-xs sm:text-sm text-text-secondary line-clamp-2">
                          {proj.description}
                        </p>
                      </div>

                      {/* Actions: Bare Icon Edit & Delete */}
                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(proj)}
                          title="Edit project"
                          aria-label="Edit project"
                          className="p-1 text-white/50 hover:text-white hover:scale-110 transition-all cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          disabled={deletingId === proj.id}
                          title="Delete project"
                          aria-label="Delete project"
                          className="p-1 text-red-500/70 hover:text-red-400 hover:scale-110 transition-all disabled:opacity-40 cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* SECTION 2: Form Container (Displayed ONLY when showPublished is false) */}
        {!showPublished && (
          <section
            ref={formRef}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-xl"
          >
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="font-playwrite text-xl sm:text-2xl font-normal text-text-primary">
                {editingId ? "Edit Project" : "Add New Project"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs font-sans text-text-secondary hover:text-white transition-all cursor-pointer shrink-0"
              >
                <span>Cancel</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="proj-title"
                className="block text-xs sm:text-sm font-sans font-medium text-text-secondary mb-2"
              >
                Project Title
              </label>
              <input
                ref={titleInputRef}
                id="proj-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Varidhi"
                className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder-white/20 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all font-sans text-sm sm:text-base"
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="proj-desc"
                className="block text-xs sm:text-sm font-sans font-medium text-text-secondary mb-2"
              >
                Project Description
              </label>
              <textarea
                id="proj-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the project, concept, and results..."
                className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder-white/20 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all font-sans text-sm sm:text-base leading-relaxed"
              />
            </div>

            {/* Content Type Filter (3 options: Link, Image, Video) */}
            <div>
              <label className="block text-xs sm:text-sm font-sans font-medium text-text-secondary mb-2.5">
                Content Type Filter
              </label>
              <div className="flex flex-wrap gap-2.5">
                {(["link", "image", "video"] as const).map((type) => {
                  const active = contentType === type;
                  const label = type === "link" ? "Link" : type === "image" ? "Image" : "Video";
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setContentType(type)}
                      className={`px-5 py-2 rounded-full font-sans text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                        active
                          ? "bg-brand-red text-white shadow-[0_0_15px_rgba(140,8,8,0.6)] font-medium"
                          : "bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Input based on Selected Content Type */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-2">
              {contentType === "link" && (
                <div>
                  <label
                    htmlFor="proj-link"
                    className="block text-xs sm:text-sm font-sans font-medium text-text-primary mb-1.5"
                  >
                    Destination URL
                  </label>
                  <input
                    id="proj-link"
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="e.g. https://varidhi.netlify.app"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 border border-white/15 text-text-primary placeholder-white/20 focus:outline-none focus:border-brand-red font-sans text-xs sm:text-sm"
                  />
                </div>
              )}

              {contentType === "image" && (
                <div>
                  <label
                    htmlFor="proj-image"
                    className="block text-xs sm:text-sm font-sans font-medium text-text-primary mb-1.5"
                  >
                    Image Filename (in public folder)
                  </label>
                  <input
                    id="proj-image"
                    type="text"
                    value={imageFile}
                    onChange={(e) => setImageFile(e.target.value)}
                    placeholder="e.g. showcase.png or preview.jpg"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 border border-white/15 text-text-primary placeholder-white/20 focus:outline-none focus:border-brand-red font-sans text-xs sm:text-sm font-mono"
                  />
                  <span className="block mt-1 text-[0.75rem] font-sans text-text-secondary/60">
                    Loads automatically from <code className="text-white/80">/public/[filename]</code>. No re-upload required.
                  </span>
                </div>
              )}

              {contentType === "video" && (
                <div>
                  <label
                    htmlFor="proj-video"
                    className="block text-xs sm:text-sm font-sans font-medium text-text-primary mb-1.5"
                  >
                    Video Filename (in public folder)
                  </label>
                  <input
                    id="proj-video"
                    type="text"
                    value={videoFile}
                    onChange={(e) => setVideoFile(e.target.value)}
                    placeholder="e.g. omni-ad.mp4"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 border border-white/15 text-text-primary placeholder-white/20 focus:outline-none focus:border-brand-red font-sans text-xs sm:text-sm font-mono"
                  />
                  <span className="block mt-1 text-[0.75rem] font-sans text-text-secondary/60">
                    Loads automatically from <code className="text-white/80">/public/[filename]</code> into the Play/Pause button player.
                  </span>
                </div>
              )}
            </div>

            {/* Error / Success Feedback */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs sm:text-sm font-sans text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-sans text-center">
                {success}
              </div>
            )}

            {/* Submit & Cancel Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-red text-white font-playwrite text-sm sm:text-base font-normal shadow-[0_4px_20px_-2px_rgba(140,8,8,0.6)] border border-white/20 transition-all duration-300 hover:bg-[#a30b0b] hover:shadow-[0_0_25px_rgba(140,8,8,0.85)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Save Changes"
                  : "Publish Project"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-text-secondary hover:text-white font-sans text-sm transition-all cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>
        )}
      </div>
    </main>
  );
}
