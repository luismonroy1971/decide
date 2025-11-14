
import { Project, Advisor, Benefit, BlogPost, User, LegalContent, AdminUser, AdminNotification } from '../types';

const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok for ${url}`);
    }
    return response.json();
};

export const getProjects = (): Promise<Project[]> => fetchJson<Project[]>('./api/projects.json');
export const getAdvisors = (): Promise<Advisor[]> => fetchJson<Advisor[]>('./api/advisors.json');
export const getBenefits = (): Promise<Benefit[]> => fetchJson<Benefit[]>('./api/benefits.json');
export const getBlogPosts = (): Promise<BlogPost[]> => fetchJson<BlogPost[]>('./api/blogPosts.json');
export const getLegalContent = (): Promise<LegalContent> => fetchJson<LegalContent>('./api/legal.json');
export const getAdminUsers = (): Promise<AdminUser[]> => fetchJson<AdminUser[]>('./api/admin_users.json');
export const getAdminNotifications = (): Promise<AdminNotification[]> => fetchJson<AdminNotification[]>('./api/admin_notifications.json');


export const loginUser = async (email: string, pass: string): Promise<User | null> => {
    try {
        let userFile = '';
        if (email.toLowerCase() === 'admin@decide.pe') {
            userFile = './api/admin.json';
        } else if (email.toLowerCase() === 'cliente@decide.pe') {
            userFile = './api/client.json';
        } else {
            return null; // User not found
        }
        
        const response = await fetch(userFile);
        if (!response.ok) {
            console.error("Could not fetch user data from", userFile);
            return null;
        }
        const userData = await response.json();
        
        // In a real app, password would be hashed. This is for simulation.
        if (userData.email.toLowerCase() === email.toLowerCase() && userData.password === pass) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...userWithoutPassword } = userData;
            return userWithoutPassword as User;
        }
        return null;
    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
};
