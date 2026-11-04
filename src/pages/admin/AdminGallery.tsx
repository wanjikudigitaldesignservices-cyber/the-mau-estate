import React, { useEffect, useState } from 'react';
import { Image, Plus, Trash2, Check, Tag } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { GalleryItem } from '../../types';

export const AdminGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('estate');
  const [altText, setAltText] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    hotelDataService.getGalleryImages().then(setImages);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    const newItem: GalleryItem = {
      id: 'gal_' + Date.now(),
      title,
      image_url: imageUrl,
      category,
      alt_text: altText || title,
      is_featured: false,
      display_order: images.length + 1,
    };

    const updated = [newItem, ...images];
    setImages(updated);
    localStorage.setItem('mau_estate_gallery_v1', JSON.stringify(updated));

    setTitle('');
    setImageUrl('');
    setAltText('');
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <AdminLayout
      title="Photo Archive & Media Library"
      subtitle="Curate the estate photographic archive, add new high-resolution imagery, and assign visual categories"
    >
      <div className="space-y-8">
        {/* Quick Add Form */}
        <div className="bg-white p-6 sm:p-8 rounded-sm border border-ivory-dark shadow-subtle space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-gold" />
            <h3 className="font-serif text-xl text-forest font-medium">Add New Photograph to Archive</h3>
          </div>

          {added && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Photograph added to gallery successfully.</span>
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4 text-xs text-stone">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dawn Mist over Mau Narok"
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                >
                  <option value="estate">The Estate</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="dining">Dining</option>
                  <option value="wellness">Wellness</option>
                  <option value="experiences">Experiences</option>
                  <option value="events">Events</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">Image URL</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-sm"
            >
              Add Image
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {images.map((img) => (
            <div key={img.id} className="group bg-white rounded-sm border border-ivory-dark overflow-hidden shadow-subtle space-y-2 pb-3">
              <div className="aspect-[4/3] bg-forest-surface overflow-hidden relative">
                <img src={img.image_url} alt={img.alt_text} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-forest-deep/90 text-gold text-[9px] uppercase px-2 py-0.5 rounded border border-gold/30">
                  {img.category}
                </span>
              </div>
              <div className="px-3">
                <h4 className="font-serif text-sm text-forest truncate font-medium">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
