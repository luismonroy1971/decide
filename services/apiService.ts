
import { Project, Advisor, Benefit, BlogPost, User, LegalContent, AdminUser, AdminNotification, SiteSettings } from '../types';

const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok for ${url}`);
    }
    return response.json();
};

const getOverride = <T>(url: string): T | null => {
    if (typeof window === 'undefined') return null;
    const key = `cms:${url}`;
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
};

const getOrFetch = async <T>(url: string): Promise<T> => {
    const override = getOverride<T>(url);
    if (override) return override;
    return fetchJson<T>(url);
};

export const getProjects = (): Promise<Project[]> => getOrFetch<Project[]>('/api/projects.json');
export const getAdvisors = (): Promise<Advisor[]> => getOrFetch<Advisor[]>('/api/advisors.json');
export const getBenefits = (): Promise<Benefit[]> => getOrFetch<Benefit[]>('/api/benefits.json');
export const getBlogPosts = (): Promise<BlogPost[]> => getOrFetch<BlogPost[]>('/api/blogPosts.json');
export const getLegalContent = (): Promise<LegalContent> => getOrFetch<LegalContent>('/api/legal.json');
export const getAdminUsers = (): Promise<AdminUser[]> => getOrFetch<AdminUser[]>('/api/admin_users.json');
export const getAdminNotifications = (): Promise<AdminNotification[]> => getOrFetch<AdminNotification[]>('/api/admin_notifications.json');
export const getSiteSettings = (): Promise<SiteSettings> => getOrFetch<SiteSettings>('/api/settings.json');


export const loginUser = async (email: string, pass: string): Promise<User | null> => {
    try {
        let userFile = '';
        if (email.toLowerCase() === 'admin@decide.pe') {
            userFile = '/api/admin.json';
        } else if (email.toLowerCase() === 'cliente@decide.pe') {
            userFile = '/api/user.json';
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
