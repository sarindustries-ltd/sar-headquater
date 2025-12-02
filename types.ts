import React, { ReactNode } from 'react';

export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
  sources?: { title: string; uri: string }[];
}

export interface UserProfile {
  name: string;
  handle: string;
  avatarUrl: string;
  followers: number;
  following: number;
  isVerified: boolean;
}

export enum ShynMode {
  ASSISTANT = 'assistant',
  RESEARCHER = 'researcher',
  CREATOR = 'creator',
  CODER = 'coder',
  OFFLINE_AUTO_PILOT = 'offline_auto_pilot'
}

export type AIIdentity = 'SHYN' | 'JARVIS';

export interface BrainStats {
  memoryUsage: number;
  cpuLoad: number;
  networkLatency: number;
  activeAgents: number;
}

export type Tone = 'formal' | 'friendly' | 'humorous' | 'robotic';
export type Verbosity = 'concise' | 'balanced' | 'verbose';

export interface PersonalityConfig {
  tone: Tone;
  verbosity: Verbosity;
  creativity: number; // 0.0 to 1.0
}

// --- Domain Interfaces ---

export interface KapiNode {
  id: string;
  name: string;
  region: string;
  status: 'online' | 'offline' | 'degraded' | 'rebooting';
  load: number;
  uptime: string;
}

export interface Connector {
    id: string;
    name: string;
    category: 'Dev & Cloud' | 'Google' | 'Social' | 'AI & ML' | 'Design' | 'Productivity';
    description: string;
    iconSlug: string; // Slug for simpleicons.org
    color: string;
    connected: boolean;
}

export interface Tool {
    id: string;
    name: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    category: 'Communication' | 'Development' | 'Creative' | 'Management' | 'Analysis' | 'Media' | 'System' | 'Security';
    status: 'idle' | 'active' | 'installing' | 'error';
    color: string;
}

export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'image' | 'video' | 'doc' | 'audio' | 'archive';
    size?: string;
    items?: number;
    date: string;
    starred?: boolean;
    preview?: string; // Color or Image URL
    isGenerated?: boolean;
}

export interface UtilityItem {
    id: string;
    name: string;
    version?: string;
    description: string;
    category: string;
    icon: React.FC<{ className?: string }>;
    color: string;
    status: 'installed' | 'available' | 'update_available';
}

export interface RevenueModel {
    id: string;
    name: string;
    type: 'Subscription' | 'Usage-based' | 'Fixed';
    price: string;
    status: 'Active' | 'Draft' | 'Archived';
    subscribers: number;
}

export interface ApiToken {
    id: string;
    name: string;
    prefix: string;
    usage: number; // percentage
    limit: string;
    created: string;
    status: 'Active' | 'Revoked';
}

export interface POSTerminal {
    id: string;
    location: string;
    status: 'Online' | 'Offline' | 'Rebooting';
    dailySales: string;
}

export interface ThirdPartyApi {
    id: string;
    provider: string;
    model: string;
    buyCost: number; // per unit
    sellPrice: number; // per unit
    unit: string; // e.g., "1k tokens"
    monthlyUsage: number;
    status: 'Active' | 'Inactive';
    type: 'LLM' | 'SMS' | 'Compute' | 'Storage';
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Editor' | 'Viewer';
    status: 'Active' | 'Invited';
}