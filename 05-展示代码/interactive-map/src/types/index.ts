export type District = '南城' | '松山湖' | '寮步' | '东城' | '厚街' | '虎门/滨海湾' | '茶山' | '常平';

export type VisitType = 'direct' | 'appointment';
export type Layer = 1 | 2 | 'both';
export type TimeOfDay = 'day' | 'night' | 'both';

export interface ResearchPoint {
  id: string;
  name: string;
  scene: string;
  district: District;
  address: string;
  lat: number;
  lng: number;
  visitType: VisitType;
  appointmentChannel?: string;
  layer: Layer;
  days: number[];
  timeOfDay: TimeOfDay;
  group?: number;
  description: string;
  highlights: string[];
  researchQuestions: string[];
  researchMethod: string;
  targetInterviewee?: string;
  notes?: string;
  icon: string;
}

export interface DayRouteData {
  day: number;
  date: string;
  label: string;
  color: string;
  periods: {
    time: string;
    points: string[];
    description: string;
  }[];
}

export interface FilterState {
  day: number | null;        // null = all, 1-4
  visitType: VisitType | null;
  district: District | null;
  layer: Layer | null;
}

export const DAY_CONFIG = [
  { day: 1, date: '7月28日（周二）', label: 'Day 1 · 感知鸿蒙', color: '#FF6B6B' },
  { day: 2, date: '7月29日（周三）', label: 'Day 2 · 行业落地', color: '#4ECDC4' },
  { day: 3, date: '7月30日（周四）', label: 'Day 3 · 生态聚合', color: '#45B7D1' },
  { day: 4, date: '7月31日（周五）', label: 'Day 4 · 收束对比', color: '#96CEB4' },
];

export const DISTRICT_COLORS: Record<District, string> = {
  '南城': '#e74c3c',
  '松山湖': '#3498db',
  '寮步': '#e67e22',
  '东城': '#9b59b6',
  '厚街': '#1abc9c',
  '虎门/滨海湾': '#2ecc71',
  '茶山': '#f39c12',
  '常平': '#34495e',
};
