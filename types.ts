export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  date: string;
  avatarColor: string;
}

export interface Bubble {
  id: number;
  x: number;
  size: number;
  speed: number;
  delay: number;
}

export interface FishType {
  id: number;
  y: number;
  scale: number;
  duration: number;
  direction: 'left' | 'right';
  type: 'clown' | 'blue' | 'whale';
}