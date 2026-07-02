import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// GET - Fetch templates (filter by userId if provided)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const where = userId ? { userId } : {};

    const templates = await prisma.template.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    const formattedTemplates = templates.map((t) => ({
      ...t,
      tags: t.tags ? t.tags.split(',') : [],
    }));

    return NextResponse.json(formattedTemplates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

// POST - Create new template
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Creating template with data:", body);

    const { image, title, description, tags, userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const template = await prisma.template.create({
      data: {
        image: image || '',
        title: title || 'Untitled',
        description: description || '',
        tags: tags && tags.length > 0 ? tags.join(',') : '',
        userId: userId,
      },
    });

    console.log("Template created:", template);

    return NextResponse.json(
      {
        ...template,
        tags: template.tags ? template.tags.split(',') : [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

// PUT - Update template
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, image, title, description, tags, userId } = body;

    if (!id || !userId) {
      return NextResponse.json(
        { error: 'ID and userId required' },
        { status: 400 }
      );
    }

    const existing = await prisma.template.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    if (existing.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const template = await prisma.template.update({
      where: { id },
      data: {
        image: image || '',
        title: title || 'Untitled',
        description: description || '',
        tags: tags && tags.length > 0 ? tags.join(',') : '',
      },
    });

    return NextResponse.json({
      ...template,
      tags: template.tags ? template.tags.split(',') : [],
    });
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

// DELETE - Delete template
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!id || !userId) {
      return NextResponse.json(
        { error: 'ID and userId required' },
        { status: 400 }
      );
    }

    const existing = await prisma.template.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    if (existing.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await prisma.template.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}