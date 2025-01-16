'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    // Function to handle form submission
    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        try {
            // Create FormData
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('message', data.message);

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            console.log('Form submission result:', result);
            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit form');
            }

            toast({
                title: 'Success!',
                description: 'Thank you for your message. We will get back to you soon.',
            });

            form.reset();
        } catch (error: any) {
            console.error("Form submission error:", error);
            toast({
                title: 'Error',
                description: error.message || 'Something went wrong',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container py-12">
            <div className="grid gap-8 lg:grid-cols-2">
                <div>
                    <h1 className="text-3xl font-bold mb-8">Get in Touch</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your.email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Your message..."
                                                className="min-h-[150px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="lg:pl-8">
                    <div className="bg-muted p-8 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5" />
                                <span>ravixc1@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5" />
                                <span>+91 885 8902 274</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5" />
                                <span>Delhi, India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}