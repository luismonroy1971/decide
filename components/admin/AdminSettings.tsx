
import React, { useEffect, useState } from 'react';
import * as api from '../../services/apiService';
import { Project, Advisor, Benefit, BlogPost, LegalContent } from '../../types';
import Icon from '../Icon';

type SectionKey = 'projects' | 'advisors' | 'benefits' | 'blogPosts' | 'legal' | 'whatsapp';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SectionKey>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [legal, setLegal] = useState<LegalContent | null>(null);
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      const [p, a, b, bp, l, s] = await Promise.all([
        api.getProjects(),
        api.getAdvisors(),
        api.getBenefits(),
        api.getBlogPosts(),
        api.getLegalContent(),
        api.getSiteSettings()
      ]);
      setProjects(p);
      setAdvisors(a);
      setBenefits(b);
      setBlogPosts(bp);
      setLegal(l);
      setWhatsappPhone(s.whatsapp.phoneInternational);
      setWhatsappMessage(s.whatsapp.defaultMessage);
    };
    loadAll();
  }, []);

  const save = (key: SectionKey) => {
    const map: Record<SectionKey, unknown> = {
      projects,
      advisors,
      benefits,
      blogPosts,
      legal: legal as LegalContent,
      whatsapp: { whatsapp: { phoneInternational: whatsappPhone, defaultMessage: whatsappMessage } },
    };
    const urlMap: Record<SectionKey, string> = {
      projects: '/api/projects.json',
      advisors: '/api/advisors.json',
      benefits: '/api/benefits.json',
      blogPosts: '/api/blogPosts.json',
      legal: '/api/legal.json',
      whatsapp: '/api/settings.json',
    };
    window.localStorage.setItem(`cms:${urlMap[key]}`, JSON.stringify(map[key]));
    setStatusMsg('Cambios guardados (borrador local). Ver Página Principal para previsualizar.');
  };

  const reset = (key: SectionKey) => {
    const urlMap: Record<SectionKey, string> = {
      projects: '/api/projects.json',
      advisors: '/api/advisors.json',
      benefits: '/api/benefits.json',
      blogPosts: '/api/blogPosts.json',
      legal: '/api/legal.json',
      whatsapp: '/api/settings.json',
    };
    window.localStorage.removeItem(`cms:${urlMap[key]}`);
    setStatusMsg('Borrador eliminado. Usando datos originales.');
  };

  const download = (key: SectionKey) => {
    const map: Record<SectionKey, { filename: string; content: string }> = {
      projects: { filename: 'projects.json', content: JSON.stringify(projects, null, 2) },
      advisors: { filename: 'advisors.json', content: JSON.stringify(advisors, null, 2) },
      benefits: { filename: 'benefits.json', content: JSON.stringify(benefits, null, 2) },
      blogPosts: { filename: 'blogPosts.json', content: JSON.stringify(blogPosts, null, 2) },
      legal: { filename: 'legal.json', content: JSON.stringify(legal, null, 2) },
      whatsapp: { filename: 'settings.json', content: JSON.stringify({ whatsapp: { phoneInternational: whatsappPhone, defaultMessage: whatsappMessage } }, null, 2) },
    };
    const { filename, content } = map[key];
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const TabButton: React.FC<{tab: SectionKey; label: string}> = ({ tab, label }) => (
    <button onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md font-medium ${activeTab === tab ? 'bg-brand-accent-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{label}</button>
  );

  const ActionBar: React.FC<{onSave: () => void; onDownload: () => void; onReset: () => void}> = ({ onSave, onDownload, onReset }) => (
    <div className="flex gap-3 mt-4">
      <button onClick={onSave} className="bg-brand-blue-800 text-white font-semibold px-4 py-2 rounded hover:bg-brand-blue-900">Guardar borrador</button>
      <button onClick={onDownload} className="border border-slate-300 px-4 py-2 rounded hover:bg-slate-50">Descargar JSON</button>
      <button onClick={onReset} className="text-slate-700 px-4 py-2 rounded hover:bg-slate-100">Restaurar original</button>
    </div>
  );

  const moveItem = <T,>(arr: T[], index: number, dir: 'up' | 'down'): T[] => {
    const next = [...arr];
    const swapWith = dir === 'up' ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= next.length) return next;
    const tmp = next[swapWith];
    next[swapWith] = next[index];
    next[index] = tmp;
    return next;
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-900 mb-6">Ajustes Generales</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <TabButton tab="projects" label="Proyectos (Carrusel)" />
          <TabButton tab="advisors" label="Asesores" />
          <TabButton tab="benefits" label="Beneficios" />
          <TabButton tab="blogPosts" label="Blog" />
          <TabButton tab="legal" label="Legal" />
          <TabButton tab="whatsapp" label="WhatsApp" />
        </div>

        {statusMsg && (
          <div className="mb-4 p-3 rounded bg-amber-50 text-amber-700 border border-amber-200">{statusMsg}</div>
        )}

        {activeTab === 'projects' && (
          <div>
            <h2 className="text-xl font-semibold text-brand-blue-800 mb-3">Proyectos</h2>
            <div className="space-y-6">
              {projects.map((p, i) => (
                <div key={p.id || i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold">{p.name || 'Nuevo proyecto'}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setProjects(moveItem(projects, i, 'up'))} className="px-2 py-1 bg-slate-100 rounded">↑</button>
                      <button onClick={() => setProjects(moveItem(projects, i, 'down'))} className="px-2 py-1 bg-slate-100 rounded">↓</button>
                      <button onClick={() => setProjects(projects.filter((_, idx) => idx !== i))} className="px-2 py-1 bg-red-100 text-red-700 rounded">Eliminar</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="p-2 border rounded" value={p.id} onChange={e => setProjects(projects.map((x, idx) => idx===i ? { ...x, id: e.target.value } : x))} placeholder="ID" />
                    <input className="p-2 border rounded" value={p.name} onChange={e => setProjects(projects.map((x, idx) => idx===i ? { ...x, name: e.target.value } : x))} placeholder="Nombre" />
                    <input className="p-2 border rounded" value={p.location} onChange={e => setProjects(projects.map((x, idx) => idx===i ? { ...x, location: e.target.value } : x))} placeholder="Ubicación" />
                    <input className="p-2 border rounded" value={p.price} onChange={e => setProjects(projects.map((x, idx) => idx===i ? { ...x, price: e.target.value } : x))} placeholder="Precio" />
                  </div>
                  <textarea className="mt-3 w-full p-2 border rounded" rows={2} value={p.description} onChange={e => setProjects(projects.map((x, idx) => idx===i ? { ...x, description: e.target.value } : x))} placeholder="Descripción" />
                  <textarea className="mt-3 w-full p-2 border rounded" rows={4} value={p.longDescription} onChange={e => setProjects(projects.map((x, idx) => idx===i ? { ...x, longDescription: e.target.value } : x))} placeholder="Descripción larga" />
                  <div className="mt-3">
                    <label className="text-sm text-slate-600">Imagen principal</label>
                    <input className="mt-1 w-full p-2 border rounded" value={p.mainImage} onChange={e => setProjects(projects.map((x, idx) => idx===i ? { ...x, mainImage: e.target.value } : x))} placeholder="URL" />
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Galería</span>
                      <button onClick={() => setProjects(projects.map((x, idx) => idx===i ? { ...x, gallery: [...(x.gallery||[]), ''] } : x))} className="px-2 py-1 bg-slate-100 rounded">Agregar</button>
                    </div>
                    {(p.gallery||[]).map((url, gi) => (
                      <div key={gi} className="flex gap-2 mb-2">
                        <input className="flex-1 p-2 border rounded" value={url} onChange={e => setProjects(projects.map((x, idx) => idx===i ? { ...x, gallery: (x.gallery||[]).map((g, gidx) => gidx===gi ? e.target.value : g) } : x))} placeholder="URL" />
                        <button onClick={() => setProjects(projects.map((x, idx) => idx===i ? { ...x, gallery: (x.gallery||[]).filter((_, gidx) => gidx!==gi) } : x))} className="px-2 py-1 bg-red-100 text-red-700 rounded">Quitar</button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Beneficios del proyecto</span>
                      <button onClick={() => setProjects(projects.map((x, idx) => idx===i ? { ...x, benefits: [...(x.benefits||[]), ''] } : x))} className="px-2 py-1 bg-slate-100 rounded">Agregar</button>
                    </div>
                    {(p.benefits||[]).map((btxt, bi) => (
                      <div key={bi} className="flex gap-2 mb-2">
                        <input className="flex-1 p-2 border rounded" value={btxt} onChange={e => setProjects(projects.map((x, idx) => idx===i ? { ...x, benefits: (x.benefits||[]).map((b, bidx) => bidx===bi ? e.target.value : b) } : x))} placeholder="Beneficio" />
                        <button onClick={() => setProjects(projects.map((x, idx) => idx===i ? { ...x, benefits: (x.benefits||[]).filter((_, bidx) => bidx!==bi) } : x))} className="px-2 py-1 bg-red-100 text-red-700 rounded">Quitar</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={() => setProjects([...projects, { id: `PRJ-${Date.now()}`, name: '', location: '', price: '', description: '', longDescription: '', benefits: [], gallery: [], mainImage: '' }])} className="px-4 py-2 bg-slate-100 rounded">Agregar proyecto</button>
            </div>
            <ActionBar onSave={() => save('projects')} onDownload={() => download('projects')} onReset={() => reset('projects')} />
          </div>
        )}

        {activeTab === 'advisors' && (
          <div>
            <h2 className="text-xl font-semibold text-brand-blue-800 mb-3">Asesores</h2>
            <div className="space-y-4">
              {advisors.map((a, i) => (
                <div key={a.id || i} className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input className="p-2 border rounded" value={a.id} onChange={e => setAdvisors(advisors.map((x, idx) => idx===i ? { ...x, id: e.target.value } : x))} placeholder="ID" />
                  <input className="p-2 border rounded" value={a.name} onChange={e => setAdvisors(advisors.map((x, idx) => idx===i ? { ...x, name: e.target.value } : x))} placeholder="Nombre" />
                  <input className="p-2 border rounded" value={a.title} onChange={e => setAdvisors(advisors.map((x, idx) => idx===i ? { ...x, title: e.target.value } : x))} placeholder="Cargo" />
                  <input className="md:col-span-3 p-2 border rounded" value={a.imageUrl} onChange={e => setAdvisors(advisors.map((x, idx) => idx===i ? { ...x, imageUrl: e.target.value } : x))} placeholder="URL de imagen" />
                  <div className="md:col-span-3 flex gap-2">
                    <button onClick={() => setAdvisors(moveItem(advisors, i, 'up'))} className="px-2 py-1 bg-slate-100 rounded">↑</button>
                    <button onClick={() => setAdvisors(moveItem(advisors, i, 'down'))} className="px-2 py-1 bg-slate-100 rounded">↓</button>
                    <button onClick={() => setAdvisors(advisors.filter((_, idx) => idx!==i))} className="px-2 py-1 bg-red-100 text-red-700 rounded">Eliminar</button>
                  </div>
                </div>
              ))}
              <button onClick={() => setAdvisors([...advisors, { id: `ADV-${Date.now()}`, name: '', title: '', imageUrl: '' }])} className="px-4 py-2 bg-slate-100 rounded">Agregar asesor</button>
            </div>
            <ActionBar onSave={() => save('advisors')} onDownload={() => download('advisors')} onReset={() => reset('advisors')} />
          </div>
        )}

        {activeTab === 'benefits' && (
          <div>
            <h2 className="text-xl font-semibold text-brand-blue-800 mb-3">Beneficios</h2>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <div key={b.id || i} className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input className="p-2 border rounded" value={b.id} onChange={e => setBenefits(benefits.map((x, idx) => idx===i ? { ...x, id: e.target.value } : x))} placeholder="ID" />
                  <input className="md:col-span-3 p-2 border rounded" value={b.title} onChange={e => setBenefits(benefits.map((x, idx) => idx===i ? { ...x, title: e.target.value } : x))} placeholder="Título" />
                  <input className="md:col-span-3 p-2 border rounded" value={b.description} onChange={e => setBenefits(benefits.map((x, idx) => idx===i ? { ...x, description: e.target.value } : x))} placeholder="Descripción" />
                  <input className="p-2 border rounded" value={b.icon} onChange={e => setBenefits(benefits.map((x, idx) => idx===i ? { ...x, icon: e.target.value } : x))} placeholder="Icono" />
                  <div className="md:col-span-4 flex gap-2">
                    <button onClick={() => setBenefits(moveItem(benefits, i, 'up'))} className="px-2 py-1 bg-slate-100 rounded">↑</button>
                    <button onClick={() => setBenefits(moveItem(benefits, i, 'down'))} className="px-2 py-1 bg-slate-100 rounded">↓</button>
                    <button onClick={() => setBenefits(benefits.filter((_, idx) => idx!==i))} className="px-2 py-1 bg-red-100 text-red-700 rounded">Eliminar</button>
                  </div>
                </div>
              ))}
              <button onClick={() => setBenefits([...benefits, { id: `${Date.now()}`, title: '', description: '', icon: 'Star' }])} className="px-4 py-2 bg-slate-100 rounded">Agregar beneficio</button>
            </div>
            <ActionBar onSave={() => save('benefits')} onDownload={() => download('benefits')} onReset={() => reset('benefits')} />
          </div>
        )}

        {activeTab === 'blogPosts' && (
          <div>
            <h2 className="text-xl font-semibold text-brand-blue-800 mb-3">Entradas de Blog</h2>
            <div className="space-y-6">
              {blogPosts.map((bp, i) => (
                <div key={bp.id || i} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="p-2 border rounded" value={bp.id} onChange={e => setBlogPosts(blogPosts.map((x, idx) => idx===i ? { ...x, id: e.target.value } : x))} placeholder="ID" />
                    <input className="p-2 border rounded" value={bp.title} onChange={e => setBlogPosts(blogPosts.map((x, idx) => idx===i ? { ...x, title: e.target.value } : x))} placeholder="Título" />
                  </div>
                  <input className="mt-3 w-full p-2 border rounded" value={bp.summary} onChange={e => setBlogPosts(blogPosts.map((x, idx) => idx===i ? { ...x, summary: e.target.value } : x))} placeholder="Resumen" />
                  <input className="mt-3 w-full p-2 border rounded" value={bp.imageUrl} onChange={e => setBlogPosts(blogPosts.map((x, idx) => idx===i ? { ...x, imageUrl: e.target.value } : x))} placeholder="URL de imagen" />
                  <textarea className="mt-3 w-full p-2 border rounded" rows={6} value={bp.content} onChange={e => setBlogPosts(blogPosts.map((x, idx) => idx===i ? { ...x, content: e.target.value } : x))} placeholder="Contenido HTML" />
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setBlogPosts(moveItem(blogPosts, i, 'up'))} className="px-2 py-1 bg-slate-100 rounded">↑</button>
                    <button onClick={() => setBlogPosts(moveItem(blogPosts, i, 'down'))} className="px-2 py-1 bg-slate-100 rounded">↓</button>
                    <button onClick={() => setBlogPosts(blogPosts.filter((_, idx) => idx!==i))} className="px-2 py-1 bg-red-100 text-red-700 rounded">Eliminar</button>
                  </div>
                </div>
              ))}
              <button onClick={() => setBlogPosts([...blogPosts, { id: `${Date.now()}`, title: '', summary: '', imageUrl: '', content: '' }])} className="px-4 py-2 bg-slate-100 rounded">Agregar entrada</button>
            </div>
            <ActionBar onSave={() => save('blogPosts')} onDownload={() => download('blogPosts')} onReset={() => reset('blogPosts')} />
          </div>
        )}

        {activeTab === 'legal' && legal && (
          <div>
            <h2 className="text-xl font-semibold text-brand-blue-800 mb-3">Legal</h2>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <input className="w-full p-2 border rounded mb-2" value={legal.complaintsBook.title} onChange={e => setLegal({ ...legal, complaintsBook: { ...legal.complaintsBook, title: e.target.value } })} placeholder="Título Libro de Reclamaciones" />
                <textarea className="w-full p-2 border rounded" rows={6} value={legal.complaintsBook.content} onChange={e => setLegal({ ...legal, complaintsBook: { ...legal.complaintsBook, content: e.target.value } })} placeholder="Contenido HTML" />
              </div>
              <div className="border rounded-lg p-4">
                <input className="w-full p-2 border rounded mb-2" value={legal.termsAndConditions.title} onChange={e => setLegal({ ...legal, termsAndConditions: { ...legal.termsAndConditions, title: e.target.value } })} placeholder="Título Términos y Condiciones" />
                <textarea className="w-full p-2 border rounded" rows={6} value={legal.termsAndConditions.content} onChange={e => setLegal({ ...legal, termsAndConditions: { ...legal.termsAndConditions, content: e.target.value } })} placeholder="Contenido HTML" />
              </div>
              <div className="border rounded-lg p-4">
                <input className="w-full p-2 border rounded mb-2" value={legal.privacyPolicy.title} onChange={e => setLegal({ ...legal, privacyPolicy: { ...legal.privacyPolicy, title: e.target.value } })} placeholder="Título Política de Privacidad" />
                <textarea className="w-full p-2 border rounded" rows={6} value={legal.privacyPolicy.content} onChange={e => setLegal({ ...legal, privacyPolicy: { ...legal.privacyPolicy, content: e.target.value } })} placeholder="Contenido HTML" />
              </div>
            </div>
            <ActionBar onSave={() => save('legal')} onDownload={() => download('legal')} onReset={() => reset('legal')} />
          </div>
        )}

        {activeTab === 'whatsapp' && (
          <div>
            <h2 className="text-xl font-semibold text-brand-blue-800 mb-3">Botón de WhatsApp</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Número (internacional, sin +)</label>
                <input className="mt-1 w-full p-2 border rounded" value={whatsappPhone} onChange={e => setWhatsappPhone(e.target.value)} placeholder="51987654321" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Mensaje por defecto</label>
                <input className="mt-1 w-full p-2 border rounded" value={whatsappMessage} onChange={e => setWhatsappMessage(e.target.value)} placeholder="Hola, estoy interesado en..." />
              </div>
            </div>
            <ActionBar onSave={() => save('whatsapp')} onDownload={() => download('whatsapp')} onReset={() => reset('whatsapp')} />
          </div>
        )}

        <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded">
          <p className="text-slate-600 text-sm">Los cambios se guardan como borradores en el navegador y se aplican en la Página Principal.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
