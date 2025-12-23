"use server";
import prisma from "@/lib/prisma";

export async function recordVisit(userId, token) {
    if (!userId) return { error: "Usuario no autenticado" };

    try {
        // Validate Token
        const timestamp = parseInt(atob(token));
        const now = Date.now();
        const fifteenMinutes = 15 * 60 * 1000;

        if (now - timestamp > fifteenMinutes || isNaN(timestamp)) {
            return { error: "Token expirado o inválido" };
        }

        // Check if this token was already used by this user in the last minute 
        // (to prevent accidental double clicks, though technically tokens change frequently)

        await prisma.visit.create({
            data: {
                userId: userId,
                location: "Agave Fitness Center - Main"
            }
        });

        return { success: true };
    } catch (e) {
        console.error("Check-in error:", e);
        return { error: "Error de validación del token" };
    }
}

export async function getVisitHistory(userId) {
    if (!userId) return [];

    return await prisma.visit.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' }
    });
}
