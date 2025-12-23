"use server";
import prisma from "@/lib/prisma";

export async function getClasses() {
    return await prisma.class.findMany({
        include: {
            _count: {
                select: { bookings: true }
            }
        }
    });
}

export async function bookClass(userId, classId) {
    if (!userId) return { error: "Debes iniciar sesión" };

    try {
        // Check if already booked
        const existing = await prisma.booking.findFirst({
            where: { userId, classId }
        });

        if (existing) return { error: "Ya tienes un lugar en esta clase" };

        // Check capacity
        const classData = await prisma.class.findUnique({
            where: { id: classId },
            include: {
                _count: { select: { bookings: true } }
            }
        });

        if (classData._count.bookings >= classData.totalSpots) {
            return { error: "La clase está llena" };
        }

        await prisma.booking.create({
            data: { userId, classId }
        });

        return { success: true };
    } catch (e) {
        return { error: "Error al reservar" };
    }
}

// Helper to seed initial classes if DB is empty
export async function seedClasses() {
    const count = await prisma.class.count();
    if (count > 0) return;

    const initialClasses = [
        { name: 'Spinning Intensity', time: '18:00', duration: '45 min', trainer: 'Leo', totalSpots: 20 },
        { name: 'Power Yoga', time: '19:00', duration: '60 min', trainer: 'Elena', totalSpots: 15 },
        { name: 'CrossFit', time: '20:00', duration: '50 min', trainer: 'Marcos', totalSpots: 20 },
    ];

    for (const c of initialClasses) {
        await prisma.class.create({ data: c });
    }
}
