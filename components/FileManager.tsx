import React, { useState } from 'react';
import { 
    FolderIcon, FileIcon, ImageIcon, VideoIcon, FileTextIcon, 
    UploadCloudIcon, TrashIcon, ClockIcon, StarIcon, HardDriveIcon, 
    SearchIcon, GridIcon, MenuIcon, MoreVerticalIcon, CloudIcon,
    DownloadIcon, MusicIcon, ZapIcon
} from './Icons';
import { brain } from '../services/geminiService';
import { FileItem } from '../types';

const FileManager: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeNav, setActiveNav] = useState('cloud');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentFolder, setCurrentFolder] = useState<FileItem | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt, setPrompt] = useState('');

    const folders: FileItem[] = [
        { id: 'f1', name: 'Project Alpha', type: 'folder', items: 12, date: '2 min ago' },
        { id: 'f2', name: 'Financials 2024', type: 'folder', items: 5, date: '1 hour ago' },
        { id: 'f3', name: 'Brand Assets', type: 'folder', items: 48, date: 'Yesterday' },
        { id: 'f4', name: 'Personal', type: 'folder', items: 156, date: 'Oct 24' },
    ];

    const [files, setFiles] = useState<FileItem[]>([
        { id: '1', name: 'Budget_Q3.pdf', type: 'doc', size: '2.4 MB', date: 'Just now', preview: 'bg-red-500/20 text-red-400' },
        { id: '2', name: 'Hero_Banner_v2.png', type: 'image', size: '4.8 MB', date: '5 min ago', preview: 'bg-purple-500/20 text-purple-400' },
        { id: '3', name: 'Launch_Promo.mp4', type: 'video', size: '145 MB', date: 'Yesterday', preview: 'bg-blue-500/20 text-blue-400' },
        { id: '4', name: 'Meeting_Notes.docx', type: 'doc', size: '128 KB', date: 'Oct 28', preview: 'bg-blue-500/20 text-blue-400' },
        { id: '5', name: 'Site_Backup.zip', type: 'archive', size: '1.2 GB', date: 'Oct 25', preview: 'bg-yellow-500/20 text-yellow-400' },
        { id: '6', name: 'Interview.mp3', type: 'audio', size: '14 MB', date: 'Oct 20', preview: 'bg-pink-500/20 text-pink-400' },
        { id: '7', name: 'Logo_Pack.zip', type: 'archive', size: '45 MB', date: 'Oct 18', preview: 'bg-yellow-500/20 text-yellow-400' },
        { id: '8', name: 'presentation_deck.ppt', type: 'doc', size: '12 MB', date: 'Oct 15', preview: 'bg-orange-500/20 text-orange-400' },
    ]);

    // Brand Assets specific mock files (only shown when in folder f3)
    const [brandAssets, setBrandAssets] = useState<FileItem[]>([
        { id: 'ba-1', name: 'Logo_Primary_Dark.svg', type: 'image', size: '15 KB', date: '2 days ago', preview: 'bg-black border border-white/20' },
        { id: 'ba-2', name: 'Social_Cover.jpg', type: 'image', size: '1.2 MB', date: '2 days ago', preview: 'bg-gradient-to-r from-indigo-500 to-purple-600' },
    ]);

    const handleGenerateAsset = async () => {
        if (!prompt.trim() || isGenerating) return;
        
        setIsGenerating(true);
        try {
            const base64Image = await brain.generateImage(prompt);
            
            if (base64Image) {
                const newFile: FileItem = {
                    id: `gen-${Date.now()}`,
                    name: `${prompt.slice(0, 15).replace(/\s+/g, '_')}_AI.png`,
                    type: 'image',
                    size: '1.5 MB', // Simulated
                    date: 'Just now',
                    preview: '', // Will use image data directly in render
                    isGenerated: true,
                };
                
                // Hack: store the base64 string in preview if it's generated (handled in render)
                newFile.preview = base64Image;

                setBrandAssets(prev => [newFile, ...prev]);
                setPrompt('');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const getIcon = (type: string) => {
        switch(type) {
            case 'folder': return FolderIcon;
            case 'image': return ImageIcon;
            case 'video': return VideoIcon;
            case 'audio': return MusicIcon;
            case 'archive': return HardDriveIcon;
            default: return FileTextIcon;
        }
    };

    const renderFileGrid = (fileList: FileItem[]) => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {fileList.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())).map(file => {
                const Icon = getIcon(file.type);
                return (
                    <div key={file.id} className="group relative rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer overflow-hidden flex flex-col">
                        {/* Preview Mockup */}
                        <div className={`h-32 w-full flex items-center justify-center relative overflow-hidden ${!file.isGenerated ? file.preview : 'bg-black'}`}>
                            {file.isGenerated && file.preview ? (
                                <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                            ) : (
                                <Icon className="w-10 h-10 opacity-50 text-white" />
                            )}
                            
                            {/* AI Badge */}
                            {file.isGenerated && (
                                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-indigo-500 rounded text-[8px] font-bold text-white shadow-lg">
                                    AI GEN
                                </div>
                            )}
                        </div>
                        
                        {/* Info */}
                        <div className="p-3">
                            <div className="flex justify-between items-start">
                                    <h4 className="font-medium text-white text-sm truncate pr-2" title={file.name}>{file.name}</h4>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
                                        <MoreVerticalIcon className="w-3.5 h-3.5" />
                                    </button>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-[10px] text-gray-400">{file.size}</span>
                                <span className="text-[10px] text-gray-500">{file.date}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="h-full flex overflow-hidden bg-black/50 animate-fade-in-up">
            {/* Sidebar Navigation */}
            <div className="w-64 border-r border-white/5 bg-black/20 p-4 hidden md:flex flex-col">
                <div className="mb-6 px-2">
                    <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all">
                        <UploadCloudIcon className="w-5 h-5" />
                        <span>Upload File</span>
                    </button>
                </div>

                <nav className="space-y-1 flex-1">
                    <button 
                        onClick={() => { setActiveNav('cloud'); setCurrentFolder(null); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeNav === 'cloud' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <CloudIcon className="w-4 h-4" />
                        SAR Cloud
                    </button>
                    <button 
                        onClick={() => setActiveNav('recent')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeNav === 'recent' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <ClockIcon className="w-4 h-4" />
                        Recent
                    </button>
                    <button 
                        onClick={() => setActiveNav('starred')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeNav === 'starred' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <StarIcon className="w-4 h-4" />
                        Starred
                    </button>
                    <button 
                        onClick={() => setActiveNav('trash')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeNav === 'trash' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <TrashIcon className="w-4 h-4" />
                        Trash
                    </button>
                    
                    <div className="pt-6 pb-2">
                         <p className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Linked Storage</p>
                         <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5">
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">G</div>
                            Google Drive
                         </button>
                         <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5">
                            <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">D</div>
                            Dropbox
                         </button>
                    </div>
                </nav>

                {/* Storage Widget */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 mt-auto">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                            <HardDriveIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">Storage</p>
                            <p className="text-[10px] text-gray-400">1.4 TB / 2 TB used</p>
                        </div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden flex mb-2">
                        <div className="h-full bg-indigo-500 w-[45%]"></div>
                        <div className="h-full bg-purple-500 w-[20%]"></div>
                        <div className="h-full bg-green-500 w-[10%]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500">
                        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Docs</span>
                        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Media</span>
                        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Other</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/20 shrink-0">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2 text-white">
                             <button 
                                onClick={() => setCurrentFolder(null)} 
                                className={`text-sm font-bold hover:text-indigo-400 ${currentFolder ? 'text-gray-400' : 'text-white'}`}
                             >
                                 My Cloud
                             </button>
                             {currentFolder && (
                                 <>
                                     <span className="text-gray-600">/</span>
                                     <span className="text-sm font-bold text-white">{currentFolder.name}</span>
                                 </>
                             )}
                        </div>
                        <div className="hidden md:block w-px h-4 bg-white/10 mx-2"></div>
                        <div className="relative w-full md:w-96">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search files, folders..." 
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <GridIcon className="w-5 h-5" />
                         </button>
                         <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <MenuIcon className="w-5 h-5" />
                         </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    
                    {/* Folder View or Dashboard View */}
                    {!currentFolder ? (
                        <>
                            {/* Drag Drop Zone */}
                            <div className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer mb-8 group">
                                <UploadCloudIcon className="w-8 h-8 mb-2 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                                <p className="text-sm font-medium">Drop files here to upload</p>
                                <p className="text-xs">or click to browse</p>
                            </div>

                            {/* Folders Section */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Folders</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {folders.map(folder => (
                                        <div 
                                            key={folder.id} 
                                            onClick={() => setCurrentFolder(folder)}
                                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <FolderIcon className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
                                                <button className="text-gray-500 hover:text-white"><MoreVerticalIcon className="w-4 h-4" /></button>
                                            </div>
                                            <h4 className="font-medium text-white text-sm truncate">{folder.name}</h4>
                                            <p className="text-[10px] text-gray-400">{folder.items} items</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Files Section */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Recent Files</h3>
                                {viewMode === 'grid' ? renderFileGrid(files) : (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center px-4 py-2 text-xs text-gray-500 font-medium border-b border-white/5">
                                            <div className="flex-1">Name</div>
                                            <div className="w-32 hidden md:block">Date Modified</div>
                                            <div className="w-24">Size</div>
                                            <div className="w-10"></div>
                                        </div>
                                        {files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())).map(file => {
                                            const Icon = getIcon(file.type);
                                            return (
                                                <div key={file.id} className="flex items-center px-4 py-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className={`p-2 rounded-lg ${file.preview}`}>
                                                            <Icon className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm text-white truncate">{file.name}</span>
                                                    </div>
                                                    <div className="w-32 hidden md:block text-xs text-gray-400">{file.date}</div>
                                                    <div className="w-24 text-xs text-gray-400">{file.size}</div>
                                                    <div className="w-10 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-gray-400 hover:text-indigo-400"><DownloadIcon className="w-4 h-4" /></button>
                                                        <button className="text-gray-400 hover:text-red-400"><TrashIcon className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        // SPECIFIC FOLDER VIEW
                        <div className="animate-fade-in-up">
                            {currentFolder.id === 'f3' && (
                                // GENERATOR UI FOR BRAND ASSETS
                                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20">
                                    <div className="flex flex-col md:flex-row gap-4 items-end">
                                        <div className="flex-1 w-full">
                                            <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2 block">
                                                AI Asset Generator
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    type="text" 
                                                    value={prompt}
                                                    onChange={(e) => setPrompt(e.target.value)}
                                                    placeholder="Describe the image asset you need..."
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500/50"
                                                    onKeyDown={(e) => e.key === 'Enter' && handleGenerateAsset()}
                                                />
                                            </div>
                                        </div>
                                        <button 
                                            onClick={handleGenerateAsset}
                                            disabled={isGenerating || !prompt.trim()}
                                            className={`
                                                px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg
                                                ${isGenerating 
                                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/25 active:scale-95'}
                                            `}
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <ZapIcon className="w-4 h-4" />
                                                    Generate Asset
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-indigo-300/60 mt-2">
                                        Uses Gemini 2.5 Flash Image model. Generated assets are saved to this folder automatically.
                                    </p>
                                </div>
                            )}

                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">{currentFolder.name} Contents</h3>
                            
                            {currentFolder.id === 'f3' ? (
                                renderFileGrid(brandAssets)
                            ) : (
                                <div className="text-center py-20 text-gray-500">
                                    <FolderIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>This folder is empty.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileManager;
