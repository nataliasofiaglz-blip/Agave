"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function register(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
        return { error: "Todos los campos son obligatorios" };
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return { error: "El correo ya está registrado" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return { success: true, user: { id: user.id, name: user.name, email: user.email } };
    } catch (e) {
        return { error: "Error al crear el usuario" };
    }
}

export async function loginAction(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        return { error: "Correo y contraseña son obligatorios" };
    }

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return { error: "Usuario no encontrado" };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        return { error: "Contraseña incorrecta" };
    }

    return {
        success: true,
        user: { id: user.id, name: user.name, email: user.email }
    };
}
