
import React, { useState, useCallback, useEffect } from 'react';
import { Project, View, BlogPost, User, Advisor, Benefit, LegalContent, AdminUser, AdminNotification } from './types';
import * as apiService from './services/apiService';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import BenefitsSection from './components/BenefitsSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import ProjectDetailView from './components/ProjectDetailView';
import CustomerServiceSection from './components/CustomerServiceSection';
import BlogDetailView from './components/BlogDetailView';
import LegalView from './components/LegalView';
import ForgotPasswordView from './components/ForgotPasswordView';
import IntranetView from './components/intranet/IntranetView';
import AdminPanel from './components/admin/AdminPanel';

const App: React.FC = () => {
    // State management
    const [currentView, setCurrentView] = useState<View>('home');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [targetAnchor, setTargetAnchor] = useState<string | null>(null);

    // Data states
    const [projects, setProjects] = useState<Project[]>([]);
    const [advisors, setAdvisors] = useState<Advisor[]>([]);
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [legalData, setLegalData] = useState<LegalContent | null>(null);
    
    // Admin data states
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
    const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>([]);


    // Fetch data on initial load
    useEffect(() => {
        const loadData = async () => {
            setProjects(await apiService.getProjects());
            setAdvisors(await apiService.getAdvisors());
            setBenefits(await apiService.getBenefits());
            setBlogPosts(await apiService.getBlogPosts());
            setLegalData(await apiService.getLegalContent());
            // Load admin data as well
            setAdminUsers(await apiService.getAdminUsers());
            setAdminNotifications(await apiService.getAdminNotifications());
        };
        loadData();
    }, []);

    const handleNavigate = useCallback((view: View, anchor?: string) => {
        setSelectedProject(null);
        setSelectedPost(null);

        if (view === 'home' && anchor) {
            if (currentView !== 'home') {
                setCurrentView('home');
                setTargetAnchor(anchor);
            } else {
                const element = document.querySelector(anchor);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            setCurrentView(view);
            setTargetAnchor(null);
            window.scrollTo(0, 0);
        }
    }, [currentView]);

    useEffect(() => {
        if (targetAnchor && currentView === 'home') {
            const element = document.querySelector(targetAnchor);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setTargetAnchor(null);
        }
    }, [targetAnchor, currentView]);


    const handleSelectProject = useCallback((project: Project) => {
        setSelectedProject(project);
        setCurrentView('projectDetail');
        window.scrollTo(0, 0);
    }, []);
    
    const handleSelectPost = useCallback((post: BlogPost) => {
        setSelectedPost(post);
        setCurrentView('blogDetail');
        window.scrollTo(0, 0);
    }, []);

    const handleLogin = async (email: string, pass: string) => {
        setLoginError(null);
        try {
            const userData = await apiService.loginUser(email, pass);
            if (userData) {
                setUser(userData);
                setIsLoggedIn(true);
                if (userData.role === 'admin') {
                    setCurrentView('intranet');
                }
                // No need to set view here, renderContent will handle it based on role
                window.scrollTo(0,0);
            } else {
                setLoginError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            setLoginError("Ocurrió un error al iniciar sesión. Inténtalo más tarde.");
        }
    };

    const handleLogout = useCallback(() => {
        setUser(null);
        setIsLoggedIn(false);
        setCurrentView('home');
        window.scrollTo(0,0);
    }, []);


    const renderContent = () => {
        if (isLoggedIn && user) {
            if (user.role === 'admin' && currentView !== 'home') {
                return <AdminPanel 
                    user={user} 
                    onLogout={handleLogout} 
                    onNavigateHome={() => handleNavigate('home')}
                    users={adminUsers}
                    notifications={adminNotifications}
                    projectsCount={projects.length}
                />;
            }
            if (user.role === 'client') {
                 return <IntranetView user={user} />;
            }
        }

        switch (currentView) {
            case 'projectDetail':
                return selectedProject ? <ProjectDetailView project={selectedProject} onBack={() => handleNavigate('home')} advisors={advisors} /> : null;
            case 'blogDetail':
                return selectedPost ? <BlogDetailView post={selectedPost} onBack={() => handleNavigate('home')} /> : null;
            case 'complaintsBook':
                return legalData ? <LegalView title={legalData.complaintsBook.title} content={legalData.complaintsBook.content} onBack={() => handleNavigate('home')} /> : null;
            case 'termsAndConditions':
                return legalData ? <LegalView title={legalData.termsAndConditions.title} content={legalData.termsAndConditions.content} onBack={() => handleNavigate('home')} /> : null;
            case 'privacyPolicy':
                return legalData ? <LegalView title={legalData.privacyPolicy.title} content={legalData.privacyPolicy.content} onBack={() => handleNavigate('home')} /> : null;
            case 'forgotPassword':
                return <ForgotPasswordView onBack={() => handleNavigate('home')} />;
            case 'intranet': // Fallback for client login view if needed
                 return (
                     <main>
                         <CustomerServiceSection 
                             onForgotPassword={() => handleNavigate('forgotPassword')} 
                             onLogin={handleLogin}
                             error={loginError}
                         />
                     </main>
                 );
            case 'home':
            default:
                return (
                    <main>
                        <Hero projects={projects} onSelectProject={handleSelectProject} />
                        <div className="space-y-24 md:space-y-32">
                            <ProjectsSection projects={projects} onSelectProject={handleSelectProject} />
                            <AboutSection />
                            <BenefitsSection benefits={benefits} />
                            <BlogSection posts={blogPosts} onSelectPost={handleSelectPost}/>
                            <ContactSection advisors={advisors} />
                            <CustomerServiceSection 
                                onForgotPassword={() => handleNavigate('forgotPassword')} 
                                onLogin={handleLogin}
                                error={loginError}
                            />
                        </div>
                    </main>
                );
        }
    };
    
    // Determine if the main header/footer should be shown
    const showMainLayout = !isLoggedIn || (user?.role === 'client' && currentView !== 'intranet') || currentView === 'home';
    const showFooter = !isLoggedIn && (currentView === 'home' || currentView === 'projectDetail' || currentView === 'blogDetail');


    return (
        <div className="font-sans">
            {showMainLayout && <Header onNavigate={handleNavigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} currentView={currentView} />}
            {renderContent()}
            {showFooter && <Footer onNavigate={handleNavigate} />}
        </div>
    );
};

export default App;
