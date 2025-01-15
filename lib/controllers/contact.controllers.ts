// lib/controllers/contact.controllers.ts
import { Contact, IContact } from "../models/contact.model";

interface ContactData {
    name: string;
    email: string;
    message: string;
}

export const createContact = async (data: ContactData): Promise<IContact> => {
    try {
        if (!data.name || !data.email || !data.message) {
            throw new Error("All fields are required.");
        }

        const newContact = new Contact(data);
        const savedContact = await newContact.save();
        return savedContact;
    } catch (error: any) {
        console.error("Controller Error:", error);
        throw new Error(error.message || "Error creating contact");
    }
};