import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedSessionToken } from "@/lib/totp";
import { getProjects, saveProjects, Project, ContentType } from "@/lib/projects";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  return verifySignedSessionToken(token);
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = getProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, contentType, linkUrl, imageFile, videoFile } = body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Project title is required." }, { status: 400 });
    }

    if (!description || typeof description !== "string" || !description.trim()) {
      return NextResponse.json({ error: "Project description is required." }, { status: 400 });
    }

    if (!["image", "video", "link"].includes(contentType)) {
      return NextResponse.json({ error: "Invalid content type." }, { status: 400 });
    }

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanContentType = contentType as ContentType;

    const newProject: Project = {
      id: "proj-" + Date.now(),
      title: cleanTitle,
      description: cleanDescription,
      contentType: cleanContentType,
      createdAt: new Date().toISOString(),
    };

    if (cleanContentType === "link") {
      if (!linkUrl || typeof linkUrl !== "string" || !linkUrl.trim()) {
        return NextResponse.json({ error: "Please provide a valid URL." }, { status: 400 });
      }
      let url = linkUrl.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      newProject.linkUrl = url;
    } else if (cleanContentType === "image") {
      if (!imageFile || typeof imageFile !== "string" || !imageFile.trim()) {
        return NextResponse.json(
          { error: "Please enter the image filename (e.g. preview.png)." },
          { status: 400 }
        );
      }
      newProject.imageFile = imageFile.trim().replace(/^\/+/, "");
    } else if (cleanContentType === "video") {
      if (!videoFile || typeof videoFile !== "string" || !videoFile.trim()) {
        return NextResponse.json(
          { error: "Please enter the video filename (e.g. omni-ad.mp4)." },
          { status: 400 }
        );
      }
      newProject.videoFile = videoFile.trim().replace(/^\/+/, "");
    }

    const currentProjects = getProjects();
    currentProjects.push(newProject);
    saveProjects(currentProjects);

    return NextResponse.json({ success: true, project: newProject });
  } catch {
    return NextResponse.json({ error: "Server error creating project." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
    }

    const currentProjects = getProjects();
    const filtered = currentProjects.filter((p) => p.id !== id);

    if (filtered.length === currentProjects.length) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    saveProjects(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error deleting project." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, description, contentType, linkUrl, imageFile, videoFile } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
    }

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Project title is required." }, { status: 400 });
    }

    if (!description || typeof description !== "string" || !description.trim()) {
      return NextResponse.json({ error: "Project description is required." }, { status: 400 });
    }

    if (!["image", "video", "link"].includes(contentType)) {
      return NextResponse.json({ error: "Invalid content type." }, { status: 400 });
    }

    const currentProjects = getProjects();
    const projectIndex = currentProjects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanContentType = contentType as ContentType;

    const updatedProject: Project = {
      ...currentProjects[projectIndex],
      title: cleanTitle,
      description: cleanDescription,
      contentType: cleanContentType,
      linkUrl: undefined,
      imageFile: undefined,
      videoFile: undefined,
    };

    if (cleanContentType === "link") {
      if (!linkUrl || typeof linkUrl !== "string" || !linkUrl.trim()) {
        return NextResponse.json({ error: "Please provide a valid URL." }, { status: 400 });
      }
      let url = linkUrl.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      updatedProject.linkUrl = url;
    } else if (cleanContentType === "image") {
      if (!imageFile || typeof imageFile !== "string" || !imageFile.trim()) {
        return NextResponse.json(
          { error: "Please enter the image filename (e.g. preview.png)." },
          { status: 400 }
        );
      }
      updatedProject.imageFile = imageFile.trim().replace(/^\/+/, "");
    } else if (cleanContentType === "video") {
      if (!videoFile || typeof videoFile !== "string" || !videoFile.trim()) {
        return NextResponse.json(
          { error: "Please enter the video filename (e.g. omni-ad.mp4)." },
          { status: 400 }
        );
      }
      updatedProject.videoFile = videoFile.trim().replace(/^\/+/, "");
    }

    currentProjects[projectIndex] = updatedProject;
    saveProjects(currentProjects);

    return NextResponse.json({ success: true, project: updatedProject });
  } catch {
    return NextResponse.json({ error: "Server error updating project." }, { status: 500 });
  }
}
